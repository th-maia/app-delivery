import React from 'react';
import PropTypes from 'prop-types';

function ingredientInProgress({ ingredients }) {
  return (
    <div>
      <ul>
        {ingredients.map(({ ingredient, measure }, index) => (
          <li key={ index }>
            <label
              htmlFor={ ingredient }
              data-testid={ `${index}-ingredient-step` }
            >
              <input id={ ingredient } key={ index } type="checkbox" />
              {`${measure} - ${ingredient}`}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

ingredientInProgress.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    ingredient: PropTypes.string,
    measure: PropTypes.string,
  })),
};

export default ingredientInProgress;
