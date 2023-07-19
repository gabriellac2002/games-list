import React from "react";
import { useState, useEffect } from "react";
import { auth, db } from '../../config/firebase';
import { updateDoc,doc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import './card.css';

import star_cheia from '../../assets/star_cheia.svg';
import star_vazia from '../../assets/star_vazia.svg';
import coracao_cheio from '../../assets/coracao_cheio.svg';
import coracao_vazio from '../../assets/coracao_vazio.svg';

const Card = (props) =>  {

  const [ logado, setLogado ] = useState(false);
  const [ starred_games, setStarred_games] = useState();

  async function getUserData() {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setCoracaoFull(false);
        setStarred_games({})
        const newStars = [...stars];

        for (let i = 0; i < newStars.length; i++) {
          newStars[i].icon = star_vazia;
          newStars[i].isFull = false;
        }

        setLogado(false);
      } 
   });
  }

  useEffect(() => {
    getUserData();
    if(props.fav_games.includes(props.id)) {
      setCoracaoFull(true);
    }

    setStarred_games(props.starred_games);

    if(props.userUid != null){
      const index = props.starred_games[props.id.toString()];
      const newStars = [...stars];

      console.log(index);

      for (let i = 0; i < newStars.length; i++) {
        if (i <= index) {
          newStars[i].icon = star_cheia;
          newStars[i].isFull = true;
        } else {
          newStars[i].icon = star_vazia;
          newStars[i].isFull = false;
        }
      }

      const unsub = onSnapshot(doc(db, "users", props.userUid), (doc) => {
        setFav_games(doc.data().fav_games);
        setStarred_games(doc.data().starred_games);
        const index = props.starred_games[props.id.toString()];
        const newStars = [...stars];

        console.log(index);

        for (let i = 0; i < newStars.length; i++) {
          if (i <= index) {
            newStars[i].icon = star_cheia;
            newStars[i].isFull = true;
          } else {
            newStars[i].icon = star_vazia;
            newStars[i].isFull = false;
          }
        }
      });

      setLogado(true);
    } 

    
  }, []);

  async function removeHeart() {
    
    let fv = fav_games
    for (let i = fv.length - 1; i >= 0; i--) {
      if (fv[i] === props.id) {
        fv.splice(i, 1);
      }
    }

    const userRef = doc(db, "users", props.userUid);

    await updateDoc(userRef, {
      fav_games: fv
    });
  }

  const [fav_games, setFav_games] = useState(props.fav_games);

  const [stars, setStars] = useState([
    { icon: star_vazia, isFull: false },
    { icon: star_vazia, isFull: false },
    { icon: star_vazia, isFull: false },
    { icon: star_vazia, isFull: false }
  ]);

  const [isCoracaoFull, setCoracaoFull] = useState(false);

  async function handleStarClick(index) {

    if(!logado){
      alert('Usuario precisa estar logado');
      return null;
    }

    const newStars = [...stars];

    const st = starred_games

    st[props.id.toString()] = index;

    const userRef = doc(db, "users", props.userUid);
    await updateDoc(userRef, {
     starred_games: st
    });

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

  const addHeart = async () => {
    
    let fv = fav_games
    fv.push(props.id)
    const userRef = doc(db, "users", props.userUid);
    await updateDoc(userRef, {
      fav_games: fv
    });
  }

  function handleCoracaoClick(){

    if(!logado){
      alert('Usuario precisa estar logado');
      return null;
    }
    setCoracaoFull(!isCoracaoFull);
    if(!props.fav_games.includes(props.id)) {
      addHeart();
    } 
    else {
      removeHeart();
    }
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