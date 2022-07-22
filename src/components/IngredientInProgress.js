import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from '../context/RecipeContext';

function IngredientInProgress({ ingredients, id, type }) {
  const { addInProgressRecipes, arrayIngredients } = useContext(RecipeContext);

  return (
    <div>
      <ul>
        {ingredients.map(({ ingredient, measure }, index) => (
          <li key={ index }>
            <label
              htmlFor={ ingredient }
              data-testid={ `${index}-ingredient-step` }
            >
              <input
                id={ ingredient }
                key={ index }
                type="checkbox"
                checked={ () => (
                  arrayIngredients && arrayIngredients.some((ingr) => ingr === index)
                ) }
                onChange={ () => {
                  addInProgressRecipes(id, index, type);
                } }
              />
              {`${measure} - ${ingredient}`}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

IngredientInProgress.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    ingredient: PropTypes.string,
    measure: PropTypes.string,
  })).isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default IngredientInProgress;
