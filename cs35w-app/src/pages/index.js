import React from 'react';
import Recipe from '../components/Recipe';

const Home = () => {
  return (
    <div>
      <div><h1>Welcome</h1></div>
      <Recipe text='salad' />
      <Recipe text='pasta' />
      <Recipe text='french-dipped' />

    </div>

  );
};

export default Home;