import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import useEvent from '@testing-library/user-event';
import Foods from '../pages/Foods';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';
import ginDrinks from '../../cypress/mocks/ginDrinks';
import userEvent from '@testing-library/user-event';

describe('Teste Tela do SearchBar', () => {
    beforeEach(() => {
        jest.spyOn(global,'fetch').mockResolvedValue({
            json: async () => ginDrinks
            }) 
    });

    afterEach(() => jest.clearAllMocks());

    it('Teste se aparece o campo de pesquisa na searchBar', () => {
        const { history } = renderWithRouter(<App />)
        history.push('/drinks')
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

    it('Teste se ao clicar na imagem de perfil, somos direcionados para a página de comida e bebida', async() => {
        const { history } = renderWithRouter(<App />)
        history.push('/drinks')
        const imgProfile = screen.getByText('Drinks');
        useEvent.click(imgProfile);
        expect(history.location.pathname).toBe('/drinks');   
    });

    it('Teste se ao selecionar gin e ingrediente, o fetch é realizado', async() => {
        
        const { history } = renderWithRouter(<App />)
        history.push('/drinks')
        const imgSearch = screen.getByTestId('search-top-btn');
        useEvent.click(imgSearch);

        const selectName = screen.getByTestId('name-search-radio');
        useEvent.click(selectName);

        const selectFirstLetter = screen.getByTestId('first-letter-search-radio');
        useEvent.click(selectFirstLetter);

        const selectIngredient = screen.getByTestId('ingredient-search-radio');
        useEvent.click(selectIngredient);

        const inputSearch = screen.getByTestId('search-input');
        useEvent.type(inputSearch, 'gin')

        const botaoSearch = screen.getByTestId('exec-search-btn');
        useEvent.click(botaoSearch);

        // expect(drinksApi).toHaveBeenCalled();   
    });

});