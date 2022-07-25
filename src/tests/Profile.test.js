import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';
import userEvent from '@testing-library/user-event';
import Profile from '../pages/Profile';
import LocalStorageMock from './mock/localstorage.js'

Object.defineProperty(window, 'localStorage', { value: new LocalStorageMock });

describe('Teste da Tela de Profile', () => {

    it('Teste se são renderizados os elementos pelo data-testid', async () => {
        const { history } = renderWithRouter(<App />);
        const email = 'lima_bigs@yahoo.com.br';

        userEvent.type(screen.getByTestId('email-input'), email);
        userEvent.type(screen.getByTestId('password-input'), '1234567');

        const btnEntre = screen.getByTestId('login-submit-btn');
        
        await waitFor(() => {
            expect(btnEntre).not.toBeDisabled();
            userEvent.click(btnEntre);
        });

        history.push('/profile');

        const profileEmailTxt = await screen.findByTestId('profile-email', { name: email });
        const doneButton = screen.getByTestId('profile-done-btn', { name: 'Done Recipes' });
        const favoriteButton = screen.getByTestId('profile-favorite-btn', { name: 'Favorite Recipes' });
        const logoutButton = screen.getByTestId('profile-logout-btn', { name: 'Logout' });

        expect(profileEmailTxt).toBeInTheDocument();
        expect(doneButton).toBeInTheDocument();
        expect(favoriteButton).toBeInTheDocument();
        expect(logoutButton).toBeInTheDocument();

        screen.getByTestId('profile-done-btn', { name: 'Done Recipes' });
        screen.getByTestId('profile-favorite-btn', { name: 'Favorite Recipes' });
        screen.getByTestId('profile-logout-btn', { name: 'Logout' });

        expect(JSON.parse(window.localStorage.store.user)).toStrictEqual({ email });
    });

    it('Teste Rota para Done Recipes', async () => {
        const { history } = renderWithRouter(<Profile />);
        const doneButton = screen.getByTestId('profile-done-btn', { name: 'Done Recipes' });
        userEvent.click(doneButton);
        const { location: { pathname } } = history;
        expect(pathname).toBe('/done-recipes');
    });

    it('Teste Rota para Favorite Recipes', async () => {
        const { history } = renderWithRouter(<Profile />);
        const favoriteButton = screen.getByTestId('profile-favorite-btn', { name: 'Favorite Recipes' });
        userEvent.click(favoriteButton);
        const { location: { pathname } } = history;
        expect(pathname).toBe('/favorite-recipes');
    });

    it('Teste Logout Button', async () => {
        const { history } = renderWithRouter(<Profile />);
        const logoutButton = screen.getByTestId('profile-logout-btn', { name: 'Logout' });
        userEvent.click(logoutButton);
        const { location: { pathname } } = history;
        expect(pathname).toBe('/');
    });
});