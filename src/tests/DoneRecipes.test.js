import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';
import userEvent from '@testing-library/user-event';
import LocalStorageMock from './mock/localstorage.js'
import RecipeProvider from '../context/RecipeProvider';
import DoneRecipes from '../pages/DoneRecipes';

Object.defineProperty(window, 'localStorage', { value: new LocalStorageMock });

describe('Teste da Tela de Done Recipes', () => {
    const doneRecipes = [
        {
            id: '52771',
            type: 'food',
            nationality: 'Italian',
            category: 'Vegetarian',
            alcoholicOrNot: '',
            name: 'Spicy Arrabiata Penne',
            image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
            doneDate: '23/06/2020',
            tags: ['Pasta', 'Curry'],
        },
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
    ];
    beforeEach(() => {
        window.localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    });

    it('Teste se são renderizados os elementos de filtragem pelo data-testid', () => {
        const { history } = renderWithRouter(<App />);
        history.push('/done-recipes');

        const allBtn = screen.getByTestId('filter-by-all-btn');
        const foodBtn = screen.getByTestId('filter-by-food-btn');
        const drinkBtn = screen.getByTestId('filter-by-drink-btn');
        expect(allBtn).toBeInTheDocument();
        expect(foodBtn).toBeInTheDocument();
        expect(drinkBtn).toBeInTheDocument();
    });
    it('Teste se são renderizados os elementos pelo data-testid', async () => {
        const { history } = renderWithRouter(<App />);
        const tags = ['Pasta', 'Curry'];
        history.push('/done-recipes');

        expect(await screen.findByTestId('0-horizontal-image')).toBeInTheDocument();
        expect(screen.getByTestId('0-horizontal-top-text')).toBeInTheDocument();
        expect(screen.getByTestId('0-horizontal-name')).toBeInTheDocument();
        expect(screen.getByTestId('0-horizontal-share-btn')).toBeInTheDocument();
        tags.forEach((tag) => {
            expect(screen.getByTestId(`0-${tag}-horizontal-tag`)).toBeInTheDocument();
        });
    });
    it('Teste se ao filtar por "food" são renderizados apenas as comidas', async () => {
        const { history } = renderWithRouter(<App />);
        history.push('/done-recipes');
        const foodBtn = screen.getByTestId('filter-by-food-btn');

        expect(await screen.findByTestId('0-horizontal-image')).toBeInTheDocument();
        userEvent.click(foodBtn);

        expect(screen.getByText(/Spicy Arrabiata Penne/i)).toBeInTheDocument();
        expect(screen.queryByText(/Aquamarine/i)).toBeNull();
    });
    it('Teste se ao filtar por "drink" são renderizados apenas as comidas', async () => {
        const { history } = renderWithRouter(<RecipeProvider><DoneRecipes /></RecipeProvider>);
        //history.push('/done-recipes');
        const drinkBtn = screen.getByTestId('filter-by-drink-btn');

        expect(await screen.findByTestId('0-horizontal-image')).toBeInTheDocument();
        userEvent.click(drinkBtn);

        expect(screen.getByText(/Aquamarine/i)).toBeInTheDocument();
        expect(screen.queryByText(/Spicy Arrabiata Penne/i)).toBeNull();
    });
    it('Teste se ao filtar por "all" são renderizados todos os elementos', async () => {
        const { history } = renderWithRouter(<App />);
        history.push('/done-recipes');
        const allBtn = screen.getByTestId('filter-by-all-btn');

        expect(await screen.findByTestId('0-horizontal-image')).toBeInTheDocument();
        userEvent.click(allBtn);

        expect(screen.getByTestId('0-horizontal-top-text')).toBeInTheDocument();
        expect(screen.getByTestId('0-horizontal-name')).toBeInTheDocument();
        expect(screen.getByTestId('0-horizontal-share-btn')).toBeInTheDocument();

        expect(screen.getByTestId('1-horizontal-top-text')).toBeInTheDocument();
        expect(screen.getByTestId('1-horizontal-name')).toBeInTheDocument();
        expect(screen.getByTestId('1-horizontal-share-btn')).toBeInTheDocument();
    });
});