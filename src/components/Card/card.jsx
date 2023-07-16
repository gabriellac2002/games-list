import React from "react";
import { useState } from "react";

import './card.css';

import star_cheia from '../../assets/star_cheia.svg';
import star_vazia from '../../assets/star_vazia.svg';
import coracao_cheio from '../../assets/coracao_cheio.svg';
import coracao_vazio from '../../assets/coracao_vazio.svg';

const Card = (props) =>  {

  const [stars, setStars] = useState([
    { icon: star_vazia, isFull: false },
    { icon: star_vazia, isFull: false },
    { icon: star_vazia, isFull: false },
    { icon: star_vazia, isFull: false }
  ]);

  const [isCoracaoFull, setCoracaoFull] = useState(false);

  function handleStarClick(index) {
    const newStars = [...stars];

    for (let i = 0; i < newStars.length; i++) {
      if (i <= index) {
        newStars[i].icon = star_cheia;
        newStars[i].isFull = true;
      } else {
        newStars[i].icon = star_vazia;
        newStars[i].isFull = false;
      }
    }

    setStars(newStars);
  }

  function handleCoracaoClick(){
    setCoracaoFull(!isCoracaoFull);
  }


  return (
    <div className="container_card">
      <div className="container_image_card">
        <img src={props.thumbnail} className="imagem_card"></img>
      </div>

      <div>
        <h2 className="titulo_card">{props.title}</h2>
      </div>

      <div className="actions">
        <div className="stars">
        {stars.map((star, index) => (
          <button className="estrela"
            key={index}
            value={index + 1}
            onClick={() => handleStarClick(index)}
          >
            <img src={star.icon} width={30} className="icon_estrela"/>
          </button>
        ))}
        </div>
        
        <div className="favorite">
          <button className="coracao" onClick={handleCoracaoClick}>
              <img src={isCoracaoFull ? coracao_cheio : coracao_vazio} width={30} className="icon_coracao"/>
          </button>
        </div>
      </div>
      
      <div className="desc">
        <p className="descricao_card">Descrição: {props.short_description}</p>
      </div>
    </div>
  );
}
  
export default Card;