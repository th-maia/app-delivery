import React from 'react';
import './App.css';
import { Route, Switch, withRouter } from 'react-router-dom';
import RecipeProvider from './context/RecipeProvider';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import Profile from './pages/Profile';
import DoneRecipe from './pages/DoneRecipe';
import FavoriteRecipe from './pages/FavoriteRecipe';
import RecipeDetails from './pages/RecipeDetails';

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
          component={ withRouter(RecipeDetails) }
        />

        <Route
          exact
          path="/drinks/:id/in-progress"
          component={ withRouter(RecipeDetails) }
        />

        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipe } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipe } />
      </Switch>
    </RecipeProvider>
  );
}

export default App;
