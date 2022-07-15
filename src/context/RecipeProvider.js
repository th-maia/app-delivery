import React from 'react';
import PropTypes from 'prop-types';
import RecipeContext from './RecipeContext';
import foodsApi from '../api/foodsApi';

function RecipeProvider({ children }) {
  function salvaEmail(emailLogin) {
    const emailStorage = { email: emailLogin };
    localStorage.setItem('user', JSON.stringify(emailStorage));
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
  }

  async function fetchFood(searchType, searchValue) {
    if (searchType === 'FirstLetter' && searchValue.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    const results = await foodsApi(searchType, searchValue);
    console.log(results);
  }

  async function fetchDrink(searchType, searchValue) {
    await foodsApi(searchType, searchValue);
  }

  const contextValue = {
    salvaEmail,
    fetchFood,
    fetchDrink,
  };

  return (
    <RecipeContext.Provider value={ contextValue }>
      {children}
    </RecipeContext.Provider>
  );
}

RecipeProvider.propTypes = {
  children: PropTypes.node.isRequired,
  // history: PropTypes.node.isRequired,
};

export default RecipeProvider;
