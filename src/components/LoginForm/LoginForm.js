import css from './LoginForm.module.css';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { baseUrl, myFetch } from '../../utils';
import { useHistory } from 'react-router-dom';
import { useAuthCtx } from '../../store/AuthContext';
import toast from 'react-hot-toast';
import Button from '../UI/Button/Button';

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
      email: Yup.string().email('Patikrinkite savo email').required('Būtina įvesti e-mail'),
      password: Yup.string().min(4, 'Mažiausiai 4 simboliai').max(10, 'Daugiausiai 10 simbolių').required('Slaptažodis būtinas'),
    }),
    onSubmit: async (values) => {
      const fetchLoginResult = await myFetch(`${baseUrl}/v1/auth/login`, 'POST', values);

      if (fetchLoginResult.msg === 'Successfully logged in') {
        toast.success(`Successfully logged in: ${values.email}`);
        ctx.login(fetchLoginResult.token, values.email);
        history.replace('/');
      }

      if (!fetchLoginResult.token) {
        toast.error('Nepavyko prisijungti');
        return;
      }
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
            className={formik.touched.email && formik.errors.email ? css['is-invalid'] : ''}
          />
          {formik.touched.email && formik.errors.email && <p className={css['invalid-feedback']}>{formik.errors.email}</p>}
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
            className={formik.touched.password && formik.errors.password ? css['is-invalid'] : ''}
          />
          {formik.touched.password && formik.errors.password && (
            <p className={css['invalid-feedback']}>{formik.errors.password}</p>
          )}
        </div>
        <Button>Login</Button>
      </form>
    </div>
  );
}

export default LoginForm;
