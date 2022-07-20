import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import foodsApi from '../api/foodsApi';
import drinksApi from '../api/drinksApi';
import Card from '../components/Card';
import normalize from '../api/normalizeData';
import IngredientList from '../components/IngredientList';
import StartRecipe from '../components/StartRecipe';

function RecipeDetails() {
  const { location: { pathname } } = useHistory();
  const { id } = useParams();
  const type = pathname.includes('foods') ? 'foods' : 'drinks';
  const fetch = type === 'foods' ? foodsApi : drinksApi;
  const fetchRecomedation = type === 'foods' ? drinksApi : foodsApi;
  const [recipeState, setRecipeState] = useState({ recipe: {}, isLoad: false });
  const [recomendation, setRecomendation] = useState([]);

  useEffect(() => {
    fetch('Lookup', id).then((response) => {
      setRecipeState({
        recipe: normalize(response)[0],
        isLoad: true,
      });
    });
    fetchRecomedation().then((response) => {
      setRecomendation(normalize(response, { max: 6 }));
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { recipe, isLoad } = recipeState;
  console.log(recipe?.strMealThumb);
  console.log(type, isLoad);

  const { name,
    thumb,
    video,
    instructions,
    category,
    alcoholic,
    ingredients,
  } = recipe;
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
            {alcoholic || category}
          </h4>
          <IngredientList ingredients={ ingredients } />
          <h4 data-testid="instructions">{instructions}</h4>
          {video
            && <iframe
              width="350"
              height="315"
              data-testid="video"
              src={ video?.replace('/watch?v=', '/embed/') }
              title={ name }
            />}
          { recomendation.map(
            (value, index) => (
              <li key={ index } data-testid={ `${index}-recomendation-card` }>
                <Card
                  index={ index }
                  name={ value.name }
                  imgSrc={ value.thumb }
                  id={ value.id }
                  key={ index }
                />
              </li>
            ),
          )}
        </div>
      )}
      <StartRecipe text="Start Recipe" />
    </div>
  );
}

export default RecipeDetails;
