import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';
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