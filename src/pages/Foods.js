import React, { useContext, useEffect } from 'react';
import Card from '../components/Card';
import RecipeContext from '../context/RecipeContext';
import foodsApi from '../api/foodsApi';

const MAX_RECIPE_RENDER = 12;

function Foods() {
  const { getFood, setGetFood } = useContext(RecipeContext);
  useEffect(() => {
    foodsApi().then((data) => setGetFood(data));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const max = getFood.meals && Math.min(getFood.meals.length, MAX_RECIPE_RENDER);
  return (
    <div>
      <ul>
        { getFood.meals
        && getFood.meals.slice(0, max).map(
          (value, index) => (
            <li key={ index }>
              <Card
                index={ index }
                name={ value.strMeal }
                imgSrc={ value.strMealThumb }
                id={ value.idMeal }
              />
            </li>
          ),
        )}
      </ul>
    </div>
  );
}

export default Foods;
