import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import RecipeFilter from '../components/RecipeFilter';
import CardHorizontal from '../components/CardHorizontal';
import RecipeContext from '../context/RecipeContext';

function DoneRecipe() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [filter, setFilter] = useState('all');
  const { getDoneRecipes } = useContext(RecipeContext);

  const handlerFilter = (value) => setFilter(value);

  useEffect(() => {
    if (filter === 'all') setDoneRecipes(getDoneRecipes());
    else setDoneRecipes(getDoneRecipes().filter((recipe) => (recipe.type === filter)));
    console.log(getDoneRecipes(), filter);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);
  console.log('doneRecipes', doneRecipes);
  return (
    <div>
      <Header title="Done Recipes" hasSearchIcon={ false } />
      <RecipeFilter setFilter={ handlerFilter } />
      { doneRecipes.map((doneRecipe, index) => (
        <CardHorizontal
          key={ index }
          recipe={ doneRecipe }
          index={ index }
          cardType="doneCard"
        />
      ))}
    </div>
  );
}

export default DoneRecipe;
