import axios from 'axios';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { email_validation, password_validation, passwordCfm_validation, username_validation } from '../../utils/inputValidations';
import styles from './forms.module.css';
import { Input } from './Input';

const SignupForm = () => {
  const [err, setErr] = useState([]);

  const methods = useForm({mode: 'onChange'});
  const navigate = useNavigate();

  const submitCredential = data => {
    //post request to server
    axios.post('http://localhost:3000/api/users/register', data, {headers: {'Content-Type': 'application/json'}})
      .then(res => navigate('/home'))
      .catch(err => {
        if (err.response && err.response.data && err.response.data.errors) {
          setErr(err.response.data.errors);
        } else {
          setErr([{msg: "An unexpected error occurred. Please try again."}]);
        }
      })
  }

  return (
    <FormProvider {...methods}>
      <form 
        method='post' 
        noValidate
        onSubmit={methods.handleSubmit(submitCredential)} 
        className={styles.form}
      >
        <Input {...username_validation} />
        <Input {...email_validation}/>
        <Input {...password_validation}/>
        <Input {...passwordCfm_validation(methods.watch)}/>
        {err && err.map((e, idx) => <p style={{color: "red"}} key={idx}>{e.msg}</p>)}
        <button 
          type='submit' 
          className={styles.button}
        >
          Register
        </button>
      </form>
    </FormProvider>
  )
}

export default SignupForm;