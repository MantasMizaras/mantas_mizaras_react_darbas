import css from './RegisterForm.module.css';

import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { baseUrl, myFetch } from '../../utils';
import Button from '../UI/Button/Button';

const initValues = {
  email: '',
  password: '',
  repeatPassword: '',
};

function RegisterForm() {
  const history = useHistory();
  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object({
      email: Yup.string().email('Please check your email').required('E-mail required'),
      password: Yup.string().min(4, 'At least 8 characters').max(10).required('Password required'),
      repeatPassword: Yup.string()
        .required('Please repeat password')
        .oneOf([Yup.ref('password'), null], 'Passwords must match!'),
    }),

    onSubmit: async (values) => {
      const valuesCopy = { ...values };
      delete valuesCopy['repeatPassword'];
      const registerResult = await myFetch(`${baseUrl}v1/auth/register`, 'POST', valuesCopy);
      if (registerResult.changes === 1) {
        toast.success(`Success! Account: ${values.email} created!`);
        history.replace('/login');
      }
      if (registerResult.changes !== 1) {
        toast.error(`New user wasn't created`);
        return;
      }
    },
  });

  return (
    <div className={css['form-container']}>
      <h1>Registration</h1>

      <form onSubmit={formik.handleSubmit}>
        <div className={css['form-group']}>
          <label htmlFor='email'>Email</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className={formik.touched.email && formik.errors.email ? css['is-invalid'] : ''}
            type='email'
            id='email'
            name='email'
          />
          {formik.touched.email && formik.errors.email && <p className={css['invalid-feedback']}>{formik.errors.email}</p>}
        </div>
        <div className={css['form-group']}>
          <label htmlFor='password'>Password</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className={formik.touched.password && formik.errors.password ? css['is-invalid'] : ''}
            type='password'
            id='password'
            name='password'
          />
          {formik.touched.password && formik.errors.password && (
            <p className={css['invalid-feedback']}>{formik.errors.password}</p>
          )}
        </div>
        <div className={css['form-group']}>
          <label htmlFor='repeatPassword'>Repeat password</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.repeatPassword}
            className={formik.touched.repeatPassword && formik.errors.repeatPassword ? css['is-invalid'] : ''}
            type='password'
            id='repeatPassword'
            name='repeatPassword'
          />
          {formik.touched.repeatPassword && formik.errors.repeatPassword && (
            <p className={css['invalid-feedback']}>{formik.errors.repeatPassword}</p>
          )}
        </div>
        <Button>Register</Button>
      </form>
    </div>
  );
}

export default RegisterForm;
