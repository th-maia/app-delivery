import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';

function SearchBar() {
  const { fetchFood } = useContext(RecipeContext);
  const [searchValue, setSearchValue] = useState('');
  const [searchType, setSearchType] = useState('Ingredient');
  const history = useHistory();
  const local = history.location.pathname;
  // console.log(local);
  return (
    <div>
      <input
        type="text"
        data-testid="search-input"
        value={ searchValue }
        onChange={ ({ target }) => setSearchValue(target.value) }
      />
      <input
        type="radio"
        data-testid="ingredient-search-radio"
        value="Ingredient"
        onChange={ ({ target }) => setSearchType(target.value) }
        name="typeSearch"
      />
      ingrediente
      <input
        type="radio"
        data-testid="name-search-radio"
        value="Name"
        onChange={ ({ target }) => setSearchType(target.value) }
        name="typeSearch"
      />
      nome
      <input
        type="radio"
        data-testid="first-letter-search-radio"
        value="FirstLetter"
        onChange={ ({ target }) => setSearchType(target.value) }
        name="typeSearch"
      />
      primeira letra
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => fetchFood(searchType, searchValue, local) }
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
