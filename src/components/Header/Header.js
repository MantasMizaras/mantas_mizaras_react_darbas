import css from './Header.module.css';
import { NavLink } from 'react-router-dom';
import { useAuthCtx } from '../../store/AuthContext';
import toast from 'react-hot-toast';

function Header(props) {
  const { isUserLoggedIn, logout, userEmail } = useAuthCtx();

  return (
    <header>
      <nav className={css.header}>
        <NavLink to='/'>
          <img className={css.img} src='../img/skills.png' alt='logoNav' />
        </NavLink>
        <div className={css['nav-container']}>
          {isUserLoggedIn && (
            <>
              <NavLink className={css['nav-link']} to={'/'}>
                Home
              </NavLink>
              <NavLink className={css['nav-link']} to={'/add'}>
                Add
              </NavLink>
              <NavLink
                onClick={() => {
                  logout();
                  isUserLoggedIn ? toast.success('You are logged out.') : toast.error('Error in logout.');
                }}
                className={css['nav-link']}
                to={'/login'}
              >
                Logout
              </NavLink>
              {<p className={css.email}>You are logged in as: {userEmail}</p>}
            </>
          )}
        </div>
        {!isUserLoggedIn && (
          <>
            <div className={css['nav-control-display']}>
              <NavLink className={css['nav-link']} to={'/login'}>
                Login
              </NavLink>
              <NavLink className={css['nav-link']} to={'/register'}>
                Register
              </NavLink>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}
export default Header;
