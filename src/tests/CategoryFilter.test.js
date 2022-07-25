import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../helper/renderWithRouter';
import mealCategories from '../../cypress/mocks/mealCategories';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import breakfastMeals from '../../cypress/mocks/breakfastMeals';
import userEvent from '@testing-library/user-event';
import cocktailDrinks from '../../cypress/mocks/cocktailDrinks';
// import meals from '../../cypress/mocks/meals';

const URL_MEALS_CATEGORIES = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list'; 
const URL_DRINKS_CATEGORIES = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const URL_BREAKFAST = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast';
const URL_COCKTAILS = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail';
const URL_ALL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const MEALS_FIRST_CATEGORIES = mealCategories.meals.slice(0, 6); 
const DRINKS_FIRST_CATEGORIES = drinkCategories.drinks.slice(0, 6);

const COCKTAILS_RESULTS = cocktailDrinks.drinks.slice(0, 12);

describe('Teste do Component Category Filter', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    fetch.mockImplementation((url) => {
      switch(url) {
        case URL_MEALS_CATEGORIES: return { json: () => Promise.resolve(mealCategories) };
        case URL_DRINKS_CATEGORIES: return { json: () => Promise.resolve(drinkCategories) };
        case URL_BREAKFAST: return { json: () => Promise.resolve(breakfastMeals) };
        case URL_ALL: return { json: () => Promise.resolve({}) };
        case URL_COCKTAILS: return { json: () => Promise.resolve(cocktailDrinks) };
        default : return { json: () => Promise.resolve({}) };
      }
    })
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Teste CategoryFilter na url /foods', async () => {
    const { history } = renderWithRouter(<App />)
    history.push('/foods')

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });

    expect(fetch).toHaveBeenCalledWith(URL_MEALS_CATEGORIES);

    ['All', ...MEALS_FIRST_CATEGORIES].forEach(async ({ strCategory }) => {
      await screen.findByTestId(`${strCategory}-category-filter`);
    });
  });

  it('Teste CategoryFilter na url /drinks', async () => {
    const { history } = renderWithRouter(<App />)
    history.push('/drinks')

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });

    

    ['All', ...DRINKS_FIRST_CATEGORIES].forEach(async ({ strCategory }) => {
      await screen.findByTestId(`${strCategory}-category-filter`);
    });
  });

  it('Teste se são mostrados apenas as receitas da categoria mostrada na url /foods', async () => {
    
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    const breakfastBtn = await screen.findByTestId('Breakfast-category-filter');
    userEvent.click(breakfastBtn);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });
    expect(fetch).toHaveBeenCalledWith(URL_BREAKFAST);
    expect(await screen.findByText('Breakfast Potatoes')).toBeInTheDocument();

    breakfastMeals.meals.forEach(({ strMeal }) => {
      expect(screen.getByText(strMeal)).toBeInTheDocument();
    });
    const output = await Promise.all(breakfastMeals.meals.map(({ strMeal }) => {
      return screen.findByText(strMeal);
    }));
    expect(output).toHaveLength(breakfastMeals.meals.length);
    
    

    userEvent.click(breakfastBtn);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });
    
    expect(fetch).toHaveBeenCalledWith(URL_ALL);

  });

  it('Teste se são mostrados apenas as receitas da categoria mostrada na url /foods', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    const allBtn = await screen.findByTestId('All-category-filter');
    userEvent.click(allBtn);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });
    expect(fetch).toHaveBeenCalledWith(URL_ALL);
  });

  it('Teste se são mostrados apenas as receitas da categoria mostrada na url /drinks', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');

    const cocktailBtn = await screen.findByTestId('Cocktail-category-filter');
    userEvent.click(cocktailBtn);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });
    expect(fetch).toHaveBeenCalledWith(URL_COCKTAILS);

    COCKTAILS_RESULTS.forEach(async ({ strDrink }) => {
      expect(await screen.findByText(strDrink)).toBeInTheDocument();
    });
  });

});