import React, { useContext } from 'react';
import copy from 'clipboard-copy';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';
import userEvent from '@testing-library/user-event';
import meals from '../../cypress/mocks/meals';
import RecipeContext from '../context/RecipeContext';
import LocalStorageMock from './mock/localstorage';

jest.mock('clipboard-copy');
Object.defineProperty(window, 'localStorage', { value: new LocalStorageMock });
const favoritesLocal = [{
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot:  'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  },
];
describe('Teste da Tela de Recibe in Progress', () => {

    beforeEach(() => {
        jest.spyOn(global, 'fetch');
        // jest.spyOn(global, 'copy')
        global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(meals),
     });
     window.localStorage.setItem('favoriteRecipes', JSON.stringify(favoritesLocal));
    });

    afterEach(() => {
        // restore the spy created with spyOn
        jest.restoreAllMocks();
      });      

    it('Teste se são renderizados os elementos pelo data-testid', async () => {
        const { history } = renderWithRouter(<App />);

        history.push('/foods');

        const pega = await screen.findByTestId('0-recipe-card');

        userEvent.click(pega)

        await waitFor(() => {
            expect(pega).not.toBeInTheDocument();
            const photoEl = screen.getByTestId('recipe-photo');
            expect(photoEl).toBeInTheDocument();
        })
    });

    it('Teste se os botões de favorite e compartilhamento aparecem', async () => {

        copy.mockImplementation( (url) => console.log('url'));
        const { history } = renderWithRouter(<App />);

        history.push('/foods/52977/in-progress');

        const pegaFavorite = await screen.findByTestId('favorite-btn');
        expect(pegaFavorite).toBeInTheDocument();
        expect(pegaFavorite).toHaveAttribute('src', 'whiteHeartIcon.svg')
        userEvent.click(pegaFavorite)
        expect(pegaFavorite).toHaveAttribute('src', 'blackHeartIcon.svg')

        const pegaCompartilhar = await screen.findByTestId('share-btn');
        expect(pegaCompartilhar).toBeInTheDocument();
        userEvent.click(pegaCompartilhar)

        const copied = await screen.findByText('Link copied!');

        expect(copy).toBeCalled();
        expect(copy).toBeCalledWith('http://localhost:3000/foods/52977');

        await waitFor(() => {
            expect(copied).not.toBeInTheDocument()
        });

        const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
        expect(favorites.some((recipe) => recipe.id === '52977')).toBeTruthy();

        userEvent.click(pegaFavorite)
        expect(pegaFavorite).toHaveAttribute('src', 'whiteHeartIcon.svg')

        expect(copy).toHaveBeenCalled();
    });

    

    it('Teste se é possivel clicar no checkbox', async () => {
        const { history } = renderWithRouter(<App />);

        history.push('/foods');

        const pega = await screen.findByTestId('1-recipe-card');

        userEvent.click(pega)

        const startBtn = await screen.findByTestId('start-recipe-btn');
        expect(startBtn).toBeInTheDocument();

        userEvent.click(startBtn);


        const pegaCheckBox = await screen.findByTestId('0-ingredient-step');
        expect(pegaCheckBox).toBeInTheDocument();

        userEvent.click(pegaCheckBox);

    });
    it('Teste finish-recipe-btn', async () => {
        const { history } = renderWithRouter(<App />);
        history.push('/drinks/178319/in-progress');

        const finishBtn = await screen.findByTestId('finish-recipe-btn');
        const pegaFavorite = await screen.findByTestId('favorite-btn');
        expect(pegaFavorite).toHaveAttribute('src', 'blackHeartIcon.svg')


        expect(finishBtn).toBeInTheDocument();
        const checkboxes = screen.getAllByRole('checkbox');
        checkboxes.forEach(checkbox => {userEvent.click(checkbox)});

        userEvent.click(finishBtn);
        expect(await screen.findByTestId('0-horizontal-image')).toBeInTheDocument();
        expect(history.location.pathname).toBe('/done-recipes');

        expect(localStorage.getItem('doneRecipes')).not.toBeNull();

    })
})
