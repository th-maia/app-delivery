import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RecipeContext from './RecipeContext';
import foodsApi from '../api/foodsApi';
import drinksApi from '../api/drinksApi';

function RecipeProvider({ children }) {
  const history = useHistory();

  function salvaEmail(emailLogin) {
    const emailStorage = { email: emailLogin };
    localStorage.setItem('user', JSON.stringify(emailStorage));
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
  }

  async function fetchFood(searchType, searchValue, local) {
    if (searchType === 'FirstLetter' && searchValue.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    if (local === '/foods') {
      const getFood = await foodsApi(searchType, searchValue);
      console.log(getFood);
      if (getFood.meals.length === 1) {
        console.log(getFood.meals[0].idMeal);
        history.push(`/foods/${getFood.meals[0].idMeal}`);
      }
    } else {
      const getDrink = await drinksApi(searchType, searchValue);
      console.log(getDrink);
      if (getDrink.drinks.length === 1) {
        history.push(`/drinks/${getDrink.drinks[0].idDrink}`);
      }
    }
  }

  const contextValue = {
    salvaEmail,
    fetchFood,
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
