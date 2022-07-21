import React from 'react';

function cardHorizontal({ index, doneRecipe }) {
  const { name, category, alcoholic, thumb, doneDate } = doneRecipe;
  return (
    <div>
      <img
        data-testid={ `${index}-horizontal-image` }
        alt="recipe"
        src={ thumb }
      />
      <p data-testid={ `${index}-horizontal-top-text` }>{alcoholic || category}</p>
      <p data-testid={ `${index}-horizontal-name` }>
        { name }
      </p>
      <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
    </div>
  );
}

export default cardHorizontal;
