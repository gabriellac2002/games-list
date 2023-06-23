import React from 'react';
import { Routes, Route, BrowserRouter  } from "react-router-dom";

//pages
import Home from './pages/Home/Home.jsx';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
