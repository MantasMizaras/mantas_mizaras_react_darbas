import { useHistory } from 'react-router-dom';
import { useAuthCtx } from '../../store/AuthContext';
import { baseUrl, myFetchAuth } from '../../utils';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import css from './AddForm.module.css';
import toast from 'react-hot-toast';

const initValues = {
  title: '',
  description: '',
};

function AddForm() {
  const history = useHistory();
  const { token } = useAuthCtx();
  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object({
      title: Yup.string().min(2, 'At least 2 symbols are required').max(15, 'Up to 15 symbols are allowed').required(),
      description: Yup.string().min(5, 'At least 5 symbols are required').max(80, 'Up to 80 symbols are allowed').required(),
    }),
    onSubmit: async (values) => {
      console.log('values ===', values);

      const addFetch = await myFetchAuth(`${baseUrl}/v1/content/skills`, 'POST', token, values);
      console.log('addFetch ===', addFetch);

      if (addFetch.msg === 'Added new skill to account') {
        toast.success('New skill added succesfully');
        history.replace('/');
      } else {
        toast.error('Error in adding a skill');
      }
    },
  });

  function rightClassesForInput(field) {
    let resultClasses = css['form-control'];

    if (formik.touched[field]) {
      resultClasses += formik.errors[field] ? ' is-invalid' : ' is-valid';
    }

    return resultClasses;
  }

  return (
    <div className={css['form-container']}>
      <h1>Add skills</h1>

      <form onSubmit={formik.handleSubmit}>
        <div className={css['form-group']}>
          <label htmlFor='email'>Title</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            className={rightClassesForInput('title')}
            type='title'
            id='title'
            name='title'
          />
          <div className={css['invalid-feedback']}>{formik.errors.title}</div>
        </div>
        <div className={css['form-group']}>
          <label htmlFor='password'>Description</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            className={rightClassesForInput('description')}
            type='description'
            id='description'
            name='description'
          />
          <div className={css['invalid-feedback']}>{formik.errors.description}</div>
        </div>

        <button type='submit' className={css.button}>
          Add
        </button>
      </form>
    </div>
  );
}

export default AddForm;
