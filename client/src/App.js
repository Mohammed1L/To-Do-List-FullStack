import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing/Landing/Landing';
import Register from './pages/Landing/Auth/Register';
import ToDoList from './pages/Landing/ToDo/ToDoList';
import Login from './pages/Landing/Auth/Login'; 
import 'antd/dist/reset.css';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/to-do" element={<ToDoList />} />
    </Routes>
  );
}

export default App;
