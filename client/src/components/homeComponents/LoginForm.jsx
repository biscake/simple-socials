import axios from 'axios';
import { useState } from "react";
import { Form } from "react-router-dom";

const LoginForm = ({styles}) => {
  const [body, setBody] = useState({username: '', password: ''});

  const onChange = (e) => {
    const newBody = {...body, [e.target.name]: e.target.value};
    setBody(newBody);
  }

  const submitCredential = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let data = {};
    formData.forEach((value, key) => data[key] = value);
    axios.post('/log-in', {body: data, headers: {'Content-Type': 'application/json'}})
      .then(res => console.log(res))
      .catch(err => console.error(err));
  }
  return (
    <Form method='post' onSubmit={submitCredential}>
      <div className={styles['custom_input']}>
        <input name="username" type="text" placeholder="Username" id="username" className={styles.input} onChange={onChange} value={body.username}/>
      </div>
      <div className={styles['custom_input']}>
        <input name="password" type="password" placeholder="Password" id="password" className={styles.input} onChange={onChange} value={body.password}/>
      </div>
      <button className={styles['log-in-btn']} type='submit'>Log in</button>
    </Form>
  )
}

export default LoginForm;