import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipe from './pages/DoneRecipe';
import FavoriteRecipe from './pages/FavoriteRecipe';
import RecipeProvider from './context/RecipeProvider';

function App() {
  return (
    <RecipeProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/foods" component={ Foods } />
          <Route exact path="/drinks" component={ Drinks } />

          <Route exact path="/foods/:id-da-receita" component={ Foods } />
          <Route exact path="/drinks/:id-da-receita" component={ Drinks } />
          <Route exact path="/foods/:id-da-receita/in-progress" component={ Foods } />
          <Route exact path="/drinks/:id-da-receita/in-progress" component={ Drinks } />

          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/done-recipes" component={ DoneRecipe } />
          <Route exact path="/favorite-recipes" component={ FavoriteRecipe } />
        </Switch>
      </BrowserRouter>
    </RecipeProvider>
  );
}

export default App;
