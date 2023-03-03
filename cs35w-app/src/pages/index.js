import React from 'react';
import Recipe from '../components/Recipe';
import RenderRecipes from '../components/renderRecipes';
import GetData from '../data/getdata';
import GetRecipes from '../data/getRecipe';
import GetRecipeID from '../data/getRecipeId';

const Home = () => {
  const ids = GetRecipeID();
  return (
    <div>
      <div><h1>Welcome!</h1></div>
      <div id="outer"><h3> <RenderRecipes recipeIds={ids} /></h3></div>

      <Recipe text='salad' />
      <Recipe text='pasta' />
      <Recipe text='french-dipped' />

    </div>

  );
};

export default Home;