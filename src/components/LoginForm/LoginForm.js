import css from './LoginForm.module.css';

import React from 'react';

function LoginForm() {
  return (
    <div className={css['form-container']}>
      <h1>Login Page</h1>
      <form>
        <div className={css['form-group']}>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' name='email' />
        </div>
        <div className={css['form-group']}>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' name='password' />
        </div>
        <button type='submit' className={css.button}>
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
