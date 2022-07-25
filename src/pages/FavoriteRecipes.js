import React, { useContext, useEffect, useState } from 'react';
import FavoriteButton from '../components/favoriteButton';
import Header from '../components/Header';
import RecipeFilter from '../components/RecipeFilter';
import RecipeContext from '../context/RecipeContext';
import CardHorizontal from '../components/CardHorizontal';

function FavoriteRecipes() {
  const [favorites, setFavorites] = useState([]);
  const [filter, setFilter] = useState('all');
  const { getFavoriteRecipes, removeFavoriteRecipe } = useContext(RecipeContext);

  const getFavorites = () => {
    if (filter === 'all') setFavorites(getFavoriteRecipes());
    else {
      setFavorites(getFavoriteRecipes().filter((recipe) => (recipe.type === filter)));
    }
  };

  const removeFavorite = (id) => {
    removeFavoriteRecipe(id);
    getFavorites();
  };

  const handlerFilter = (value) => setFilter(value);

  useEffect(() => {
    getFavorites();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return (
    <>
      <Header title="Favorite Recipes" hasSearchIcon={ false } />
      <RecipeFilter setFilter={ handlerFilter } />
      { favorites.map((favorite, index) => (
        <div key={ index }>
          <CardHorizontal index={ index } recipe={ favorite } />
          <FavoriteButton
            isFavorite
            handlerClick={ removeFavorite }
            id={ favorite.id }
            testId={ `${index}-horizontal-favorite-btn` }
          />
        </div>
      ))}
    </>
  );
}

export default FavoriteRecipes;
