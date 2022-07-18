import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import RecipeContext from '../context/RecipeContext';
import Footer from '../components/Footer';
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
      <Footer />
    </div>
  );
}

export default Drinks;
