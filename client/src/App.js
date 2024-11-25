// src/App.js
import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomeView from './components/HomeView/HomeView';

const App = () => {
  return (
    <Router>
      <div className='container'>
        <div className='nav'>
          <h3>StudentHub</h3>
          <div className='links'>
            <Link to={'/'}>Home</Link>
            <Link to={'/shop'}>Shop</Link>
            <Link to={'/reviews'}>Reviews</Link>
            <Link to={'/about'}>About</Link>
          </div>
          <Link to={'/signin'}>Sign In</Link>
        </div>
        <Routes>
          <Route path="/" element={<HomeView />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
