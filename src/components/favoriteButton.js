import React from 'react';
import PropTypes from 'prop-types';
import nonFavoriteIcon from '../images/whiteHeartIcon.svg';
import favoriteIcon from '../images/blackHeartIcon.svg';

const FavoriteButton = ({ isFavorite, handlerClick, id, testId }) => (
  <input
    type="image"
    alt="favoriteIcon"
    data-testid={ testId }
    src={ isFavorite ? favoriteIcon : nonFavoriteIcon }
    onClick={ () => handlerClick(id) }
  />
);

FavoriteButton.propTypes = {
  isFavorite: PropTypes.bool,
  handlerClick: PropTypes.func,
  id: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
};

FavoriteButton.defaultProps = {
  isFavorite: false,
  handlerClick: () => {},
};

export default FavoriteButton;
