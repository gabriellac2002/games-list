import React from "react";

import './footer.css';
import logo from '../../assets/logo.png';

const Footer = () =>  {
    return (
      <div className="body_footer">

        <div className="logo">
            <img src={logo} className="img_logo"></img>
        </div>

        <div className="contatos">
            <p>Contato</p>
            <p>gabriellacsilva2002@mail.com</p>
            <p>Rua Joaquim Caetano,40,São Pedro - Juiz de Fora</p>
        </div>

      </div>  
    );
  }
  
export default Footer;