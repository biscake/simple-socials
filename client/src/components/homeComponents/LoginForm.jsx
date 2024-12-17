import { Form } from "react-router-dom";

const LoginForm = ({styles}) => {
  return (
    <Form action="/log-in" method="post">
      <div className={styles['custom_input']}><input name="username" type="text" placeholder="Username" id="username" className={styles.input}/></div>
      <div className={styles['custom_input']}><input name="password" type="password" placeholder="Password" id="password" className={styles.input}/></div>
      <button type="submit" className={styles['log-in-btn']}>Log in</button>
    </Form>
  )
}

export default LoginForm;