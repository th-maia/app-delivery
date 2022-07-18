import React from 'react';
import { useHistory } from 'react-router-dom';
import imgDrink from '../images/drinkIcon.svg';
import imgFood from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();
  return (
    <footer data-testid="footer">
      <input
        type="image"
        alt="ir para página de drinks"
        src={ imgDrink }
        data-testid="drinks-bottom-btn"
        onClick={ () => history.push('/drinks') }
      />
      <input
        type="image"
        alt="ir para página de comidas"
        src={ imgFood }
        data-testid="food-bottom-btn"
        onClick={ () => history.push('/foods') }
      />
    </footer>
  );
}

export default Footer;
