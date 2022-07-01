import { Link, NavLink } from 'react-router-dom';

function Header(props) {
  return (
    <header>
      <Link to={'/'}>Logo</Link>
      <nav>
        <NavLink to={'/'}>Home</NavLink>
        <NavLink to={'/add'}>Add</NavLink>
        <NavLink to={'/login'}>Login</NavLink>
        <NavLink to={'/register'}>Register</NavLink>
      </nav>
    </header>
  );
}
export default Header;
