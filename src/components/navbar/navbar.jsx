import React from "react";

//assets
import logo from '../../assets/logo.png';

const Navbar = () =>  {
    return (
      <div className="nav">
        <img src={logo}></img>
        <div className="barra_pesquisa">
            <input></input>
        </div>
      </div>
    );
  }
  
export default Navbar;