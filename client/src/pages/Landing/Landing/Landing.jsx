import React from 'react'
import Navbar from '../../../components/Navbar'
import styles from './Landing.module.css'
import home from '../../../images/homepage.jpg'
import { Link } from 'react-router-dom';
import pink from '../../../images/pinkcircle.png'
export default function Landing() {
  return (
    <div className={styles.landing}>
     <Navbar active ={'home'}/>
     <section>
      <div>
       <h1> Sechedule Your <br/>
        Daily Tasks With 
        <span className ={styles.primarytext}>   Do List!</span> </h1>
      </div>
      <div className={styles.btnWrapper}>
      <Link to='/register' className={styles.primarybttn}>
            Register
          </Link>
          <Link to='/login' className={styles.secondrybttn}>
            Log in
          </Link>
      </div> 
      <div className = {styles.imgprimary}>
        <img src = {home} alt="landing"/>

      </div>
      <div className={styles.pinkcircle}>
      <img src = {pink} alt="landing"/>
        
      </div>
      <div className={styles.pinkcircle2}>
      <img src = {pink} alt="landing"/>
        
      </div>
     </section>
    </div>
  )
}
