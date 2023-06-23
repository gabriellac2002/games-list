import React from "react";

import './card.css';

const Card = (props) =>  {
    return (
      <div className="container_card">
        <h2 className="titulo_card">{props.title}</h2>
        <img src={props.thumbnail} className="imagem_card"></img>
        <p className="descrcao_card">Descrição: {props.short_description}</p>
      </div>
    );
  }
  
export default Card;