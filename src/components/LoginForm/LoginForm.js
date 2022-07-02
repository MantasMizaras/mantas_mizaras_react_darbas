import css from './LoginForm.module.css';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { myFetch } from '../../utils';

const initValues = {
  email: '',
  password: '',
};

const baseUrl = process.env.REACT_APP_BACKEND_URL;
if (!baseUrl) throw new Error('baseUrl nerastas');

function LoginForm() {
  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object({
      email: Yup.string().email('Patikrinkite savo email').required(),
      password: Yup.string().min(4, 'Mažiausiai 4 simboliai').max(10, 'Daugiausiai 10 simbolių').required(),
    }),
    onSubmit: async (values) => {
      const fetchResult = await myFetch(`${baseUrl}/v1/auth/login`, 'POST', values);
      console.log('fetchResult ===', fetchResult);
    },
  });

  return (
    <div className={css['form-container']}>
      <h1>Login Page</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className={css['form-group']}>
          <label htmlFor='email'>Email</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            type='email'
            id='email'
            name='email'
            className={formik.touched.email && formik.errors.email ? 'is-invalid ' : ''}
          />
          <div className='invalid-feedback'>{formik.errors.email}</div>
        </div>
        <div className={css['form-group']}>
          <label htmlFor='password'>Password</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            type='password'
            id='password'
            name='password'
            className={formik.touched.password && formik.errors.password ? 'is-invalid ' : ''}
          />
          <div className='invalid-feedback'>{formik.errors.password}</div>
        </div>
        <button type='submit' className={css.button}>
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
