import css from './RegisterForm.module.css';

import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import { baseUrl, myFetch } from '../../utils';
import { useAuthCtx } from '../../store/AuthContext';

const initValues = {
  email: '',
  password: '',
  repeatPassword: '',
};

function RegisterForm() {
  const history = useHistory();
  const ctx = useAuthCtx();
  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object({
      email: Yup.string().email('Please check your email').required(),
      password: Yup.string().min(4, 'At least 8 characters').max(10).required(),
      repeatPassword: Yup.string()
        .required()
        .oneOf([Yup.ref('password'), null], 'Passwords must match!'),
    }),

    onSubmit: async (values) => {
      const valuesCopy = { ...values };
      delete valuesCopy['repeatPassword'];
      console.log('values ===', values);
      console.log('valuesCopy ===', valuesCopy);
      const registerResult = await myFetch(`${baseUrl}v1/auth/register`, 'POST', valuesCopy);
      if (registerResult.changes === 1) {
        ctx.login(registerResult.token, valuesCopy.email);
        history.replace('/login');
      }
      console.log('registerResult ===', registerResult);
      // if (!registerResult.token) {
      //   console.log('cannot register');
      //   return;
      // }
      // ctx.register(registerResult.token);
      // console.log('registerResult ===', registerResult);

      console.log('submiting values ===', values);
    },
  });

  function matchPass() {
    const { password, repeatPassword } = initValues;
    if (password !== repeatPassword) {
      console.log(`Passwords doesn't match`);
    }
  }

  function rightClassesForInput(field) {
    let resultClasses = css['form-control'];

    if (formik.touched[field]) {
      resultClasses += formik.errors[field] ? ' is-invalid' : ' is-valid';
    }

    return resultClasses;
  }

  return (
    <div className={css['form-container']}>
      <h1>Register Page</h1>

      <form onSubmit={formik.handleSubmit} onBlur={matchPass}>
        <div className={css['form-group']}>
          <label htmlFor='email'>Email</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className={rightClassesForInput('email')}
            type='email'
            id='email'
            name='email'
          />
          <div className={css['invalid-feedback']}>{formik.errors.email}</div>
        </div>
        <div className={css['form-group']}>
          <label htmlFor='password'>Password</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className={rightClassesForInput('password')}
            type='password'
            id='password'
            name='password'
          />
          <div className={css['invalid-feedback']}>{formik.errors.password}</div>
        </div>
        <div className={css['form-group']}>
          <label htmlFor='repeatPassword'>Repeat password</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.repeatPassword}
            className={rightClassesForInput('repeatPassword')}
            type='password'
            id='repeatPassword'
            name='repeatPassword'
          />
          <div className={css['invalid-feedback']}>{formik.errors.repeatPassword}</div>
        </div>
        <button type='submit' className={css.button}>
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
