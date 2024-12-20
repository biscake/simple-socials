import { useFormContext } from 'react-hook-form';
import styles from '../forms/forms.module.css';

export const Input = ({ type, id, placeholder, onChange, value, name, validation }) => {
  const { register, formState: { errors } } = useFormContext();

  const inputError = errors[name];

  return (
    <div className={styles['custom_input']}>
      {inputError
        ? <InputError message={inputError.message} />
        : <span style={{color: 'red'}}>&nbsp;</span>
      }
      <input
        name={name}
        id={id}
        type={type}
        className={styles.input}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        {...register(name, validation)}
      />
    </div>
  )
}

const InputError = ({message}) => {
  return (
    <span style={{color: 'red'}}>{message}</span>
  )
}