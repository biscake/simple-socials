import { Link } from "react-router-dom";
import styles from '../assets/Home.module.css';

const Home = ({}) => {
  return (
    <div className={styles.container}> 
      <div className={styles.main}>
        <div className={styles.welcome}>Welcome to Y!</div>
        {/* <LoginForm /> */}
        <div className={styles['log-in']}>
          Don&#39;t have an account?&nbsp;
          <Link to='/sign-up'>Register here!</Link>
        </div>
      </div>
    </div>
  )
}

export default Home;