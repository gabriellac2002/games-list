import React from "react";
import { useState } from "react";

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

      
      </div> 


      <Footer></Footer>
    </div>
  );
}
  
export default List;