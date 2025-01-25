import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

import { useState } from 'react';
import { getUserDetails } from '../Util/GetUser';
import antd, { Dropdown , Menu} from 'antd'
import { Navigate } from 'react-router-dom';
import logo from './../../src/images/pinkcircle.png'
function Navbar({acitve}) {
  const navigate = useNavigate();
  const [user,setUser] = useState(""); 
  useEffect(()=>{
    const userDetails = getUserDetails();
    setUser(userDetails);
  },[])
  const handleLogout = ()=>{
    localStorage.removeItem('toDoAppUser')
    navigate("/login")
  }
  return (
    
    <nav className={styles.nav}>
      <div ><Link to='/' ><h1>ToDo</h1></Link></div>
      
      <ul className={styles.navLinks}>
  {user && <li className={styles.navLink}><Link to="/to-do">My tasks</Link></li>}
  {!user ? (
    <>
      <li className={styles.navItem}>
        <Link to="/register" className={styles.navLink}>Register</Link>
      </li>
      <li className={styles.navItem}>
        <Link to="/login" className={styles.navLink}>Login</Link>
      </li>
    </>
  ) :  <li className={styles.navItem}>
    
    <Dropdown className={styles.navLink}
      overlay={
        <Menu >
          <Menu.Item key="3" onClick={handleLogout}>
            Log Out
          </Menu.Item>
        </Menu>
      }
      trigger={['click']}
    >
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        Want to log out ?
      </a>
    </Dropdown>
</li>}
</ul>
    </nav>
  );
}

export default Navbar;


