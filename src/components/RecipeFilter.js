import React from 'react';
import PropTypes from 'prop-types';

const FILTER_TYPES = ['all', 'food', 'drink'];
function RecipeFilter({ setFilter }) {
  return (
    <div id="filters">
      { FILTER_TYPES.map((filter) => (
        <button
          className="filter-element"
          key={ filter }
          type="button"
          data-testid={ `filter-by-${filter}-btn` }
          onClick={ () => setFilter(filter) }
        >
          { filter }
        </button>
      ))}
    </div>);
}

RecipeFilter.propTypes = {
  setFilter: PropTypes.func.isRequired,
};

export default RecipeFilter;
