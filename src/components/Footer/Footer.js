import css from './Footer.module.css';

function Footer() {
  return (
    <footer className={css.copyright}>
      <b className={css['footer-text']}> Copyright &copy; 2022</b>
    </footer>
  );
}

export default Footer;
