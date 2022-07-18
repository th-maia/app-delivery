import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import foodsApi from '../api/foodsApi';
import drinksApi from '../api/drinksApi';

const MAX = 5;

const CategoryFilter = ({ type }) => {
  const [categories, setCategories] = useState([]);
  const { location: pathname } = useHistory();
  const fetch = type === 'foods' ? foodsApi : drinksApi;

  useEffect(() => {
    fetch('Category').then((response) => {
      setCategories(type === 'foods' ? response.meals : response.drinks);
    });
  }, [pathname]);

  return (
    <ul>
      <li>
        <button type="button">All</button>
      </li>
      {categories.slice(0, MAX).map(({ strCategory }, index) => (
        <li key={ index }>
          <button
            type="button"
            data-testid={ `${strCategory}-category-filter` }
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
