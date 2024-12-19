import axios from 'axios';
import { useState } from "react";
import { Form } from "react-router-dom";
import formStyles from './forms.module.css';




const LoginForm = () => {
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
    <Form method='post' onSubmit={submitCredential} className={formStyles.form}>
      <div className={formStyles['custom_input']}>
        <input name="username" type="text" placeholder="Username" id="username" className={formStyles.input} onChange={onChange} value={body.username}/>
      </div>
      <div className={formStyles['custom_input']}>
        <input name="password" type="password" placeholder="Password" id="password" className={formStyles.input} onChange={onChange} value={body.password}/>
      </div>
      <button className={formStyles['log-in-btn']} type='submit'>Log in</button>
    </Form>
  )
}

export default LoginForm;