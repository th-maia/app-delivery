import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import foodsApi from '../api/foodsApi';
import drinksApi from '../api/drinksApi';
import RecipeContext from '../context/RecipeContext';

const MAX = 5;

const CategoryFilter = ({ type }) => {
  const [categories, setCategories] = useState([]);
  const { setGetFood, setGetDrink } = useContext(RecipeContext);
  const { location: pathname } = useHistory();
  const fetch = type === 'foods' ? foodsApi : drinksApi;

  useEffect(() => {
    fetch('Category').then((response) => {
      setCategories(type === 'foods' ? response.meals : response.drinks);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const setRecipes = (data) => (
    type === 'foods'
      ? setGetFood({ meals: data.meals })
      : setGetDrink({ drinks: data.drinks })
  );

  return (
    <ul>
      <li>
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => (
            fetch('All')
              .then(setRecipes)) }
        >
          All
        </button>
      </li>
      {categories.slice(0, MAX).map(({ strCategory }, index) => (
        <li key={ index }>
          <button
            type="button"
            data-testid={ `${strCategory}-category-filter` }
            onClick={ () => (
              fetch('Category', strCategory)
                .then((data) => (setRecipes(data)))
            ) }
          >
            {strCategory}
          </button>
        </li>
      ))}
    </ul>
  );
};

CategoryFilter.propTypes = {
  type: PropTypes.string.isRequired,
};

export default CategoryFilter;
