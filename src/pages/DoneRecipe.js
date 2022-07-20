import React from 'react';
import Header from '../components/Header';
import RecipeFilter from '../components/RecipeFilter';

function DoneRecipe() {
  // const doneRecipes = [];
  return (
    <div>
      <Header title="Done Recipes" hasSearchIcon={ false } />
      <RecipeFilter />
    </div>
  );
}

export default DoneRecipe;
