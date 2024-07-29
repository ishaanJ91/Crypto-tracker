import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from 'antd';
import './App.css';
import './Styles/navbar.css'
import './Styles/currency.css'
import './Styles/dashboard.css'
import './Styles/news.css'
import './Styles/cryptodetails.css'
import './Styles/compare.css'
import './Styles/linechart.css'

import { Navbar, Dashboard, CryptoDetails, Cryptocurrencies, News, Compare ,ScrollToTop } from './components';

const App = () => {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <div className="routes">
          <ScrollToTop>
          <Routes>
            <Route exact path='/' element={<Dashboard />} />
            <Route exact path='/cryptocurrencies' element={<Cryptocurrencies />} />
            <Route exact path='/crypto/:coinId' element={<CryptoDetails />} />
            <Route exact path='/news' element={<News />} />
            <Route exact path='/compare' element={<Compare />} />
          </Routes>
          </ScrollToTop>
        </div>
      </div>
    </div>
  );
}

export default App;