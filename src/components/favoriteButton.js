import React from 'react';
import PropTypes from 'prop-types';
// import nonFavoriteIcon from '../images/whiteHeartIcon.svg';
import favoriteIcon from '../images/blackHeartIcon.svg';

const FavoriteButton = ({ handlerClick, id, testId }) => (
  <input
    type="image"
    alt="favoriteIcon"
    data-testid={ testId }
    src={ favoriteIcon }
    onClick={ () => handlerClick(id) }
  />
);

FavoriteButton.propTypes = {
  handlerClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
};

export default FavoriteButton;
