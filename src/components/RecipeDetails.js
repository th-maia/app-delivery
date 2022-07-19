import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import foodsApi from '../api/foodsApi';
import drinksApi from '../api/drinksApi';
import Card from './Card';

function propsToArray(data, propName) {
  return Object.keys(data).reduce((arr, key) => (
    (key.includes(propName) && data[key] !== '' && data[key] !== null
      ? [...arr, data[key]]
      : arr
    )), []);
}

function RecipeDetails() {
  const { location: { pathname } } = useHistory();
  const { id } = useParams();
  const type = pathname.includes('foods') ? 'foods' : 'drinks';
  const fetch = type === 'foods' ? foodsApi : drinksApi;
  const fetchRecomedation = type === 'foods' ? drinksApi : foodsApi;
  const [recipeState, setRecipeState] = useState({ recipe: {}, isLoad: false });
  const [ingredients, setIngredients] = useState([]);
  const [recomendation, setRecomendation] = useState([]);
  const MAX = 6;

  useEffect(() => {
    fetch('Lookup', id).then((response) => {
      const recipe = response[type === 'foods' ? 'meals' : 'drinks'][0];
      setRecipeState({
        recipe,
        isLoad: true,
      });
      const [ingredientsList, measures] = [
        propsToArray(recipe, 'Ingredient'),
        propsToArray(recipe, 'Measure'),
      ];
      setIngredients(
        ingredientsList.map(
          (ingredient, index) => ({ ingredient, measure: measures[index] }),
        ),
      );
    });
    fetchRecomedation().then((response) => {
      setRecomendation(response[type === 'foods' ? 'drinks' : 'meals']);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { recipe, isLoad } = recipeState;
  console.log(recipe?.strMealThumb);
  console.log(type, isLoad);

  const [name, thumb, urlVideo, instructions, category] = type === 'foods'
    ? [recipe.strMeal, recipe.strMealThumb, recipe.strYoutube,
      recipe.strInstructions, recipe.strCategory]
    : [recipe.strDrink, recipe.strDrinkThumb, recipe.strVideo,
      recipe.strInstructions, recipe.strAlcoholic];

  // const searchInRecipe = (data) => {
  //   const itens = (Object.keys(recipe)).includes(`${data}`);
  //   const eachIngredients = recipe.filter((key, index) => recipe[itens[index]] !== '' && recipe[itens[index]] !== null);
  //   return eachIngredients;
  // };
  console.log(recomendation);
  return (
    <div>
      Recipes Details
      {isLoad && (
        <div>
          <img
            data-testid="recipe-photo"
            alt={ name }
            src={ thumb }
            width="330"
            height="330"
          />
          <h1 data-testid="recipe-title">
            {name}
          </h1>
          <h4 data-testid="recipe-category">
            {category}
          </h4>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
                {`${ingredient.measure} - ${ingredient.ingredient}`}
              </li>
            ))}
          </ul>
          <h4 data-testid="instructions">{instructions}</h4>
          {urlVideo
            && <iframe
              width="350"
              height="315"
              data-testid="video"
              src={ urlVideo?.replace('/watch?v=', '/embed/') }
              title={ name }
            />}
          { recomendation.slice(0, MAX).map(
            (value, index) => (
              <li key={ index } data-testid={ `${index}-recomendation-card` }>
                <Card
                  index={ index }
                  name={ type === 'foods' ? value.strDrink : value.strMeal }
                  imgSrc={ type === 'foods' ? value.strDrinkThumb : value.strMealThumb }
                  id={ type === 'foods' ? value.idDrink : value.idMeal }
                  key={ index }
                />
              </li>
            ),
          )}
        </div>
      )}
    </div>
  );
}

export default RecipeDetails;
