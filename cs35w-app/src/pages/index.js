import React from 'react';

import salad from '../images/salad.jpg';
import sandwich from '../images/french-dipped.jpg';
import pasta from '../images/pasta.jpg';


const Home = () => {
  return (
    <div>
      <div><h1>Welcome</h1></div>
      <div><img src={salad} alt="salad" /></div>
      <div><img src={sandwich} alt="french-dipped sandwich" /></div>
      <div><img src={pasta} alt="pasta" /></div>
    </div>

  );
};

export default Home;