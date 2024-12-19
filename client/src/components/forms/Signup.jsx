import axios from 'axios';
import { useState } from "react";
import { Form, redirect } from "react-router-dom";
// import formStyles from './Forms.module.css';

const SignupForm = () => {
  const [body, setBody] = useState({username: '', password: '', passwordCfm: '', email: ''});
  const [err, setErr] = useState([]);

  const onChange = (e) => {
    const newBody = {...body, [e.target.name]: e.target.value};
    setErr([]);
    setBody(newBody);
  }

  const submitCredential = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let data = {};
    formData.forEach((value, key) => data[key] = value);

    //check if password match
    if (body.password !== body.passwordCfm) {
      const newErr = [...err, "Password does not match"];
      setErr(newErr);
      console.log(err);
      return;
    }

    //post request to server
    axios.post('/api/sign-up', data, {headers: {'Content-Type': 'application/json'}})
      .then(res => {
        if (res.data.success) {
          redirect('/home');
        } else {
          //TODO: display error
        }
      })
      .catch(err => console.error(err));
  }

  return (
    <Form method='post' onSubmit={submitCredential} className={formStyles.form}>
      <ul>
        {err.map((error, key) => <li key={key} style={{color: 'red'}}>{error}</li>)}
      </ul>
      <div className={formStyles['custom_input']}>
        <input name="username" type="text" placeholder="Username" id="username" onChange={onChange} value={body.username} className={formStyles.input}/>
      </div>
      <div className={formStyles['custom_input']}>
        <input name="email" type="email" placeholder="Email" id="passwordCfm" onChange={onChange} value={body.email} className={formStyles.input}/>
      </div>
      <div className={formStyles['custom_input']}>
        <input name="password" type="password" placeholder="Password" id="password" onChange={onChange} value={body.password} className={formStyles.input}/>
      </div>
      <div className={formStyles['custom_input']}>
        <input name="passwordCfm" type="password" placeholder="Confirm Password" id="passwordCfm" onChange={onChange} value={body.passwordCfm} className={formStyles.input}/>
      </div>
      <button type='submit' className={formStyles['log-in-btn']}>Register</button>
    </Form>
  )
}

export default SignupForm;