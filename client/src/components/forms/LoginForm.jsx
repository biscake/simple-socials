import axios from 'axios';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styles from './forms.module.css';
import { Input } from './Input';

const LoginForm = () => {
  const methods = useForm();
  const navigate = useNavigate();

  const submitCredential = data => {
    axios.post('http:localhost/api/user/log-in', data, {headers: {'Content-Type': 'application/json'}})
      .then(res => {
        if (res.status >= 200) {
          return navigate('/home');
        }
      })
      .catch(err => console.error(err));
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