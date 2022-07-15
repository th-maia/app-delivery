import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import useEvent from '@testing-library/user-event';
import Foods from '../pages/Foods';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

describe('Teste Tela do Header', () => {
    it('Teste se aparece a Imagens', () => {
        renderWithRouter(<Foods />)
        const imgProfile = screen.getByTestId('profile-top-btn');
        const imgSearch = screen.getByTestId('search-top-btn');

        expect(imgProfile).toBeInTheDocument();
        expect(imgSearch).toBeInTheDocument();
    });

    it('Teste se aparece o campo de pesquisa', () => {
        renderWithRouter(<Foods />)
        const imgSearch = screen.getByTestId('search-top-btn');
        let pesquisaEl = screen.queryByTestId('search-input');

        expect(imgSearch).toBeInTheDocument();
        expect(pesquisaEl).toBeNull();

        useEvent.click(imgSearch);

        pesquisaEl = screen.queryByTestId('search-input');
        expect(pesquisaEl).toBeInTheDocument();

        useEvent.click(imgSearch);

        expect(pesquisaEl).not.toBeInTheDocument();

    });

    it('Teste se ao clicar na imagem de perfil, somos direcionados para a página profile', async() => {
        const { history } = renderWithRouter(<App />)
        history.push('/foods')
        const imgProfile = screen.getByTestId('profile-top-btn');
        useEvent.click(imgProfile);
        expect(history.location.pathname).toBe('/profile');   
    });

});