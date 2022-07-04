import { useAuthCtx } from '../store/AuthContext';

function HomePage() {
  const { isUserLoggedIn } = useAuthCtx();

  return (
    <div>
      <h1>Home Page</h1>
      {!isUserLoggedIn && <p>Jus esate neprisijunges, prasome prisiregistruoti</p>}
      {isUserLoggedIn && <p>Sveiki atvyke!</p>}
    </div>
  );
}

export default HomePage;
