import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Navbar from '../../../components/Navbar';
import { 
  Calendar, 
  Plus, 
  Check, 
  Trash2, 
  Edit2, 
  Filter, 
  Tag, 
  Clock, 
  AlertTriangle 
} from 'lucide-react';

import styles from './ToDoList.module.css';

// Priority levels
const PRIORITY_COLORS = {
  low: 'text-green-500',
  medium: 'text-yellow-500',
  high: 'text-red-500'
};

function AdvancedTodoList() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('advanced-todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');

  // Persist todos
  useEffect(() => {
    localStorage.setItem('advanced-todos', JSON.stringify(todos));
  }, [todos]);

  // Advanced todo creation
  const addTodo = () => {
    if (!newTodo.trim()) return;

    const newTodoItem = {
      id: Date.now(),
      text: newTodo,
      completed: false,
      createdAt: new Date().toISOString(),
      priority: selectedPriority,
      dueDate: dueDate || null,
      tags: [...tags],
      subtasks: []
    };

    setTodos([...todos, newTodoItem]);
    resetForm();
  };

  
  const resetForm = () => {
    setNewTodo('');
    setSelectedPriority('medium');
    setDueDate('');
    setTags([]);
  };

  
  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      const matchesSearch = todo.text.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = 
        filter === 'all' || 
        (filter === 'active' && !todo.completed) || 
        (filter === 'completed' && todo.completed);
      
      return matchesSearch && matchesFilter;
    }).sort((a, b) => {
      
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return (
        priorityOrder[b.priority] - priorityOrder[a.priority] || 
        new Date(a.dueDate || '9999-12-31') - new Date(b.dueDate || '9999-12-31')
      );
    });
  }, [todos, filter, searchTerm]);

  
  const toggleTodo = useCallback((id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }, [todos]);

  const deleteTodo = useCallback((id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  }, [todos]);

  const addSubtask = (todoId, subtask) => {
    setTodos(todos.map(todo => 
      todo.id === todoId 
        ? { ...todo, subtasks: [...todo.subtasks, subtask] } 
        : todo
    ));
  };

  // Tag management
  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    
    <div className={styles.container}>
      <Navbar/>
      <div className={styles.todoWrapper}>
        <h1 className={`${styles.title} flex items-center`}>
          <Calendar className="mr-2" /> Advanced Todo List
        </h1>

        {}
        <div className={styles.todoCreation}>
          <input 
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="What needs to be done?"
            className={styles.todoInput}
          />

          {}
          <div className={styles.prioritySelector}>
            {Object.keys(PRIORITY_COLORS).map(priority => (
              <button 
                key={priority}
                onClick={() => setSelectedPriority(priority)}
                className={`${styles.priorityButton} ${
                  selectedPriority === priority ? 'ring-2 ring-blue-500' : ''
                } ${PRIORITY_COLORS[priority]}`}
              >
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
              </button>
            ))}
          </div>

          {/* Additional Todo Metadata */}
          <div className={styles.todoMetadata}>
            <input 
              type="date" 
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className={styles.dateInput}
            />

            {/* Tag Management */}
            <div className={styles.tagSection}>
              <input 
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add tag"
                className={styles.tagInput}
                onKeyPress={(e) => e.key === 'Enter' && addTag()}
              />
              <div className={styles.tagList}>
                {tags.map(tag => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                    <button onClick={() => removeTag(tag)}>×</button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <button 
            onClick={addTodo}
            className={styles.addButton}
          >
            <Plus />
          </button>
        </div>

        {/* Search and Filter */}
        <div className={styles.filterSection}>
          <input 
            type="text"
            placeholder="Search todos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          <div className={styles.filterButtons}>
            {['all', 'active', 'completed'].map(filterType => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`${styles.filterButton} ${
                  filter === filterType ? styles.activeFilter : ''
                }`}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Todo List Rendering */}
        <ul className={styles.todoList}>
          {filteredTodos.map(todo => (
            <li key={todo.id} className={styles.todoItem}>
              {/* Todo Details */}
              <div className={styles.todoDetails}>
                <input 
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className={styles.todoCheckbox}
                />
                <span className={`${styles.todoText} ${
                  todo.completed ? styles.completedTodo : ''
                }`}>
                  {todo.text}
                </span>

                {/* Priority and Due Date Indicators */}
                <div className={`${styles.todoMetaBadge} ${PRIORITY_COLORS[todo.priority]}`}>
                  {todo.priority}
                </div>
                {todo.dueDate && (
                  <div className={styles.dueDateBadge}>
                    <Clock size={16} /> {new Date(todo.dueDate).toLocaleDateString()}
                  </div>
                )}
              </div>

              {/* Todo Actions */}
              <div className={styles.todoActions}>
                {todo.tags.map(tag => (
                  <span key={tag} className={styles.smallTag}>{tag}</span>
                ))}
                <button onClick={() => deleteTodo(todo.id)}>
                  <Trash2 size={18} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdvancedTodoList;
