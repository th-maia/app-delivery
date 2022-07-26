import React, { useContext } from 'react';
import copy from 'clipboard-copy';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';
import userEvent from '@testing-library/user-event';
import meals from '../../cypress/mocks/meals';
import LocalStorageMock from './mock/localstorage';

jest.mock('clipboard-copy');
Object.defineProperty(window, 'localStorage', { value: new LocalStorageMock });
describe('Teste da Tela de Recibe Details', () => {
    const inProgressRecipes = {
        cocktails: {},
        meals: {52977: [3, 5, 6, 8]},
      };
    
      const favoriteRecipes = [
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

    const doneRecipes = [
        {
            id: '178319',
            type: 'drink',
            nationality: '',
            category: 'Cocktail',
            alcoholicOrNot: 'Alcoholic',
            name: 'Aquamarine',
            image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
            doneDate: '23/06/2020',
            tags: [],
        },
    ]

    beforeEach(() => {
    jest.spyOn(global, 'fetch');
     window.localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
     window.localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
     window.localStorage.setItem('doneRecipes', JSON.stringify(favoriteRecipes));
    });

    afterEach(() => {
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
        global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(meals),
        });
        
        copy.mockImplementation( () => console.log('vai passar'));
        const { history } = renderWithRouter(<App />);

        history.push('/foods');

        const pega = await screen.findByTestId('1-recipe-card');

        userEvent.click(pega)

        const pegaFavorite = await screen.findByTestId('favorite-btn');
        expect(pegaFavorite).toBeInTheDocument();
        expect(pegaFavorite).toHaveAttribute('src', 'whiteHeartIcon.svg')
        userEvent.click(pegaFavorite)
        expect(pegaFavorite).toHaveAttribute('src', 'blackHeartIcon.svg')

        const pegaCompartilhar = await screen.findByTestId('share-btn');
        expect(pegaCompartilhar).toBeInTheDocument();
        userEvent.click(pegaCompartilhar)

        const copied = await screen.findByText('Link copied!');

        await waitFor(() => {
            expect(copied).not.toBeInTheDocument()
        });

        const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
        expect(favorites.some((recipe) => recipe.id === '52977')).toBeTruthy();

        userEvent.click(pegaFavorite)
        expect(pegaFavorite).toHaveAttribute('src', 'whiteHeartIcon.svg')

        expect(copy).toHaveBeenCalled();
    });

    it('Teste StartRecipeButton', async () => {
        const { history } = renderWithRouter(<App />);

        history.push('/foods/52977');
        
        const startBtn = await screen.findByTestId('start-recipe-btn');

        expect(startBtn).toBeInTheDocument();
        expect(startBtn).toHaveTextContent(/Continue Recipe/i);

    });

    it('Teste', async () => {
        
        const { history } = renderWithRouter(<App />);
        history.push('/drinks/178319');
        expect(await screen.findByTestId('0-recomendation-card')).toBeInTheDocument();
        expect(screen.getByTestId('1-recomendation-card')).toBeInTheDocument();
    });

    it('Test2', async () => {

        const { history } = renderWithRouter(<App />);
        history.push('/drinks/15997');

        await waitFor(() => {
            expect(fetch).toBeCalled();
        })
        expect(fetch).toBeCalledWith(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997`)
    });

    it('Test3', async () => {
        const { history } = renderWithRouter(<App />);
        history.push('/drinks/1asfasf');

        await waitFor(() => {
            expect(fetch).toBeCalled();
        })
        expect(fetch).toBeCalledWith(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=1asfasf`)
    });
});
