import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import RecipeContext from '../context/RecipeContext';
import Footer from '../components/Footer';
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
      <Footer />
    </div>
  );
}

export default Foods;
