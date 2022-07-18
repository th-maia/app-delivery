import React, { useContext } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import RecipeContext from '../context/RecipeContext';

const MAX_RECIPE_RENDER = 12;

function Foods() {
  const { getFood } = useContext(RecipeContext);
  const max = getFood.meals && Math.min(getFood.meals.length, MAX_RECIPE_RENDER);
  return (
    <div>
      <Header title="Foods" />
      <ul>
        {getFood.meals?.length > 1
          && getFood.meals.slice(0, max).map(
            (value, index) => (
              <li key={ index }>
                <Card
                  index={ index }
                  name={ value.strMeal }
                  imgSrc={ value.strMealThumb }
                />
              </li>
            ),
          )}
      </ul>
    </div>
  );
}

export default Foods;
