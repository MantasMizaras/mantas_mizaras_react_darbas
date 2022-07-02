import css from './RegisterForm.module.css';

import React from 'react';

function RegisterForm() {
  return (
    <div className={css['form-container']}>
      <h1>Register Page</h1>
      <form>
        <div className={css['form-group']}>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' />
        </div>
        <div className={css['form-group']}>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' name='password' />
        </div>
        <div className={css['form-group']}>
          <label htmlFor='repeatPassword'>Repeat password</label>
          <input type='password' id='repeatPassword' name='repeatPassword' />
        </div>
        <button type='submit' className={css.button}>
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
