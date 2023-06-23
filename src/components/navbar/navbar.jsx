import React from "react";
import './style.css';

//assets
import logo from '../../assets/logo.png';

const Navbar = () =>  {
    return (
      <div className="nav">
        <div className="container_image">
          <img src={logo} width={70} className="image"></img>
        </div>
        
        <div className="container_links">
          <ul className="lista_links">
            <li className="link"><a>Listagem de jogos</a></li>
          </ul>
        </div>
       
        
      
      </div>
    );
  }
  
export default Navbar;