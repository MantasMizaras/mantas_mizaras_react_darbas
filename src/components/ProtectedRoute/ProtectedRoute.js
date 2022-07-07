import css from './ProtectedRoute.module.css';

import { Link, Route } from 'react-router-dom';
import { useAuthCtx } from '../../store/AuthContext';

function ProtectedRoute(props) {
  const { isUserLoggedIn } = useAuthCtx();
  const { children, ...rest } = props;

  return (
    <Route {...rest}>
      {isUserLoggedIn ? (
        children
      ) : (
        <div className={css.container404}>
          <h2>Please login</h2>
          <div>You are not logged in!!!</div>
          <Link to={'/login'}>Login here 🌏</Link>
        </div>
      )}
    </Route>
  );
}

export default ProtectedRoute;
