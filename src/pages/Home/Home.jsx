import { useState , useEffect } from 'react';

//css
import './style.css';

//assets
import logo from '../../assets/logo.png';

//components
import Card from '../../components/Card/card.jsx';
import Navbar from '../../components/navbar/navbar.jsx';

const Home = () =>  {

  const [games,setGames] = useState([]);
  const [itensPerPage, setItensPerPage] = useState(9);
  const [currentPage,setCurrentPage] = useState(0);

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

          <div className='container_cards'>
            {Array.isArray(games) ? currentItens.map((game) => (
              <Card title={game.title} thumbnail={game.thumbnail} short_description={game.short_description} />
            )) : <h1>Loading ...</h1>} 
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