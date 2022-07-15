import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';

function Header(props) {
  const { fetchFood } = useContext(RecipeContext);
  const { title, hasSearchIcon } = props;
  const [mostraPesquisa, setMostraPesquisa] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchType, setSearchType] = useState('Ingredient');
  return (
    <div>
      <Link to="/profile">
        <img
          data-testid="profile-top-btn"
          src="../images/profileIcon.svg"
          alt="Imagem perfil"
        />
      </Link>

      { /* Fazer o teste do req  */}

      {
        hasSearchIcon
        && (
          <div>
            <button type="button" onClick={ () => setMostraPesquisa(!mostraPesquisa) }>
              <img
                data-testid="search-top-btn"
                src="../images/searchIcon.svg"
                alt="Imagem pesquisa"
              />
            </button>
            { mostraPesquisa
            && (
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
                  onClick={ () => fetchFood(searchType, searchValue) }
                >
                  Buscar
                </button>
              </div>
            )}
          </div>
        )
      }
      <h1 data-testid="page-title">
        {title}
      </h1>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  hasSearchIcon: PropTypes.bool,
};

Header.defaultProps = {
  hasSearchIcon: true,
};

export default Header;
