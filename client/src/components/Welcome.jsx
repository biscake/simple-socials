import { useState } from "react";
import styles from '../assets/Home.module.css';
import LoginForm from "./forms/LoginForm";
import SignupForm from "./forms/SignupForm";

const Welcome = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.welcome}>Insta</div>
        {isLoginForm? <LoginForm/> : <SignupForm/>}
      </div>
      <div className={styles['sign-up']}>
        {isLoginForm? "Don't have an account? " : "Already have an account? "}
        <button className={styles.button} onClick={() => setIsLoginForm(!isLoginForm)}>{isLoginForm ? 'Register' : 'Log in'}</button>
      </div>
    </div>
  )
}

export default Welcome;