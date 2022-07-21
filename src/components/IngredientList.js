import React from 'react';
import PropTypes from 'prop-types';

function checkbox(index, content) {
  return (
    <label
      htmlFor={ ingredient }
      data-testid={ `${index}-ingredient-step` }
    >
      <input id={ ingredient } key={ index } type="checkbox" />
      {content}
    </label>
  );
}

function ingredientList({ ingredients, inProgress }) {
  return (
    <ul>
      {ingredients.map(({ ingredient, measure }, index) => (
        <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
          {inProgress
            ? checkbox(index, `${measure} - ${ingredient}`)
            : `${measure} - ${ingredient}`}
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
  inProgress: PropTypes.bool,
};

ingredientList.defaultProps = {
  inProgress: false,
};

export default ingredientList;
