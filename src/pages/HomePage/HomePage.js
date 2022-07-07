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
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  function handleSearchInput(event) {
    setSearchInput(event.target.value);
  }

  function filtering() {
    const skillsCopy = [...skills];
    if (Number(searchInput) === searchInput) {
      const filtered = skillsCopy.filter((skill) => skill.id.includes(Number(searchInput)));
      setFilteredSkills(filtered);
    }
    const filtered = skillsCopy.filter((skill) => skill.title.toLowerCase().includes(searchInput.toLowerCase()));
    setFilteredSkills(filtered);
  }

  const getSkills = async (values) => {
    const fetchGetSkills = await myFetchAuth(`${baseUrl}/v1/content/skills`, 'GET', token, values);
    if (Array.isArray(fetchGetSkills)) {
      setSkills(fetchGetSkills);
    }
  };

  useEffect(() => {
    if (token) getSkills();
    if (searchInput) {
      filtering();
    }
  }, [searchInput]);

  if (skills.length !== 0) {
    return (
      <div className='container'>
        <h1>Skills corner</h1>
        {!isUserLoggedIn && <h3>You're not logged in, please register or login.</h3>}
        {isUserLoggedIn && <h3>Welcome aboard!</h3>}
        <div>
          <label htmlFor='search'>Can't find something? Search skills by title. </label>
          <input type='text' placeholder='Enter title' onChange={(event) => handleSearchInput(event)} value={searchInput} />
        </div>
        <div className={css['skills-grid']}>
          {searchInput
            ? filteredSkills.map((sObj) => {
                return <Card key={sObj.id} {...sObj} />;
              })
            : skills.map((sObj) => {
                return <Card key={sObj.id} {...sObj} />;
              })}
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
