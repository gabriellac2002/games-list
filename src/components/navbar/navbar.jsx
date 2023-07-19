import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { auth }  from '../../config/firebase';
import { onAuthStateChanged, signOut } from "firebase/auth";

import './navbar.css';

//asstes
import logo from '../../assets/logo.png';
import favorites from '../../assets/lista.svg';
import perfil from '../../assets/perfil.svg';
import logout from '../../assets/logout.svg';

const Navbar = () =>  {
  const [active, setActive] = useState(false);
  const [ logado, setLogado ] = useState(false);

  const navigate = useNavigate();

  const logoutClick = async () => {
    if(logado) {
      signOut(auth).then(() => {
      setLogado(false);
      navigate('/')
    }).catch((error) => {
        
    });
    }
    else {

      navigate('/auth')

    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setLogado(true);
        // navigate('/');
      } else {
      // User is signed out
      // ...
      }
    });
  }, []);

  return (
    <div className="nav">
      <div className="container_image">
        <img src={logo} width={70} className="image" alt="Logo" />
      </div>

      <ul className={`lista_links ${active ? 'active' : ''}`}>
        <li className="link espaco"><Link to='/'>Listagem de jogos</Link></li>
        <Link to='/favoritos' className={logado ? 'favorites_games espaco botao_sem_estilo' : 'nao_logado'}>
          <img src={favorites} width={40} alt="Favorites" />
        </Link>
        
        <img src={logado ? logout : perfil} width={40} alt="Perfil" onClick={logoutClick} className="perfil espaco botao_sem_estilo"/>
        
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
