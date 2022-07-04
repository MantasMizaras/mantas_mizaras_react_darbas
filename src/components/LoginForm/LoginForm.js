import css from './LoginForm.module.css';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { baseUrl, myFetch } from '../../utils';
import { useHistory } from 'react-router-dom';
import { useAuthCtx } from '../../store/AuthContext';

const initValues = {
  email: '',
  password: '',
};

function LoginForm() {
  const history = useHistory();
  const ctx = useAuthCtx();
  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object({
      email: Yup.string().email('Patikrinkite savo email').required(),
      password: Yup.string().min(4, 'Mažiausiai 4 simboliai').max(10, 'Daugiausiai 10 simbolių').required(),
    }),
    onSubmit: async (values) => {
      const fetchLoginResult = await myFetch(`${baseUrl}/v1/auth/login`, 'POST', values);

      if (fetchLoginResult.msg === 'Successfully logged in') {
        ctx.login(fetchLoginResult.token, values.email);
        history.replace('/');
      }
      console.log('fetchLoginResult ===', fetchLoginResult);
      if (!fetchLoginResult.token) {
        console.log('login failed');
        return;
      }
      ctx.login(fetchLoginResult.token);
      console.log('submiting values ===', values);
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
