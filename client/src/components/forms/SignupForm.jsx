import axios from 'axios';
import { array } from 'prop-types';
import { useEffect, useState } from "react";
import { Form, redirect } from "react-router-dom";
import formStyles from './forms.module.css';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SignupForm = () => {
  const [body, setBody] = useState({username: '', password: '', passwordCfm: '', email: ''});
  const [usernameStatus, setUsernameStatus] = useState();
  const [err, setErr] = useState({});

  useEffect(() => {
    if (body.username === '') {
      setUsernameStatus('');
      return;
    }

    const controller = new AbortController();
    
    const fetchUsername = () => {
      const signal = controller.signal;
      axios.post('http://localhost:3000/api/user/check', {username: body.username}, {signal: signal})
        .then(res => {
          setUsernameStatus(res.data);
        })
        .catch(err => console.error(err));
    }

    const timer = setTimeout(() => {
      fetchUsername();
    }, 500);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [body.username]);

  const onChange = (e) => {
    const newBody = {...body, [e.target.name]: e.target.value};
    const newErr = {...err, [e.target.name === 'passwordCfm' ? 'password' : e.target.name]: ''};
    console.log(err);
    setErr(newErr);
    setBody(newBody);
  }

  const submitCredential = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let data = {};
    formData.forEach((value, key) => data[key] = value);

    const validateInputs = () => {
      //check if valid email
      if (!emailRegex.test(body.email)) {
        setErr(prev => ({...prev, email: "Invalid email address"}));
      }
      //check if password match
      if (body.password !== body.passwordCfm) {
        setErr(prev => ({...prev, password: "Password does not match"}));
      }

      return Object.keys(err).length === 0;
    }

    const isValid = validateInputs();

    //post request to server
    if (isValid) {
      axios.post('http://localhost:3000/sign-up', data, {headers: {'Content-Type': 'application/json'}})
        .then(res => {
          if (res.data.success) {
            redirect('/home');
          } else {
            //TODO: display error
          }
        })
        .catch(err => console.error(err));
    }
  }

  return (
    <Form method='post' onSubmit={submitCredential} className={formStyles.form}>
      <div className={formStyles['custom_input']}>
        <input name="username" type="text" placeholder="Username" id="username" onChange={onChange} value={body.username} className={formStyles.input}/>
      </div>
      {usernameStatus && <span style={{color: usernameStatus === "Valid username" ? 'lightgreen' : 'red'}}>{usernameStatus}</span>}
      <div className={formStyles['custom_input']}>
        <input name="email" type="text" placeholder="Email" id="email" onChange={onChange} value={body.email} className={formStyles.input}/>
      </div>
      {err.email && <span style={{color: 'red'}}>{err.email}</span>}
      <div className={formStyles['custom_input']}>
        <input name="password" type="password" placeholder="Password" id="password" onChange={onChange} value={body.password} className={formStyles.input}/>
      </div>
      <div className={formStyles['custom_input']}>
        <input name="passwordCfm" type="password" placeholder="Confirm Password" id="passwordCfm" onChange={onChange} value={body.passwordCfm} className={formStyles.input}/>
      </div>
      {err.password && <span style={{color: 'red'}}>{err.password}</span>}

      <button type='submit' className={formStyles.button}>Register</button>
    </Form>
  )
}

export default SignupForm;