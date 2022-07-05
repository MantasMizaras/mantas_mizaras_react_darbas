import css from './Footer.module.css';

function Footer() {
  return (
    <footer className={css.copyright}>
      <b className={css['footer-text']}> Copyright &copy; {new Date().getFullYear()} All rights reserved.</b>
    </footer>
  );
}

export default Footer;
