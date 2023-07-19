import React from 'react';
import { Routes, Route, BrowserRouter  } from "react-router-dom";

//pages
import Home from './pages/Home/Home.jsx';
import Auth from './pages/Auth/Auth.jsx';
import Favoritos from './pages/Favoritos/Favoritos.jsx';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/favoritos' element={<Favoritos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
