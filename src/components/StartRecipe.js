import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';

function StartRecipe({ text }) {
  const history = useHistory();
  const { id } = useParams();
  return (
    <button
      className="start-recipe"
      type="button"
      data-testid="start-recipe-btn"
      onClick={ () => history.push(`${id}/in-progress`) }
    >
      { text }
    </button>
  );
}

StartRecipe.propTypes = {
  text: PropTypes.string.isRequired,
};

export default StartRecipe;
