import { useState , useEffect } from 'react';

//components
import Card from '../../components/Card/card.jsx';
import Navbar from '../../components/navbar/navbar.jsx';

const Home = () =>  {

    const [games,setGames] = useState([]);
  
    useEffect(()=>{
      fetch('https://games-test-api-81e9fb0d564a.herokuapp.com/api/', { 
        headers: new Headers({
          'dev-email-address': 'gabriellacsilva2002@gmail.com'
        })
       }).then((res) => res.json().then(data => setGames(data)))
    },[games]);
  
    return (
        //   <div className="aa">
        //     {games.map((game) => <Card title = {game.title} />)}
        //   </div>
        <div className='body_page'>
            <Navbar></Navbar>
        </div>
    );
  }
  
export default Home;