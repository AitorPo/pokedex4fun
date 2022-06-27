import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Details from './components/Details';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="pokemon/:pokemonName" element={<Details />}/>
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
