import React, { useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

const aSecond = 1000;

const ShareButton = ({ type, id, dataTestid }) => {
  const [copiedMensage, setCopiedMensage] = useState(false);
  const pathType = type === 'food' ? 'foods' : 'drinks';
  if (copiedMensage) {
    setTimeout(() => setCopiedMensage(false), aSecond);
  }
  return (
    <>
      <input
        type="image"
        alt="shareIcon"
        data-testid={ dataTestid }
        src={ shareIcon }
        onClick={ () => {
          copy(`http://localhost:3000/${pathType}/${id}`);
          setCopiedMensage(true);
        } }
      />
      { copiedMensage && <p> Link copied! </p> }
    </>
  );
};

ShareButton.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  dataTestid: PropTypes.string.isRequired,
};

export default ShareButton;
