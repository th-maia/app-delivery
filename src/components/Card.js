import React from 'react';
import PropTypes from 'prop-types';

const Card = (props) => {
  const { index, name, imgSrc } = props;
  //   console.log(getFood.meals[index]);
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        alt={ name }
        data-testid={ `${index}-card-img` }
        src={ imgSrc }
        width="150"
        height="150"
      />
      <p data-testid={ `${index}-card-name` }>{name}</p>
    </div>
  );
};

Card.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
};
export default Card;
