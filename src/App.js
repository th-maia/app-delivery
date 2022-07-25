import React from 'react';
import './App.css';
import { Route, Switch, withRouter } from 'react-router-dom';
import RecipeProvider from './context/RecipeProvider';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';

function App() {
  return (
    <RecipeProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods">
          <Recipes type="foods" />
        </Route>
        <Route exact path="/drinks">
          <Recipes type="drinks" />
        </Route>
        <Route
          exact
          path="/foods/:id"
        >
          <RecipeDetails />
        </Route>
        <Route
          exact
          path="/drinks/:id"
          component={ withRouter(RecipeDetails) }
        />
        <Route
          exact
          path="/foods/:id/in-progress"
          component={ withRouter(RecipeInProgress) }
        />

        <Route
          exact
          path="/drinks/:id/in-progress"
          component={ withRouter(RecipeInProgress) }
        />

        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </RecipeProvider>
  );
}

export default App;
