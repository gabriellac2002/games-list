import React from "react";

import './erros.css';
import sad from '../../assets/sad.svg';

const Erro = (props) =>  {
    return (
      <div className="body_erro">
        <div className="modal">
          <div className="sad_face">
            <img className="sad" src={sad}></img>
          </div>
          <div className="text_erro">
            <h1>{props.erro}</h1>
          </div>
        </div>
      </div>  
    );
  }
  
export default Erro;