import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';
import userEvent from '@testing-library/user-event';
import FavoriteRecipe from '../pages/FavoriteRecipe';
import LocalStorageMock from './mock/localstorage.js'

Object.defineProperty(window, 'localStorage', { value: new LocalStorageMock });

describe('Teste da Tela de Favorites Recipes', () => {
  const favoriteRecipes = [
    {
      id: '52771',
      type: 'food',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot:  'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    },
  ];
  beforeEach(() => {
    window.localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  })

    it('Teste se são renderizados os elementos pelo data-testid', async () => {
        const { history } = renderWithRouter(<App />);
        history.push('/favorite-recipes');

        const allBtn = screen.getByTestId('filter-by-all-btn');
        const foodBtn = screen.getByTestId('filter-by-food-btn');
        const drinkBtn = screen.getByTestId('filter-by-drink-btn');
        expect(allBtn).toBeInTheDocument();
        expect(foodBtn).toBeInTheDocument();
        expect(drinkBtn).toBeInTheDocument();
        
        await waitFor(()=> {
          const horizontalImage = screen.getByTestId('0-horizontal-image');
          expect(horizontalImage).toBeInTheDocument();
        })

        const horizontalTopText = screen.getByTestId('0-horizontal-top-text');
        const horizontalName = screen.getByTestId('0-horizontal-name');
        const horizontalShareBtn = screen.getByTestId('0-horizontal-share-btn');
        const horizontalFavoriteBtn = screen.getByTestId('0-horizontal-favorite-btn');
       
       
        expect(horizontalTopText).toBeInTheDocument();
        expect(horizontalName).toBeInTheDocument();
        expect(horizontalShareBtn).toBeInTheDocument();
        expect(horizontalFavoriteBtn).toBeInTheDocument();
    })
    it('Teste se ao filtrar por alimentos, são renderizados apenas os alimentos', async () => {
        const { history } = renderWithRouter(<App />);
        history.push('/favorite-recipes');
        await waitFor(()=> {
          const horizontalImage = screen.getByTestId('0-horizontal-image');
          expect(horizontalImage).toBeInTheDocument();
        })
        const foodBtn = screen.getByTestId('filter-by-food-btn');
        userEvent.click(foodBtn);
        const horizontalTopText = screen.getByTestId('0-horizontal-top-text');
        const horizontalName = screen.getByTestId('0-horizontal-name');
        const horizontalShareBtn = screen.getByTestId('0-horizontal-share-btn');
        const horizontalFavoriteBtn = screen.getByTestId('0-horizontal-favorite-btn');
        expect(horizontalTopText).toBeInTheDocument();
        expect(horizontalName).toBeInTheDocument();
        expect(horizontalShareBtn).toBeInTheDocument();
        expect(horizontalFavoriteBtn).toBeInTheDocument();

        expect(horizontalName).toHaveTextContent('Spicy Arrabiata Penne');
        expect(screen.queryByText(/aquamarine/i)).toBeNull()
    });
    it('Teste se ao filtrar por bebidas, são renderizados apenas as bebidas', () => {
        const { history } = renderWithRouter(<App />);
        history.push('/favorite-recipes');

        const drinkBtn = screen.getByTestId('filter-by-drink-btn');
        userEvent.click(drinkBtn);
        const horizontalImage = screen.getByTestId('0-horizontal-image');
        const horizontalTopText = screen.getByTestId('0-horizontal-top-text');
        const horizontalName = screen.getByTestId('0-horizontal-name');
        const horizontalShareBtn = screen.getByTestId('0-horizontal-share-btn');
        const horizontalFavoriteBtn = screen.getByTestId('0-horizontal-favorite-btn');
        expect(horizontalImage).toBeInTheDocument();
        expect(horizontalTopText).toBeInTheDocument();
        expect(horizontalName).toBeInTheDocument();
        expect(horizontalShareBtn).toBeInTheDocument();
        expect(horizontalFavoriteBtn).toBeInTheDocument();

        expect(horizontalName).toHaveTextContent(/Aquamarine/i);
        expect(screen.queryByText('Spicy Arrabiata Penne')).toBeNull();
    });
    it('Teste se ao filtrar por todos, são renderizados todos os elementos', async() => {
        const { history } = renderWithRouter(<App />);
        history.push('/favorite-recipes');

        const horizontalNameFood = await screen.findByTestId('0-horizontal-name');
        const allBtn = screen.getByTestId('filter-by-all-btn');
        userEvent.click(allBtn);
        const horizontalNameDrink = screen.getByTestId('1-horizontal-name');
        expect(horizontalNameFood).toHaveTextContent('Spicy Arrabiata Penne');
        expect(horizontalNameDrink).toHaveTextContent('Aquamarine');
    });
    it('Teste se ao clicar no favorite button o item é removido da lista e do local storage', async() => {
      const { history } = renderWithRouter(<App />);
      history.push('/favorite-recipes');

      const horizontalNameFood = await screen.findByText('Spicy Arrabiata Penne');
      const horizontalFavoriteBtn = screen.getByTestId('0-horizontal-favorite-btn');
      expect(horizontalNameFood).toBeInTheDocument();
      expect(horizontalFavoriteBtn).toBeInTheDocument();

      userEvent.click(horizontalFavoriteBtn);

      expect(screen.queryByText('Spicy Arrabiata Penne')).toBeNull();
      const newFavorites = JSON.parse(window.localStorage.getItem('favoriteRecipes'));

      expect(newFavorites.length).toBe(1);
      expect(newFavorites).toStrictEqual(favoriteRecipes.filter(recipe => recipe.id !== '52771'));
    });
})