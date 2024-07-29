import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import Dashboard from './Dashboard';

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize < 770) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleLinkClick = () => {
    if (screenSize < 770) {
      setActiveMenu(false);
    }
  };

  return (
    <>
      {screenSize < 770 && activeMenu && <div className="overlay" onClick={() => setActiveMenu(false)}></div>}

      <div className="nav-container">
        <div className="logo-container">
          <Link to="/" onClick={handleLinkClick}>
            <h1>CryptoTrack</h1>
          </Link>
          <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}>
            <MenuOutlined style={{ color: 'black' }} />
          </Button>
        </div>
        {activeMenu && (
          <div className={`menu ${activeMenu ? 'active' : ''}`}>
            <Link to="/" onClick={handleLinkClick}>Dashboard</Link>
            <Link to="/cryptocurrencies" onClick={handleLinkClick}>Cryptocurrencies</Link>
            <Link to="/compare" onClick={handleLinkClick}>Compare</Link>
            <Link to="/news" onClick={handleLinkClick}>News</Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
