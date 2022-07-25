import React from 'react';
import PropTypes from 'prop-types';

function ingredientList({ ingredients }) {
  return (
    <ul>
      {ingredients.map(({ ingredient, measure }, index) => (
        <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
          {`${measure} - ${ingredient}`}
        </li>
      ))}
    </ul>
  );
}

ingredientList.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    ingredient: PropTypes.string,
    measure: PropTypes.string,
  })),
};

export default ingredientList;
