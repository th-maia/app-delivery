import React from 'react';
import './App.css';
import Login from './components/Login';
import RecipeProvider from './context/RecipeProvider';

function App() {
  return (
    <RecipeProvider>
      <Login />
    </RecipeProvider>
  );
}

export default App;
