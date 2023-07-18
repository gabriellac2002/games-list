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

//components
import Card from '../../components/Card/card.jsx';
import Select from 'react-select'
import Navbar from "../navbar/navbar";
import ReactLoading from 'react-loading';
import Footer from "../Footer/footer";

const List = ({games}) =>  {

  const navigate = useNavigate();

  async function getUserData() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        setUserData(docSnap.data());
        setUserUid(user.uid);
        setIsloaded(true);
      } else {
        navigate('/login');
      }
   });
  }

  useEffect(() => {
    getUserData()
  }, [])

  const [userData, setUserData] = useState();
  const [isloaded, setIsloaded ] = useState(false);
  const [userUid, setUserUid] = useState();

  const [itensPerPage, setItensPerPage] = useState(9);
  const [currentPage,setCurrentPage] = useState(0);
  const [selectedGenre, setSelectedGenre] = useState(null); 
  const [searchQuery, setSearchQuery] = useState('');

  const pages = Math.ceil(games.length / itensPerPage) ;
  const startIndex = currentPage * itensPerPage;
  const endIndex = startIndex + itensPerPage;
  const currentItens = games.slice(startIndex,endIndex);
  

  const filteredGamesForName = games.filter((game) =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredGames = selectedGenre
    ? games.filter((game) => game.genre.includes(selectedGenre))
  : games;
  
  const displayedGames = selectedGenre
    ? filteredGames.slice(startIndex, endIndex)
    : filteredGamesForName.slice(startIndex, endIndex);


  const uniqueGenres = Array.from(new Set(games.map((game) => game.genre)));
  const options = uniqueGenres.map((genre) => ({
    value: genre,
    label: genre
  }));

  const allIsLoaded = () => {
    return Array.isArray(displayedGames) && isloaded
  }

  

  return (
    <div className='body_page'>
      <Navbar></Navbar>

      <div className='page'>

        <div className='gamer'>

          <div className='image_app'>
            <img src={logo} className='logo'></img>
          </div>

          <div className='text_app'>
            <p>
            Explore o mundo dos jogos como nunca antes! Em nosso site de listas de jogos, você encontrará uma ampla variedade de títulos emocionantes, prontos para serem descobertos. De aventuras épicas a desafios estratégicos, de jogos de tiro cheios de ação a experiências imersivas de RPG, nossa seleção abrange todos os gostos e preferências. Com análises detalhadas e informações completas sobre cada jogo, você poderá escolher com confiança o próximo título que irá proporcionar horas de entretenimento e diversão. Não espere mais, visite nosso site e comece sua jornada pelos melhores jogos hoje mesmo!
            </p>
          </div>

        </div>

        <div className='list_games'>
          <div className='titulo_list_games'>
            <h2>Lista de jogos</h2>
          </div>

          <div className='pesquisas'>

            <div className='select'>
              <Select 
                options={options} 
                value={selectedGenre}
                onChange={(selectedOption) =>
                  setSelectedGenre(selectedOption ? selectedOption.value : null)
                }
              />
            </div>

            <div className='searchbar'>
              <input
                className='input_search'
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Digite o nome do jogo"
              />
              <img src={lupa} className='lupa'></img>
            </div>

          </div>

          <div className='container_cards'>
          {allIsLoaded() ? displayedGames.map((game) => (
            <Card id={game.id} title={game.title} thumbnail={game.thumbnail} short_description={game.short_description} fav_games={userData.fav_games} userUid={userUid}/>
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
  
export default List;