import React from "react";

import './card.css';

const Card = (props) =>  {
    return (
      <div className="container_card">
        <div className="container_image_card">
          <img src={props.thumbnail} className="imagem_card"></img>
        </div>
        <h2 className="titulo_card">{props.title}</h2>
        <div className="desc">
          <p className="descricao_card">Descrição: {props.short_description}</p>
        </div>
      </div>
    );
  }
  
export default Card;