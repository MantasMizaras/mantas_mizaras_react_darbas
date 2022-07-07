import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '../../components/Card/Card';
import { useAuthCtx } from '../../store/AuthContext';
import { baseUrl, myFetchAuth } from '../../utils';

import css from './HomePage.module.css';

function HomePage() {
  const { isUserLoggedIn } = useAuthCtx();
  const history = useHistory();
  const { token } = useAuthCtx();
  if (!token) history.push('/login');
  const [skills, setSkills] = useState([]);

  const getSkills = async (values) => {
    const fetchGetSkills = await myFetchAuth(`${baseUrl}/v1/content/skills`, 'GET', token, values);
    if (Array.isArray(fetchGetSkills)) {
      setSkills(fetchGetSkills);
    }
  };

  useEffect(() => {
    if (token) getSkills();
  }, []);

  if (skills.length !== 0) {
    return (
      <div className='container'>
        <h1>Skills corner</h1>
        {!isUserLoggedIn && <h3>You're not logged in, please register or login.</h3>}
        {isUserLoggedIn && <h3>Welcome aboard!</h3>}

        <div className={css['skills-grid']}>
          {skills.map((sObj) => (
            <Card key={sObj.id} {...sObj} />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className='container'>
        <h1>Skills corner</h1>
        <h3>No skills added..</h3>
      </div>
    );
  }
}

export default HomePage;
