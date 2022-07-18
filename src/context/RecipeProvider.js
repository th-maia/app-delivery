import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RecipeContext from './RecipeContext';
import foodsApi from '../api/foodsApi';
import drinksApi from '../api/drinksApi';

function RecipeProvider({ children }) {
  const history = useHistory();
  const [getFood, setGetFood] = useState({ meals: [] });
  const [getDrink, setGetDrink] = useState({ drinks: [] });

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
      const food = await foodsApi(searchType, searchValue);
      setGetFood(food);
      if (food.meals?.length === 1) {
        history.push(`/foods/${food.meals[0].idMeal}`);
      } else if (!food.meals) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
    } else {
      const drink = await drinksApi(searchType, searchValue) || {};
      setGetDrink(drink);
      if (drink?.drinks?.length === 1 && drink) {
        history.push(`/drinks/${drink.drinks[0].idDrink}`);
      } else if (!drink.drinks) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
    }
  }

  const contextValue = {
    salvaEmail,
    fetchFood,
    getDrink,
    getFood,
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
