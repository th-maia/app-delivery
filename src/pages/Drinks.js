import React, { useContext } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import RecipeContext from '../context/RecipeContext';

const MAX_RECIPE_RENDER = 12;

function Drinks() {
  const { getDrink } = useContext(RecipeContext);
  const max = getDrink.drinks && Math.min(getDrink.drinks.length, MAX_RECIPE_RENDER);
  return (
    <div>
      <Header title="Drinks" />
      <ul>
        {getDrink?.drinks?.length > 1
          && getDrink.drinks.slice(0, max).map(
            (value, index) => (
              <li key={ index }>
                <Card
                  index={ index }
                  name={ value.strDrink }
                  imgSrc={ value.strDrinkThumb }
                />
              </li>
            ),
          )}
      </ul>
    </div>
  );
}

export default Drinks;
