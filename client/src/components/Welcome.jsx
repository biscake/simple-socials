import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from '../assets/Home.module.css';
import LoginForm from "./forms/LoginForm";
import SignupForm from "./forms/SignupForm";

const Welcome = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/api/users/verify-session")
      .then(res => {
        return navigate("/home");
      })
      .finally(() => {
        setIsLoading(false);
      })
      setIsLoading(false);
  }, [])

  // TODO: add loading component
  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.welcome}>Blab</div>
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