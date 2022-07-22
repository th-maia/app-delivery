import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from '../context/RecipeContext';

function IngredientInProgress({ ingredients, id, type }) {
  const { addInProgressRecipes, arrayIngredients,
    getInProgressRecipes } = useContext(RecipeContext);
  console.log(arrayIngredients);
  // const [recebeArray, setRecebeArray] = useState(true);
  const [hasLoad, setHasLoad] = useState(false);

  useEffect(() => {
    // setRecebeArray(!recebeArray);
    getInProgressRecipes(id, type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setHasLoad(true);
  //  setRecebeArray(!recebeArray);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrayIngredients]);

  return (
    <div>
      <ul>
        {hasLoad && ingredients.map(({ ingredient, measure }, index) => (
          <li key={ index }>
            <label
              htmlFor={ ingredient }
              data-testid={ `${index}-ingredient-step` }
            >
              <input
                id={ ingredient }
                key={ index }
                type="checkbox"
                checked={
                  arrayIngredients.length
                  && arrayIngredients.some((ingr) => ingr === index)
                }
                onChange={ () => {
                  addInProgressRecipes(id, index, type);
                  getInProgressRecipes(id, type);
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
