import { useState , useEffect } from 'react';

//css
import './style.css';

//assets
import logo from '../../assets/logo.png';

//components
import Card from '../../components/Card/card.jsx';
import Navbar from '../../components/navbar/navbar.jsx';
import Select from 'react-select'
import ReactLoading from 'react-loading';

const Home = () =>  {

  const [games,setGames] = useState([]);
  const [itensPerPage, setItensPerPage] = useState(9);
  const [currentPage,setCurrentPage] = useState(0);
  const [selectedGenre, setSelectedGenre] = useState(null); 
  const [searchQuery, setSearchQuery] = useState('');

  const pages = Math.ceil(games.length / itensPerPage) ;
  const startIndex = currentPage * itensPerPage;
  const endIndex = startIndex + itensPerPage;
  const currentItens = games.slice(startIndex,endIndex);
  
  useEffect(()=>{
    fetch('https://games-test-api-81e9fb0d564a.herokuapp.com/api/data', { 
      headers: new Headers({
        'dev-email-address': 'gabriellacsilva2002@gmail.com'
      })
    }).then((res) => res.json().then(data => setGames(data)))
  },[]);

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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>

        </div>

        <div className='list_games'>
          <div className='titulo_list_games'>
            <h2>Listagem de jogos</h2>
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
            </div>

          </div>

          <div className='container_cards'>
          {Array.isArray(displayedGames) ? displayedGames.map((game) => (
            <Card title={game.title} thumbnail={game.thumbnail} short_description={game.short_description} />
          )) : <ReactLoading type={'spin'} color='#2D6BEA' height={'20%'} width={'20%'} />}

          </div>
          
          <div className='pagination'>
            {Array.from(Array(pages), (item,index) =>{
            return <button value={index} onClick={(e) => setCurrentPage(Number(e.target.value))}>{index + 1}</button>
            })}
          </div>

        </div>
      </div>
      
    </div>
  );
  }
  
export default Home;