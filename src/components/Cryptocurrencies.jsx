import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { SearchOutlined, RiseOutlined, FallOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { Pagination } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoAPI';
import Loader from './Loader';

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [cryptosPerPage] = useState(10); // Number of cryptocurrencies per page

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );
    setCryptos(filteredData || cryptosList?.data?.coins);
  }, [cryptosList, searchTerm]);

  if (isFetching) return <Loader />;

  const indexOfLastCrypto = currentPage * cryptosPerPage;
  const indexOfFirstCrypto = indexOfLastCrypto - cryptosPerPage;
  const currentCryptos = cryptos?.slice(indexOfFirstCrypto, indexOfLastCrypto);

  // Change page
  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number);
  };

  const animations = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.5 } },
    },
    slideInUp: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    },
    slideInLeft: {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    },
    slideInRight: {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    },
  };

  return (
    <>
      {!simplified && (
        <motion.div
          className="search-crypto"
          initial="hidden"
          animate="visible"
          variants={animations.fadeIn}
        >
          <SearchOutlined style={{ fontSize: '20px', width: '20px' }} />
          <input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            className="search-input"
          />
        </motion.div>
      )}
      <motion.div
        className="crypto-card-container"
        initial="hidden"
        animate="visible"
        variants={animations.staggerChildren}
      >
        {currentCryptos?.map((currency) => (
          <motion.div
            className="crypto-card"
            key={currency.uuid}
            initial="hidden"
            animate="visible"
            variants={animations.slideInUp}
          >
            <Link to={`/crypto/${currency.uuid}`}>
              <div className={`card ${currency.change < 0 ? 'negative' : 'positive'}`}>
                <div className="card-header">
                  <img
                    className="crypto-image"
                    src={currency.iconUrl}
                    style={{ width: '60px', height: '60px' }}
                    alt={currency.name}
                  />
                  <div className='crypto-name'>
                    <h3>{currency.symbol}</h3>
                    <h4>{currency.name}</h4>
                  </div>
                </div>
                <div className="card-body">
                  <div className='graph-container'>
                    <p className={`change ${currency.change < 0 ? 'negative' : 'positive'}`}>
                      {currency.change >= 0 && '+'}{currency.change}%
                    </p>
                    <p className='graph'>
                      {currency.change < 0 ? (
                        <FallOutlined style={{ fontSize: '35px', width: '35px', color: '#f94241', margin: '2px' }} />
                      ) : (
                        <RiseOutlined style={{ fontSize: '35px', width: '35px', color: '#60c96f', margin: '2px' }} />
                      )}
                    </p>
                  </div>
                  <p className={`price ${currency.change < 0 ? 'negative' : 'positive'}`}>
                    ${formatNumber(currency.price)}
                  </p>
                  <div className='market-cap'>
                    <p>Market Cap: ${millify(currency.marketCap)}</p>
                    <p>24h Volume: ${millify(currency['24hVolume'])}</p>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
      {!simplified && (
        <Pagination
        className='pagination'
        current={currentPage}
        total={cryptos?.length}
        pageSize={cryptosPerPage}
        onChange={onPageChange}
        showSizeChanger={false}
      />
      )}
    </>
  );
};

export default Cryptocurrencies;
