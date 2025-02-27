import axios from 'axios';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styles from './forms.module.css';
import { Input } from './Input';

const LoginForm = () => {
  const [err, setErr] = useState([]);

  const methods = useForm();
  const navigate = useNavigate();

  const submitCredential = data => {
    axios.post('http://localhost:3000/api/users/login', data, {headers: {'Content-Type': 'application/json'}})
      .then(res => {
        console.log(res);
        navigate('/home');
      })
      .catch(err => {
        if (err.response && err.response.data && err.response.data.errors) {
          setErr(err.response.data.errors);
        } else {
          console.log(err)
          setErr([{msg: "An unexpected error occurred. Please try again."}]);
        }
      });
  }

  return (
    <FormProvider { ...methods }> 
      <form
        method='post' 
        onSubmit={methods.handleSubmit(submitCredential)} 
        className={styles.form}
      >
        <Input
          name="username"
          id="username"
          type="text"
          placeholder="Username"
        />
        <Input
          name="password"
          id="password"
          type="password"
          placeholder="Password"
        />
        {err && err.map((e, idx) => <p style={{color: "red"}} key={idx}>{e.msg}</p>)}
        <button 
          className={styles.button} 
          type='submit'
        >
          Log in
        </button>
      </form>
    </FormProvider>
  )
}

export default LoginForm;