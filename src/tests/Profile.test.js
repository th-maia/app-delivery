import React, { useContext } from 'react';
import copy from 'clipboard-copy';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';
import userEvent from '@testing-library/user-event';
import meals from '../../cypress/mocks/meals';
import RecipeContext from '../context/RecipeContext';
import Profile from '../pages/Profile';

describe('Teste da Tela de Recibe Details', () => {

    it('Teste se são renderizados os elementos pelo data-testid', async () => {
        const { history } = renderWithRouter(<App />);
        const email = 'lima_bigs@yahoo.com.br';

        useEvent.type(screen.getByTestId('email-input'), email);
        useEvent.type(screen.getByTestId('password-input'), '1234567');

        const btnEntre = screen.getByTestId('login-submit-btn');
        
        await waitFor(() => {
            expect(btnEntre).not.toBeDisabled();
            useEvent.click(btnEntre);
        });

        screen.getByTestId('profile-email', { name: email });
        screen.getByTestId('profile-done-btn', { name: 'Done Recipes' });
        screen.getByTestId('profile-favorite-btn', { name: 'Favorite Recipes' });
        screen.getByTestId('profile-logout-btn', { name: 'Logout' });
    });
});