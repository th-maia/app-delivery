import React, { useContext } from 'react';
import copy from 'clipboard-copy';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';
import userEvent from '@testing-library/user-event';
import meals from '../../cypress/mocks/meals';
import RecipeContext from '../context/RecipeContext';

describe('Teste da Tela de Recibe Details', () => {

    beforeEach(() => {
        jest.spyOn(global, 'fetch');
        // jest.spyOn(global, 'copy')
        global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(meals),
     })
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
        const { history } = renderWithRouter(<App />);

        history.push('/foods');

        const pega = await screen.findByTestId('1-recipe-card');

        userEvent.click(pega)

        const pegaFavorite = await screen.findByTestId('favorite-btn');
        expect(pegaFavorite).toHaveAttribute('src', 'whiteHeartIcon.svg')
        expect(pegaFavorite).toBeInTheDocument();
        userEvent.click(pegaFavorite)
        expect(pegaFavorite).toHaveAttribute('src', 'blackHeartIcon.svg')
        // expect(addFavoriteRecipe).toHaveBeenCalled();

        const pegaCompartilhar = await screen.findByTestId('share-btn');
        expect(pegaCompartilhar).toBeInTheDocument();
        // userEvent.click(pegaCompartilhar);
        // const spy = jest.spyOn(global, 'addFavoriteRecipe');
        // expect(spy).toHaveBeenCalled();
        
        expect(copy).toBeInstanceOf(Function);

        //userEvent.click(pegaCompartilhar)
 
        //const msgCopia = await screen.findByText(/Link copied!/i);
        //expect(msgCopia).toBeInTheDocument();

        // await waitFor(() => {
        //     expect(msgCopia).not.toBeInTheDocument();
        // }, { timeout: 3000 })
    });
})
