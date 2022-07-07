import css from './Button.module.css';

function Button({ children }) {
  return (
    <button type='submit' className={css.button}>
      {children}
    </button>
  );
}

export default Button;
