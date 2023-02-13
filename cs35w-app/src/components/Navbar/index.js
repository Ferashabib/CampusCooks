import React from "react";
import { NavLink as Link } from "react-router-dom";
import "./NavbarElement.css";

const Navbar = () => {
    return(
      <header>
        <div className="Webname"> Name of our app </div>
        <Link to="/about" activeStyle className="NavLink">
            About
        </Link>
        <Link to="/log_in" activeStyle className="NavLink">
            Log In
        </Link>
        <Link to="/upload" activeStyle className="NavLink">
            Upload
        </Link>
        <Link to="/"  activeStyle className="NavLink">
            Home
        </Link>
      </header>
    );
};

export default Navbar;