import React, { useContext, useEffect } from 'react';
import Card from './Card';
import RecipeContext from '../context/RecipeContext';
import drinksApi from '../api/drinksApi';

const MAX_RECIPE_RENDER = 12;

function Drinks() {
  const { getDrink, setGetDrink } = useContext(RecipeContext);
  useEffect(() => {
    drinksApi().then((data) => {
      console.log(data);
      setGetDrink(data);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const max = getDrink.drinks && Math.min(getDrink.drinks.length, MAX_RECIPE_RENDER);
  return (
    <div>
      <ul>
        {getDrink?.drinks
          && getDrink.drinks.slice(0, max).map(
            (value, index) => (
              <li key={ index }>
                <Card
                  index={ index }
                  name={ value.strDrink }
                  imgSrc={ value.strDrinkThumb }
                  id={ value.idDrink }
                />
              </li>
            ),
          )}
      </ul>
    </div>
  );
}

export default Drinks;
