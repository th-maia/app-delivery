import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import copy from 'clipboard-copy';
import foodsApi from '../api/foodsApi';
import drinksApi from '../api/drinksApi';
import normalize from '../api/normalizeData';
import IngredientList from '../components/IngredientList';
import StartRecipe from '../components/StartRecipe';
import CardRecomendado from '../components/CardRecomendado';
import RecipeContext from '../context/RecipeContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const aSecond = 1000;

function getRecipeStatus(doneRecipes, inProgress, id) {
  if (doneRecipes.find((recipe) => recipe.id === id)) {
    return 'done';
  }
  if (inProgress) {
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
    getFavoriteRecipes,
    addFavoriteRecipe,
    removeFavoriteRecipe,
    isInProgress,
  } = useContext(RecipeContext);
  const { location: { pathname } } = useHistory();
  const { id } = useParams();
  const type = pathname.includes('foods') ? 'foods' : 'drinks';
  const fetch = type === 'foods' ? foodsApi : drinksApi;
  const fetchRecomedation = type === 'foods' ? drinksApi : foodsApi;
  const [recipeState, setRecipeState] = useState({ recipe: {}, isLoad: false });
  const [recomendation, setRecomendation] = useState([]);
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
      isInProgress(id, type),
      id,
    ));
    setFavorite(isFavorite(getFavoriteRecipes(), id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (copiedMensage) {
    setTimeout(() => setCopiedMensage(false), aSecond);
  }

  const { recipe, isLoad } = recipeState;
  // console.log(status);
  // console.log(recipe?.strMealThumb);
  // console.log(type, isLoad);

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
      <h1 id="h1">
        Recipes Details
      </h1>
      {isLoad && (
        <div id="adjustment" className="details-container">
          <img
            id="recipe-photo"
            className="card-details"
            data-testid="recipe-photo"
            alt={ name }
            src={ thumb }
            width="330"
            height="330"
          />
          <h1 className="details-element" data-testid="recipe-title">
            {name}
          </h1>
          <input
            className="details-element"
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
            className="details-element"
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
          <div className="card-details">
            <h4 className="details-element" data-testid="recipe-category">
              {alcoholic || category}
            </h4>
            <IngredientList ingredients={ ingredients } />
            <h4
              id="adjustment"
              className="details-element"
              data-testid="instructions"
            >
              {instructions}

            </h4>
          </div>
          {video
            && <iframe
              className="card-details"
              width="350"
              height="315"
              data-testid="video"
              src={ video?.replace('/watch?v=', '/embed/') }
              title={ name }
            />}
          <div className="items-wrapper">
            <div className="items">
              {recomendation.map(
                (value, index) => (
                  <CardRecomendado
                    index={ index }
                    name={ value.name }
                    imgSrc={ value.thumb }
                    id={ value.id }
                    key={ index }
                  />
                ),
              )}
            </div>
          </div>
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
