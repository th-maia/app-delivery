import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import useEvent from '@testing-library/user-event';
import Foods from '../pages/Foods';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';
import ginDrinks from '../../cypress/mocks/ginDrinks';
import userEvent from '@testing-library/user-event';

describe('Testes do componente footer', () =>{

    it('Verifica se os icones que direcionam para as páginas aparecem', () => {
        const { history } = renderWithRouter(<App />);
        history.push('/foods')
        const iconeDrink = screen.getByTestId('drinks-bottom-btn')
        const iconeFood = screen.getByTestId('food-bottom-btn')

        expect(iconeDrink).toBeInTheDocument();
        expect(iconeFood).toBeInTheDocument();

    })

    it('Teste se ao clicar no icone de drinks, se somos direcionados para a página de drinks', async() => {
        const { history } = renderWithRouter(<App />)
        history.push('/foods')
        const iconeDrink = screen.getByTestId('drinks-bottom-btn')
        userEvent.click(iconeDrink);
        expect(history.location.pathname).toBe('/drinks');   
    });
    
    it('Teste se ao clicar no icone de foods, se somos direcionados para a página de foods', async() => {
        const { history } = renderWithRouter(<App />)
        history.push('/drinks')
        const iconeFood = screen.getByTestId('food-bottom-btn')
        userEvent.click(iconeFood);
        expect(history.location.pathname).toBe('/foods');   
    });
    
})