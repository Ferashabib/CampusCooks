import React from 'react';
import Recipe from '../components/Recipe';
import RenderRecipes from '../components/renderRecipes';
import GetRecipeID from '../data/getRecipeId';
import { getAuth } from "firebase/auth";
import { useState } from "react";

const favorite = () => {
  window.location.assign('/favorite')
}


const Home = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const Greeting = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setModalIsOpen(true);
      return "Welcome! " + user.email;

    } else {
      return "Welcome! Guest.";
    }
  }
  const FavButton = () => {
    return (
      <button onClick={favorite} className='btn'>You favorite recipe</button>
    )
  }

  const ids = GetRecipeID();
  return (
    <div>
      <div><h1><Greeting /></h1></div>
      <div>{modalIsOpen && <FavButton />} </div>

      <div id="outer"><h3> <RenderRecipes recipeIds={ids} /></h3></div>




      <Recipe text='salad' />
      <Recipe text='pasta' />
      <Recipe text='french-dipped' />

    </div>

  );
};

export default Home;