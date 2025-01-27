export const username_validation = {
  name: "username",
  type: "username",
  id: "username", 
  placeholder: "Username",
  validation: {
    required: {
      value: true,
      message: "Required"
    },
    pattern: {
      value: /^[a-zA-Z0-9]+$/,
      message: "Invalid username"
    },
    minLength: {
      value: 4,
      message: "Username too short"
    },
  }
}

export const password_validation = {
  name: 'password',
  type: 'password', 
  id: 'password',
  placeholder: 'Password',
  validation: {
    required: {
      value: true,
      message: 'Required',
    },
    minLength: {
      value: 8,
      message: 'Password is too short'
    },
    pattern: {
      value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
      message: 'Invalid password'
    }
  }
}

export const passwordCfm_validation = watch => ({
  name: 'cpassword',
  type: 'password', 
  id: 'cpassword',
  placeholder: 'Confirm password',
  validation: {
    required: {
      value: true,
      message: 'Required',
    },
    validate: (val) => {
      return watch('password', '') === val || "Password does not match"
    }
  }
})

export const email_validation = {
  name: 'email',
  type: 'text',
  id: 'email',
  placeholder: 'email',
  validation: {
    required: {
      value: true,
      message: "Required"
    },
    pattern: {
      value: /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
      message: "Invalid email"
    }
  }
}