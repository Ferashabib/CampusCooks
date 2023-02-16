import React from "react";
import './App.css';

import './components/NavbarElement.css';
import Route from './components/Router';
import Navbar from './components/Navbar';

import Home from './pages';
import About from './pages/about';
import Login from './pages/log_in';
import Upload from './pages/upload';



function App() {
  console.log(window.location.pathname);
  return (

    <div className='App'>
      <Navbar/>
      <Route path="/">
        <Home/>
      </Route>
      <Route path="/about">
        <About/>
      </Route>
      <Route path="/log_in">
        <Login/>
      </Route>
      <Route path="/upload">
        <Upload/>
      </Route>
    </div>

  );
}

export default App;

