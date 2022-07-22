import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';

function StartRecipe({ text }) {
  const { getInProgressRecipes } = useContext(RecipeContext);
  const history = useHistory();
  const { id } = useParams();
  const type = (history.location.pathname).replace('/', '');
  return (
    <button
      className="start-recipe"
      type="button"
      data-testid="start-recipe-btn"
      onClick={ () => {
        getInProgressRecipes(id, type);
        history.push(`${id}/in-progress`);
      } }
    >
      { text }
    </button>
  );
}

StartRecipe.propTypes = {
  text: PropTypes.string.isRequired,
};

export default StartRecipe;
