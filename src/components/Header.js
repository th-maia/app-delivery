import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

function Header(props) {
  const { title, hasSearchIcon } = props;
  const [mostraPesquisa, setMostraPesquisa] = useState(false);
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
            { mostraPesquisa && <SearchBar />}
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
