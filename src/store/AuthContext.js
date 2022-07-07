import { useContext, useState } from 'react';
import { createContext } from 'react';

const AuthContext = createContext({
  login() {},
  logout() {},
  isUserLoggedIn: '',
  token: null,
  userEmail: '',
});

AuthContext.displayName = 'AuthContext';

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userEmail, setUserEmail] = useState(localStorage.getItem('email'));

  const login = (receivedToken, receivedEmail) => {
    setToken(receivedToken);
    setUserEmail(receivedEmail);
    localStorage.setItem('token', receivedToken);
    localStorage.setItem('email', receivedEmail);
  };
  const logout = () => {
    setToken(null);
    setUserEmail(null);
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  };

  const ctx = {
    login,
    logout,
    isUserLoggedIn: !!token,
    token,
    userEmail,
  };
  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuthCtx = () => {
  return useContext(AuthContext);
};
