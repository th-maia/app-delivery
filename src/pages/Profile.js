import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const user = JSON.parse(localStorage.getItem('user')) || { email: '' };
  const history = useHistory();

  const onClickHandler = (link, clear = false) => {
    if (clear) localStorage.clear();
    history.push(link);
  };

  return (
    <section className="profile-container">
      <Header title="Profile" hasSearchIcon={ false } />
      <p data-testid="profile-email">{ user.email }</p>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => onClickHandler('/done-recipes') }
      >
        Done Recipes
      </button>

      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => onClickHandler('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ () => onClickHandler('/', true) }
      >
        Logout
      </button>
      <Footer />
    </section>
  );
}

export default Profile;
