import React, { useState, useEffect } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import {
  MoneyCollectOutlined, DollarCircleOutlined, FundOutlined,
  ExclamationCircleOutlined, TrophyOutlined, NumberOutlined,
  RiseOutlined, FallOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Tooltip } from 'antd';
import { motion } from 'framer-motion';

import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoAPI';
import Loader from './Loader';
import LineChart from './LineChart';

// Add your animations object here or import it from another file
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

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState('7d');
  const { data, isFetching: isFetchingDetails } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory, isFetching: isFetchingHistory } = useGetCryptoHistoryQuery({ coinId, timePeriod });
  const cryptoDetails = data?.data?.coin;

  const [width, setWidth] = useState(window.innerWidth);
  const [isGrid, setIsGrid] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setIsGrid(window.innerWidth <= 600);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const coinListContainerClassName = isGrid ? "coin-list-container grid" : "coin-list-container";

  if (isFetchingDetails || isFetchingHistory) return <Loader />;

  const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number);
  };

  const formatPrice = (price) => {
    return Math.round(price);
  };

  const time = ['3H', '24H', '7D', '30D', '3M', '1Y', '3Y', '5Y', 'ALL'];

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];

  return (
    <>
      {isGrid && 
        <motion.div
          className="crypto-card-container"
          initial="hidden"
          animate="visible"
          variants={animations.fadeIn}
        >
          <motion.div className="crypto-card" key={cryptoDetails?.uuid}>
            <Link to={`/crypto/${cryptoDetails?.uuid}`}>
              <div className={`card ${cryptoDetails?.change < 0 ? 'negative' : 'positive'}`}>
                <div className="card-header">
                  <img className="crypto-image" src={cryptoDetails?.iconUrl} style={{width: '60px', height: '60px'}} alt={cryptoDetails?.name} />
                  <div className='crypto-name'>
                    <h3>{cryptoDetails?.symbol}</h3>
                    <h4> {cryptoDetails?.name} </h4>
                  </div>
                </div>
                <div className="card-body">
                  <div className='graph-container'>
                    <p className={`change ${cryptoDetails?.change < 0 ? 'negative' : 'positive'}`}> {cryptoDetails?.change >= 0 && '+'}{cryptoDetails?.change}% 
                    </p>
                    <p className='graph'>
                    {cryptoDetails?.change < 0 ? 
                    <FallOutlined style={{ fontSize: '35px', width: '35px', color: '#f94241', margin: '2px' }}/> : 
                    <RiseOutlined  style={{ fontSize: '35px', width: '35px', color: '#60c96f', margin: '2px'}} /> }
                    </p>
                  </div>
                  <p className={`price ${cryptoDetails?.change < 0 ? 'negative' : 'positive'}`}>${formatNumber(cryptoDetails?.price)}</p>
                  <div className='market-cap'>
                    <p>Market Cap: ${millify(cryptoDetails?.marketCap)}</p>
                    <p>24h Volume: ${millify(cryptoDetails?.['24hVolume'])}</p>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </motion.div>
      }

      {!isGrid &&
        <motion.div
          className="coin-list-container"
          initial="hidden"
          animate="visible"
          variants={animations.slideInLeft}
        >
          <motion.div className="crypto-name-container">
            <img className="crypto-image" src={cryptoDetails?.iconUrl} style={{ width: '50px', height: '50px' }} alt={`${cryptoDetails?.name} logo`} />
            <div className="crypto-name">
              <h3>{cryptoDetails?.symbol}-USD</h3>
              <h4>{cryptoDetails?.name}</h4>
            </div>
          </motion.div>
          <div className="crypto-graph">
            <p className={`change details ${cryptoDetails?.change < 0 ? 'negative' : 'positive'}`}>
              {cryptoDetails?.change >= 0 && '+'}{cryptoDetails?.change}%
            </p>
            <p className="graph">
              {cryptoDetails?.change < 0 ?
                <FallOutlined style={{ fontSize: '30px', width: '30px', color: '#f94241', margin: '2px' }} /> :
                <RiseOutlined style={{ fontSize: '30px', width: '30px', color: '#60c96f', margin: '2px' }} />}
            </p>
          </div>
          <Tooltip overlayClassName="tooltip" title={`Current Price`}>
            <div className={`price details ${cryptoDetails?.change < 0 ? 'negative' : 'positive'}`}>
              ${formatNumber(formatPrice(cryptoDetails?.price))}
            </div>
          </Tooltip>

          <div className="crypto-other">
            <Tooltip overlayClassName="tooltip" title={`Total Volume`}>
              <h3>${formatNumber(cryptoDetails?.['24hVolume'])}</h3>
            </Tooltip>

            <Tooltip overlayClassName="tooltip" title={`Market Cap`}>
              <h3>${formatNumber(cryptoDetails?.marketCap)}</h3>
            </Tooltip>
          </div>
        </motion.div>
      }

      <motion.div
        initial="hidden"
        animate="visible"
        variants={animations.fadeIn}
      >
        <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails?.price)} coinName={cryptoDetails?.name} timePeriod={timePeriod} cryptoDetails={cryptoDetails} />
      </motion.div>

      <motion.ul
        className="select-timeperiod-container"
        initial="hidden"
        animate="visible"
        variants={animations.slideInUp}
      >
        {time.map((period) => (
          <button
            key={period}
            className={timePeriod === period.toLowerCase() ? 'active' : ''}
            onClick={() => setTimePeriod(period.toLowerCase())}
          >
            {period}
          </button>
        ))}
      </motion.ul>

      <div className="stats-container">
        <motion.div
          className="coin-value-statistics"
          initial="hidden"
          animate="visible"
          variants={animations.slideInLeft}
        >
          <div className="coin-value-statistics-heading">
            <h3 className="coin-details-heading">{cryptoDetails?.name} Value Statistics</h3>
            <p>An overview showing the statistics of {cryptoDetails?.name}, such as the base and quote currency, the rank, and trading volume.</p>
          </div>
          {stats.map(({ icon, title, value }) => (
            <div className="coin-stats" key={title}>
              <div className="coin-stats-name">
                {icon}
                <span>{title}</span>
              </div>
              <span className="stats">{value}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="other-stats-info"
          initial="hidden"
          animate="visible"
          variants={animations.slideInRight}
        >
          <div className="coin-value-statistics-heading">
            <h3 className="coin-details-heading">Other Stats Info</h3>
            <p>An overview showing the statistics of {cryptoDetails?.name}, such as the base and quote currency, the rank, and trading volume.</p>
          </div>
          {genericStats.map(({ icon, title, value }) => (
            <div className="coin-stats" key={title}>
              <div className="coin-stats-name">
                {icon}
                <span>{title}</span>
              </div>
              <span className="stats">{value}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default CryptoDetails;
