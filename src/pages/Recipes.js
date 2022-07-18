import React from 'react';
import PropTypes from 'prop-types';
import Foods from './Foods';
import Drinks from './Drinks';
import CategoryFilter from '../components/CategoryFilter';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Recipes({ type }) {
  // const history = useHistory();
  // const type = history.pathname === '/foods' ? 'foods' : 'drinks';

  return (
    <div>
      <Header title={ type === 'foods' ? 'Foods' : 'Drinks' } />
      <CategoryFilter type={ type } />
      { type === 'foods' ? <Foods /> : <Drinks /> }
      <Footer />
    </div>
  );
}

Recipes.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Recipes;
