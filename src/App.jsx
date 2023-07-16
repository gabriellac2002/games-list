import React from 'react';
import { Routes, Route, BrowserRouter  } from "react-router-dom";

//pages
import Home from './pages/Home/Home.jsx';
import Login from './pages/Login/Login.jsx';
import SingIn from './pages/SingIn/SingIn.jsx';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cadastro' element={<SingIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
