import { useState , useEffect } from 'react';

//css
import './style.css';

//components
import Card from '../../components/Card/card.jsx';
import Navbar from '../../components/navbar/navbar.jsx';

//asstes
import capa from '../../assets/FotoJet.png';

const Home = () =>  {

  const [games,setGames] = useState([]);
  
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

        <div className='list_games'>
          {Array.isArray(games) ? games.map((game) => (
            <Card title={game.title} thumbnail={game.thumbnail} short_description={game.short_description} />
          )) : <h1>Loading ...</h1>} 
        </div>
      </div>
      
    </div>
  );
  }
  
export default Home;