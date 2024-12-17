import { Link } from "react-router-dom";
import styles from '../assets/Home.module.css';
import LoginForm from "./homeComponents/LoginForm";

const Home = ({}) => {
  return (
    <div className={styles.container}> 
      <div className={styles.wrapper}>
        <div className={styles.main}>
          <div className={styles.welcome}>Insta</div>
          <LoginForm styles={styles}/>
        </div>
        <div className={styles['sign-up']}>
          Don&#39;t have an account?&nbsp;
          <Link to='/sign-up'>Sign up</Link>
        </div>
      </div>
    </div>
  )
}

export default Home;