import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import copy from 'clipboard-copy';
import foodsApi from '../api/foodsApi';
import drinksApi from '../api/drinksApi';
import normalize from '../api/normalizeData';
import IngredientInProgress from '../components/IngredientInProgress';
import StartRecipe from '../components/StartRecipe';
import RecipeContext from '../context/RecipeContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const aSecond = 1000;

function getRecipeStatus(doneRecipes, inProgress, id) {
  if (doneRecipes.find((recipe) => recipe.id === id)) {
    return 'done';
  }
  if (Object.keys(inProgress).filter((recipe) => recipe.id === id)) {
    return 'in progress';
  }
  // verificar in progress
  return 'undone';
}

function isFavorite(favorites, id) {
  return favorites.find((recipe) => recipe.id === id);
}

function RecipeDetails() {
  const {
    getDoneRecipes,
    getInProgressRecipes,
    getFavoriteRecipes,
    addFavoriteRecipe,
    removeFavoriteRecipe,
  } = useContext(RecipeContext);
  const { location: { pathname } } = useHistory();
  const { id } = useParams();
  const type = pathname.includes('foods') ? 'foods' : 'drinks';
  const fetch = type === 'foods' ? foodsApi : drinksApi;
  const fetchRecomedation = type === 'foods' ? drinksApi : foodsApi;
  const [recipeState, setRecipeState] = useState({ recipe: {}, isLoad: false });
  const [status, setStatus] = useState('done');// done , in progress, undone
  const [copiedMensage, setCopiedMensage] = useState(false);
  const [favorite, setFavorite] = useState(false);

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
    setStatus(getRecipeStatus(
      getDoneRecipes(),
      getInProgressRecipes(),
      id,
    ));
    setFavorite(isFavorite(getFavoriteRecipes(), id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (copiedMensage) {
    setTimeout(() => setCopiedMensage(false), aSecond);
  }

  const { recipe, isLoad } = recipeState;
  // console.log(recipe?.strMealThumb);
  // console.log(type, isLoad);

  const { name,
    thumb,
    instructions,
    category,
    alcoholic,
    ingredients,
  } = recipe;
  return (
    <div>
      Recipe in Progress
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
          <input
            type="image"
            alt="shareIcon"
            data-testid="share-btn"
            src={ shareIcon }
            onClick={ () => {
              copy(`http://localhost:3000${pathname}`);
              setCopiedMensage(true);
            } }
          />
          <input
            type="image"
            alt="favoriteIcon"
            data-testid="favorite-btn"
            src={ favorite ? blackHeartIcon : whiteHeartIcon }
            onClick={ () => {
              if (favorite) removeFavoriteRecipe(id);
              else addFavoriteRecipe(recipe);
              setFavorite(!favorite);
            } }
          />
          { copiedMensage && <p> Link copied! </p> }
          <h4 data-testid="recipe-category">
            {alcoholic || category}
          </h4>
          <IngredientInProgress ingredients={ ingredients } inProgress />
          <h4 data-testid="instructions">{instructions}</h4>
        </div>
      )}
      {status !== 'done'
      && (
        <StartRecipe
          text={ status === 'undone' ? 'Start Recipe' : 'Continue Recipe' }
        />
      )}
    </div>
  );
}

export default RecipeDetails;
