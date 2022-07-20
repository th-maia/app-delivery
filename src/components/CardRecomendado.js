import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';

const Card = (props) => {
  const { index, name, imgSrc, id } = props;
  const { location: { pathname } } = useHistory();
  return (
    <Link
      id="item-class"
      to={ `${pathname}/${id}` }
      data-testid={ `${index}-recomendation-card` }
    >
      <img
        alt={ name }
        src={ imgSrc }
        width="176"
        height="152"
      />
      <p data-testid={ `${index}-recomendation-title` }>{name}</p>
    </Link>
  );
};

Card.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
export default Card;
