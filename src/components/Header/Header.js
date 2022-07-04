import css from './Header.module.css';
import { Link, NavLink } from 'react-router-dom';
import { useAuthCtx } from '../../store/AuthContext';

function Header(props) {
  const { isUserLoggedIn, logout, userEmail } = useAuthCtx();
  return (
    <header className={css.header}>
      <NavLink to='/'>
        <img className={css.img} src='../img/skills.png' alt='logoNav' />
      </NavLink>
      <nav>
        {isUserLoggedIn && (
          <>
            <NavLink className={css['nav-link']} to={'/'}>
              Home
            </NavLink>
            <NavLink className={css['nav-link']} to={'/add'}>
              Add
            </NavLink>
            <NavLink onClick={logout} className={css['nav-link']} to={'/login'}>
              Logout
            </NavLink>
            <a className={css['nav-link']} href='/'>
              {userEmail}
            </a>
          </>
        )}
        {!isUserLoggedIn && (
          <>
            <NavLink className={css['nav-link']} to={'/login'}>
              Login
            </NavLink>
            <NavLink className={css['nav-link']} to={'/register'}>
              Register
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
export default Header;
