import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from 'antd';
import './App.css';
import './Styles/navbar.css'
import './Styles/currency.css'
import './Styles/dashboard.css'
import './Styles/news.css'
import './Styles/cryptodetails.css'
import './Styles/linechart.css'

import { Navbar, Dashboard, CryptoDetails, Cryptocurrencies, News, ScrollToTop } from './components';

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
          </Routes>
          </ScrollToTop>
          
        </div>
        {/* <div className="footer">
          <h5>CryptoTracker <br /> All rights reserved.</h5>
          <div className="footer-links">
            <Link to='/'>Home</Link>
            <Link to='/cryptocurrencies'>Cryptocurrencies</Link>
            <Link to='/news'>News</Link>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default App;