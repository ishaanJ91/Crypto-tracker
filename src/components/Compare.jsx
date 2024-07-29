import React, { useState, useEffect } from 'react';
import { Select, Tooltip } from 'antd';
import { motion } from 'framer-motion';
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery, useGetCryptosQuery } from '../services/cryptoAPI';
import Loader from './Loader';
import { Link } from 'react-router-dom';

import { RiseOutlined, FallOutlined, 
  DollarCircleOutlined, NumberOutlined, 
  TrophyOutlined, FundOutlined, 
  MoneyCollectOutlined, ExclamationCircleOutlined
 } from '@ant-design/icons';

import millify from 'millify';
import LineChartAlt from './LineChartAlt';
import LineChartComp from './LineChartComp';

const { Option } = Select;


const animations = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
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

const Compare = () => {
  const [timePeriod, setTotalTime] = useState('24h');
  const [coinId1, setCoinId1] = useState('Qwsogvtv82FCd'); // Default Bitcoin ID
  const [coinId2, setCoinId2] = useState('razxDUgYGNAdQ'); // Default Ethereum ID

  const { data: cryptosList, isFetching: isFetchingCryptos } = useGetCryptosQuery(100);
  const { data: data1, isFetching: isFetchingDetails1 } = useGetCryptoDetailsQuery(coinId1);
  const { data: coinHistory1, isFetching: isFetchingHistory1 } = useGetCryptoHistoryQuery({ coinId: coinId1, timePeriod });
  const { data: data2, isFetching: isFetchingDetails2 } = useGetCryptoDetailsQuery(coinId2);
  const { data: coinHistory2, isFetching: isFetchingHistory2 } = useGetCryptoHistoryQuery({ coinId: coinId2, timePeriod });

  const cryptoDetails1 = data1?.data?.coin;
  const cryptoDetails2 = data2?.data?.coin;

  const [width, setWidth] = useState(window.innerWidth);
  const [isLarge, setIsLarge] = useState(window.innerWidth >= 800 || window.innerWidth <= 600);



  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setIsLarge(window.innerWidth >= 800 || window.innerWidth <= 600);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const coinGraphClass = isLarge ? "chart-container compare" : "";


  useEffect(() => {
  }, [coinId1, coinId2]);

  const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number);
  };

  const formatPrice = (price) => {
    return Math.round(price);
  };

  if (isFetchingDetails1 || isFetchingHistory1 || isFetchingDetails2 || isFetchingHistory2 || isFetchingCryptos) return <Loader />;

  const time = ['24h', '7d', '30d', '3m', '1y', '5y'];


  return (
    <>  

    <div className='compare-body'>
      <div className='compare-container'>
          <motion.div
            className="crypto-card-container compare"
            initial="hidden"
            animate="visible"
            variants={animations.fadeIn}
          >
            
            <motion.div className="crypto-card compare" key={cryptoDetails1?.uuid}>

              <div className={`card compare ${cryptoDetails1?.change < 0 ? 'negative' : 'positive'}`}>
              <select
                className='custom-select-crypto'
                value={coinId1}
                onChange={(e) => {
                  console.log('Selected Coin ID 1:', e.target.value);
                  setCoinId1(e.target.value);
                }}
              >
                {cryptosList?.data?.coins?.map((coin) => (
                  <option key={coin.uuid} value={coin.uuid} className='custom-option'>
                    {coin.name}
                  </option>
                ))}
              </select>

              <div className="card-header compare">
                  <img className="crypto-image" src={cryptoDetails1?.iconUrl} style={{ width: '60px', height: '60px' }} alt={cryptoDetails1?.name} />
                  
                  <div className='crypto-top-details'>
                    <div className='crypto-name-compare'>
                      <h3>{cryptoDetails1?.symbol}-USD</h3>
                      <h4> {cryptoDetails1?.name} </h4>
                    </div>
                    <div className='graph-price compare'>
                      <p className={`price ${cryptoDetails1?.change < 0 ? 'negative' : 'positive'}`}>${formatNumber(cryptoDetails1?.price)}</p>
                    </div>
                  </div>
                </div>

              <div className="card-body compare">
                <div className='market-cap-compare'>
                  <div className='market-range-info'>
                    <div className='market-range-item'>
                      <p><b>${millify(cryptoDetails1?.marketCap)}</b></p>
                      <p style={{color: 'gray'}}>Market Cap</p>
                    </div>

                    <div className='market-range-item'>
                      <p><b>${millify(cryptoDetails1?.['24hVolume'])}</b></p>
                      <p style={{color: 'gray'}}>24h Volume</p>
                    </div>
                    
                    <div className='market-range-item'>
                      <p> <b> ${millify(cryptoDetails1?.supply?.total)}</b></p>
                      <p style={{color: 'gray'}}>Total Supply</p>
                    </div>
                  </div>
                </div>
                
                <div className='button-container'>
                  <div className='graph-button'>
                    <p className={`change compare ${cryptoDetails1?.change < 0 ? 'negative' : 'positive'}`}> {cryptoDetails1?.change >= 0 && '+'}{cryptoDetails1?.change}% </p>
                    <p className='graph'>
                      {cryptoDetails1?.change < 0 ? 
                        <FallOutlined style={{ fontSize: '35px', width: '35px', color: '#f94241', margin: '2px' }}/> : 
                        <RiseOutlined style={{ fontSize: '35px', width: '35px', color: '#60c96f', margin: '2px'}} /> }
                    </p>
                  </div>
                  <Link to={`/crypto/${cryptoDetails1?.uuid}`} className="more-info"> More Info</Link>
                </div>
                {isLarge &&  
                <p className='chart-timeperiod'> {timePeriod} </p>
                }                
                {isLarge && 
                  <div className='chart-container compare'>
                    <LineChartAlt coinHistory={coinHistory1} currentPrice={millify(cryptoDetails1?.price)} coinName={cryptoDetails1?.name} timePeriod={timePeriod} cryptoDetails1={cryptoDetails1} />
                  </div>
                }
              </div>
            </div>
          </motion.div>
        </motion.div>

          <motion.div
            className="crypto-card-container compare"
            initial="hidden"
            animate="visible"
            variants={animations.fadeIn}
          >
          <motion.div className="crypto-card compare" key={cryptoDetails2?.uuid}>
              <div className={`card compare ${cryptoDetails2?.change < 0 ? 'negative' : 'positive'}`}>
              <select
                className='custom-select-crypto'
                value={coinId2}
                onChange={(e) => {
                  console.log('Selected Coin ID 2:', e.target.value);
                  setCoinId2(e.target.value);
                }}
              >
                {cryptosList?.data?.coins?.map((coin) => (
                  <option key={coin.uuid} value={coin.uuid} className='custom-option'>
                    {coin.name}
                  </option>
                ))}
              </select>

              <div className="card-header compare">
                  <img className="crypto-image" src={cryptoDetails2?.iconUrl} style={{ width: '60px', height: '60px' }} alt={cryptoDetails2?.name} />
                  
                  <div className='crypto-top-details'>
                    <div className='crypto-name-compare'>
                      <h3>{cryptoDetails2?.symbol}-USD</h3>
                      <h4> {cryptoDetails2?.name} </h4>
                    </div>
                    <div className='graph-price compare'>
                      <p className={`price ${cryptoDetails2?.change < 0 ? 'negative' : 'positive'}`}>${formatNumber(cryptoDetails2?.price)}</p>
                    </div>
                  </div>
                </div>

              <div className="card-body compare">
                <div className='market-cap-compare'>
                  <div className='market-range-info'>
                  <div className='market-range-item'>
                      <p><b>${millify(cryptoDetails1?.marketCap)}</b></p>
                      <p style={{color: 'gray'}}>Market Cap</p>
                    </div>

                    <div className='market-range-item'>
                      <p><b>${millify(cryptoDetails1?.['24hVolume'])}</b></p>
                      <p style={{color: 'gray'}}>24h Volume</p>
                    </div>
                    
                    <div className='market-range-item'>
                      <p> <b> ${millify(cryptoDetails1?.supply?.total)}</b></p>
                      <p style={{color: 'gray'}}>Total Supply</p>
                    </div>
                  </div>
                </div>
                
                <div className='button-container'>
                  <div className='graph-button'>
                    <p className={`change compare ${cryptoDetails2?.change < 0 ? 'negative' : 'positive'}`}> {cryptoDetails2?.change >= 0 && '+'}{cryptoDetails2?.change}% </p>
                    <p className='graph'>
                      {cryptoDetails2?.change < 0 ? 
                        <FallOutlined style={{ fontSize: '35px', width: '35px', color: '#f94241', margin: '2px' }}/> : 
                        <RiseOutlined style={{ fontSize: '35px', width: '35px', color: '#60c96f', margin: '2px'}} /> }
                    </p>
                  </div>
                  <Link to={`/crypto/${cryptoDetails2?.uuid}`} className="more-info"> More Info</Link>
                </div>

                {isLarge &&  
                <p className='chart-timeperiod'> {timePeriod} </p>
                }
                {isLarge && 
                  <div className='chart-container compare'>
                    <LineChartAlt coinHistory={coinHistory1} currentPrice={millify(cryptoDetails1?.price)} coinName={cryptoDetails1?.name} timePeriod={timePeriod} cryptoDetails1={cryptoDetails1} />
                  </div>
                }

                </div>
              </div>
            </motion.div>
          </motion.div>
      </div>



      {/* *********************** */}


      <div className='time-period-compare'>
        <div className='time-period-header'>
          <div className='header-canvas'>
            <h3> Comparison between {cryptoDetails1?.name} and {cryptoDetails2?.name} </h3>
            <div className='canvas-legend'>
              <div className='legend-item'>
                <div className='legend-color' style={{border: '2px solid #2d7aff', width: '20px', height: '10px'} }></div>
                <p> {cryptoDetails1?.name} </p>
              </div>
              <div className='legend-item'>
                <div className='legend-color' style={{border: '2px solid #767587', width: '20px', height: '10px'} }></div>
                <p> {cryptoDetails2?.name} </p>
              </div>
            </div>

            <select
            value={timePeriod}
            onChange={(e) => setTotalTime(e.target.value)}
          >
            {time.map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>
            
          </div>
        </div>
       
        <LineChartComp
        coinHistory1={coinHistory1}
        coinHistory2={coinHistory2}
        coinName1={cryptoDetails1?.name}
        coinName2={cryptoDetails2?.name}
        timePeriod={timePeriod}
        cryptoDetails1={cryptoDetails1}
        cryptoDetails2={cryptoDetails2}
      />
      </div>

    </div>

      

      

    
    </>
  );
};

export default Compare;
