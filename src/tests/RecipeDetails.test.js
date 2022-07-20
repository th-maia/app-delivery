import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';
import userEvent from '@testing-library/user-event';
import meals from '../../cypress/mocks/meals';

describe('Teste da Tela de Recibe Details', () => {

    beforeEach(() => {
        jest.spyOn(global, 'fetch');
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
})
