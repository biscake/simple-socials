import axios from 'axios';
import { useForm } from 'react-hook-form';
import styles from './forms.module.css';


const LoginForm = () => {
  const { register, handleSubmit } = useForm();

  const submitCredential = data => {
    axios.post('http:localhost/api/user/log-in', data, {headers: {'Content-Type': 'application/json'}})
      .then(res => console.log(res))
      .catch(err => console.error(err));
  }

  return (
    <form 
      method='post' 
      onSubmit={handleSubmit(data => submitCredential(data))} 
      className={styles.form}
    >
      <Input
        name="username"
        id="username"
        type="text"
        placeholder="Username"
        register={register}
      />
      <Input
        name="password"
        id="password"
        type="password"
        placeholder="Password"
        register={register}
      />
      <button 
        className={styles.button} 
        type='submit'
      >
        Log in
      </button>
    </form>
  )
}

const Input = ({name, id, type, placeholder, register}) => {
  return (
    <div className={styles['custom_input']}>
      <input
        name={name}
        id={id}
        type={type}
        placeholder={placeholder}
        className={styles.input}
        {...register(name)}
      />
    </div>
  )
}

export default LoginForm;