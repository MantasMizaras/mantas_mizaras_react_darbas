import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '../components/Card/Card';
import { useAuthCtx } from '../store/AuthContext';
import { baseUrl, myFetchAuth } from '../utils';

import css from './HomePage.module.css';

function HomePage() {
  const { isUserLoggedIn } = useAuthCtx();
  const history = useHistory();
  const { token } = useAuthCtx();
  if (!token) history.push('/login');
  const [skills, setSkills] = useState([]);

  const getSkills = async (values) => {
    const fetchGetSkills = await myFetchAuth(`${baseUrl}/v1/content/skills`, 'GET', token, values);
    console.log('fetchGetSkills ===', fetchGetSkills);
    if (Array.isArray(fetchGetSkills)) {
      setSkills(fetchGetSkills);
    }
  };
  console.log('skills ===', skills);

  useEffect(() => {
    if (token) getSkills();
  }, []);

  if (skills.length !== 0) {
    return (
      <div>
        <h1>Home Page</h1>
        {!isUserLoggedIn && <p>Jus esate neprisijunges, prasome prisiregistruoti</p>}
        {isUserLoggedIn && <p>Sveiki atvyke!</p>}

        <div className={css['skills-grid']}>
          {skills.map((sObj) => (
            <Card key={sObj.id} {...sObj} />
          ))}
        </div>
        {/* <Card title='test' description='something to show for test' /> */}
      </div>
    );
  } else {
    return (
      <div>
        <h1>Home Page</h1>
        <h3>Neturite jokių pridėtų skills'ų..</h3>
      </div>
    );
  }
}

export default HomePage;
