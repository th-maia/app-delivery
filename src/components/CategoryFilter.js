import React from 'react';

const CategoryFilter = () => {
  const categories = [];
  return (
    <ul>
      <li>All</li>
      {categories.map((category, index) => (
        <li key={ index }>
          <button
            type="button"
            data-testid={ `${category}-category-filter` }
          >
            {category}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CategoryFilter;
