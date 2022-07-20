import React from 'react';
import PropTypes from 'prop-types';

function StartRecipe({ text }) {
  return (
    <button
      className="start-recipe"
      type="button"
      data-testid="start-recipe-btn"
    >
      { text }
    </button>
  );
}

StartRecipe.propTypes = {
  text: PropTypes.string.isRequired,
};

export default StartRecipe;
