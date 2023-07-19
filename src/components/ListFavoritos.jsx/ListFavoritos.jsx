import React from "react";
import { useState, useEffect } from "react";
import { auth,db } from "../../config/firebase";
import { doc,getDoc } from "firebase/firestore"; 
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import '../../pages/Home/style.css';

//assets
import logo from '../../assets/logo.png';
import lupa from '../../assets/lupa.svg';
import filter from '../../assets/filter.svg'

//components
import Card from '../../components/Card/card.jsx';
import Select from 'react-select'
import Navbar from "../navbar/navbar";
import ReactLoading from 'react-loading';
import Footer from "../Footer/footer";

const ListFavoritos = ({games}) =>  {

  const navigate = useNavigate();

  const [ logado, setLogado ] = useState();
  const [ ordenar,setOrdena ] = useState(false);
  const [ games_list, setGames_list] = useState(games);
  const [ _displayedGames, setDisplayedGames ] = useState();

  const ordenarCards = () =>{
    let sorted_games = []
    for(let i = 0; i < userData.fav_games.length; i++) {
      if(userData.fav_games[i] in userData.starred_games) {
        sorted_games.push({id:userData.fav_games[i], stars: userData.starred_games[userData.fav_games[i].toString()]})
      }
      else {
        sorted_games.push({id:userData.fav_games[i], stars: 0})
      }
    }

    if(ordenar){
      sorted_games.sort((a, b) => {
        return a.stars - b.stars
      })
      setOrdena(false);
    } else {
      sorted_games.sort((a, b) => {
        return (a.stars - b.stars) * -1;
      })
      setOrdena(true);
    }

    let ordered_displayed_games = []

   

    for(let i = 0; i < sorted_games.length; i++) {
      const element = sorted_games[i];
      
      const objetoFiltrado = games.find(objeto => objeto.id === element.id);
     
      ordered_displayed_games.push(objetoFiltrado)
    }

    
    
    setDisplayedGames(ordered_displayed_games)
    
  }

  async function getUserData() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        setUserData(docSnap.data());
        setUserUid(user.uid);
        setLogado(true);
        setIsloaded(true);
      } else {
        setLogado(false);
        setIsloaded(true);
      }
   });
  }

  useEffect(() => {
    getUserData()
  }, [])

  const [userData, setUserData] = useState({
    userUid: null,
    fav_games: [],
    starred_games: {

    }
  });
  const [isloaded, setIsloaded ] = useState(false);
  const [userUid, setUserUid] = useState();

  const [itensPerPage, setItensPerPage] = useState(9);
  const [currentPage,setCurrentPage] = useState(0);

  const pages = Math.ceil(userData.fav_games.length / itensPerPage) ;
  const startIndex = currentPage * itensPerPage;
  const endIndex = startIndex + itensPerPage;
  const currentItens = userData.fav_games.slice(startIndex,endIndex);
  


  useEffect(() => {
   setDisplayedGames(games);

  }, []);


  

  const allIsLoaded = () => {
    return Array.isArray(_displayedGames) && isloaded
  }

  const renderCards = (game) => {
    if(userData.fav_games.includes(game.id)) {
      return <Card key={game.id} id={game.id} title={game.title} thumbnail={game.thumbnail} short_description={game.short_description} fav_games={userData.fav_games} userUid={userUid} starred_games={userData.starred_games} />
    }
  }


  return (
    <div className='body_page'>
      <Navbar></Navbar>

      <div className='page'>

        <div className='list_games'>
          <div className='titulo_list_games'>
            <h2>Favoritos</h2>
            <button onClick={ordenarCards} className="filter_card"><img src={filter} className="img_filter"></img></button>
          </div>

          <div className='container_cards'>
          {allIsLoaded() ? _displayedGames.map((game) => (
            renderCards(game)
          )) : <ReactLoading type={'spin'} color='#2D6BEA' height={'20%'} width={'20%'} />}

          </div>
          
          <div className='pagination'>
            {Array.from(Array(pages), (item,index) =>{
            return <button className="button_pagination" value={index} onClick={(e) => setCurrentPage(Number(e.target.value))}>{index + 1}</button>
            })}
          </div>

        </div>
      
      </div> 


      <Footer></Footer>
    </div>
  );
}
  
export default ListFavoritos;