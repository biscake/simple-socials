import axios from 'axios';
import { FormProvider, useForm } from 'react-hook-form';
import { redirect, useNavigate } from "react-router-dom";
import { email_validation, password_validation, passwordCfm_validation, username_validation } from '../../utils/inputValidations';
import formStyles from './forms.module.css';
import { Input } from './Input';

const SignupForm = () => {
  const methods = useForm({mode: 'onChange'});
  const navigate = useNavigate();

  const submitCredential = data => {
    //post request to server
    axios.post('http://localhost:3000/api/user/register', data, {headers: {'Content-Type': 'application/json'}})
      .then(res => {
        if (res.data.success) {
          return navigate('/home');
        } else {
          //TODO: display error
          return navigate('/error');
        }
      })
      .catch(err => console.error(err));
  }

  return (
    <FormProvider {...methods}>
      <form 
        method='post' 
        noValidate
        onSubmit={methods.handleSubmit(submitCredential)} 
        className={formStyles.form}
      >
        <Input {...username_validation} />
        <Input {...email_validation}/>
        <Input {...password_validation}/>
        <Input {...passwordCfm_validation(methods.watch)}/>
        <button 
          type='submit' 
          className={formStyles.button}
          onClick={submitCredential}
        >
          Register
        </button>

      </form>
    </FormProvider>
    
  )
}

export default SignupForm;