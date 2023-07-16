import React, { useState } from "react";
import { Link } from 'react-router-dom';
import './navbar.css';

//asstes
import logo from '../../assets/logo.png';
import favorites from '../../assets/lista.svg';
import perfil from '../../assets/perfil.svg';

const Navbar = () =>  {
  const [active, setActive] = useState(false);

  return (
    <div className="nav">
      <div className="container_image">
        <img src={logo} width={70} className="image" alt="Logo" />
      </div>

      <ul className={`lista_links ${active ? 'active' : ''}`}>
        <li className="link espaco"><a href="#listagem">Listagem de jogos</a></li>
        <Link to='/' className="favorites_games espaco botao_sem_estilo">
          <img src={favorites} width={40} alt="Favorites" />
        </Link>
        <Link to='/login' className="perfil espaco botao_sem_estilo">
          <img src={perfil} width={40} alt="Perfil" />
        </Link>
      </ul>

      <div className='menuHamburguer' onClick={() => { setActive(!active) }}>
        <span className='menuItem'></span>
        <span className='menuItem'></span>
        <span className='menuItem'></span>
      </div>
    </div>
  );
}

export default Navbar;
