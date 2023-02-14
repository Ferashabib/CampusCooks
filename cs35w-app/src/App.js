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
<<<<<<< HEAD
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
      </a>
	  <h1>This is Rin's branch</h1>
      </header>
=======
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
>>>>>>> ffbc36e947c86706c513cb5e288daff9aab8b2df
    </div>
  );
}

export default App;
