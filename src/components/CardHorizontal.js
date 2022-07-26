import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShareButton from './ShareButton';

const maxTags = 2;

function doneCardBody({ index, doneDate, tags }) {
  return (
    <div>
      <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
      { tags.slice(0, maxTags).map((tag) => (
        <p data-testid={ `${index}-${tag}-horizontal-tag` } key={ tag }>
          { tag }
        </p>
      ))}
    </div>
  );
}

function CardHorizontal({ index, recipe, cardType }) {
  const { name, category, alcoholicOrNot, image, doneDate, tags, id, type } = recipe;
  const pathtype = type === 'food' ? 'foods' : 'drinks';

  return (
    <div className="details-element">
      <Link to={ `/${pathtype}/${id}` }>
        <img
          id="recipe-photo"
          className="card-details"
          data-testid={ `${index}-horizontal-image` }
          alt="recipe"
          src={ image }
          width="150"
          height="150"
        />
      </Link>
      <p className="details-element" data-testid={ `${index}-horizontal-top-text` }>
        {alcoholicOrNot || `${recipe.nationality} - ${category}`}
      </p>
      <Link to={ `/${pathtype}/${id}` }>
        <p className="details-element" data-testid={ `${index}-horizontal-name` }>
          { name }
        </p>
      </Link>
      <ShareButton
        type={ type }
        id={ id }
        dataTestid={ `${index}-horizontal-share-btn` }
      />
      { cardType === 'doneCard' && doneCardBody({ index, doneDate, tags }) }
    </div>
  );
}

CardHorizontal.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({
    name: PropTypes.string.isRequired,
    category: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    image: PropTypes.string.isRequired,
    doneDate: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    nationality: PropTypes.string,
  }).isRequired,
  cardType: PropTypes.string,
};

CardHorizontal.defaultProps = {
  cardType: '',
};

export default CardHorizontal;
