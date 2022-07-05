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
      title: Yup.string()
        .min(2, 'At least 2 symbols are required')
        .max(15, 'Up to 15 symbols are allowed')
        .required('Title laukas būtinas'),
      description: Yup.string()
        .min(5, 'At least 5 symbols are required')
        .max(80, 'Up to 80 symbols are allowed')
        .required('Description laukas būtinas'),
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

  return (
    <div className={css['form-container']}>
      <h1>Add skills</h1>

      <form onSubmit={formik.handleSubmit}>
        <div className={css['form-group']}>
          <label htmlFor='title'>Title</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            className={formik.touched.title && formik.errors.title ? css['is-invalid'] : ''}
            type='title'
            id='title'
            name='title'
          />
          {formik.touched.title && formik.errors.title && <p className={css['invalid-feedback']}>{formik.errors.title}</p>}
        </div>
        <div className={css['form-group']}>
          <label htmlFor='description'>Description</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            className={formik.touched.description && formik.errors.description ? css['is-invalid'] : ''}
            type='description'
            id='description'
            name='description'
          />
          {formik.touched.description && formik.errors.description && (
            <p className={css['invalid-feedback']}>{formik.errors.description}</p>
          )}
        </div>
        <button type='submit' className={css.button}>
          Add
        </button>
      </form>
    </div>
  );
}

export default AddForm;
