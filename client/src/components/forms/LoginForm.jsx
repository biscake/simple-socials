import axios from 'axios';
import { useState } from "react";
import { FormProvider, useForm } from 'react-hook-form';
import { Form } from "react-router-dom";
import formStyles from './forms.module.css';
import { Input } from './Input';

const LoginForm = () => {
  const { register, handleSubmit } = useForm();

  const submitCredential = data => {
    console.log(data);
    axios.post('/log-in', {body: data, headers: {'Content-Type': 'application/json'}})
      .then(res => console.log(res))
      .catch(err => console.error(err));
  }

  return (
    <form 
      method='post' 
      onSubmit={handleSubmit(data => submitCredential(JSON.stringify(data)))} 
      className={formStyles.form}
    >
      <input
        name="username"
        id="username"
        type="text"
        placeholder="Username"
        {...register('username')}
      />
      <input
        name="password"
        id="password"
        type="password"
        placeholder="Password"
        {...register('password')}
      />
      <button 
        className={formStyles.button} 
        type='submit'
      >
        Log in
      </button>
    </form>
  )
}

export default LoginForm;