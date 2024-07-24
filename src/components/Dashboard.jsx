import React from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/cryptoAPI";
import Cryptocurrencies from './Cryptocurrencies';
import { QuestionCircleOutlined } from "@ant-design/icons";
import News from './News';
import Loader from './Loader';
import { Tooltip } from 'antd';
import { motion } from "framer-motion";

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

const Dashboard = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  if (isFetching) return <Loader />;

  const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number);
  };

  return (
    <>
      <motion.h2
        className="heading"
        initial="hidden"
        animate="visible"
        variants={animations.fadeIn}
      >
        Global Crypto Statistics
      </motion.h2>
      
      <motion.div
        className="stats-container"
        initial="hidden"
        animate="visible"
        variants={animations.slideInUp}
      >
        <div className="stat one">
          <div className="upper-part">
            <span className="stat-title one">Total Cryptocurrencies</span>
            <Tooltip overlayClassName="tooltip" title={`The total cyrptocurrencies in the market present.`}>
              <QuestionCircleOutlined style={{ color: '#246dff' }} />
            </Tooltip>
          </div>
          <span className="stat-value">{formatNumber(globalStats.total)}</span>
        </div>

        <div className="stat two">
          <div className="upper-part">
            <span className="stat-title two">Total Exchanges</span>
            <Tooltip overlayClassName="tooltip" title={`Compare all ${formatNumber(globalStats.totalExchanges)} top crypto exchanges. The list is ranked by trading volume.`}>
              <QuestionCircleOutlined style={{ color: '#b98800' }} />
            </Tooltip>
          </div>
          <span className="stat-value">{formatNumber(globalStats.totalExchanges)}</span>
        </div>

        <div className="stat three">
          <div className="upper-part">
            <span className="stat-title three">Total Market Cap</span>
            <Tooltip overlayClassName="tooltip" title={`The market cap of all coins combined is ${formatNumber(globalStats.total)}.`}>
              <QuestionCircleOutlined style={{ color: '#ff5b5b' }} />
            </Tooltip>
          </div>
          <span className="stat-value">${millify(globalStats.totalMarketCap)}</span>
        </div>

        <div className="stat four">
          <div className="upper-part">
            <span className="stat-title four">Trading Volume</span>
            <Tooltip overlayClassName="tooltip" title={`The 24 hour trading volume of all coins combined is $ ${millify(globalStats.total24hVolume)}.`}>
              <QuestionCircleOutlined style={{ color: '#007341' }} />
            </Tooltip>
          </div>
          <span className="stat-value">${millify(globalStats.total24hVolume)}</span>
        </div>

        <div className="stat five">
          <div className="upper-part">
            <span className="stat-title five">Total Markets</span>
            <Tooltip overlayClassName="tooltip" title="Total number of cryptocurrency markets">
              <QuestionCircleOutlined style={{ color: '#7265e6' }} />
            </Tooltip>
          </div>
          <span className="stat-value">{formatNumber(globalStats.totalMarkets)}</span>
        </div>
      </motion.div>

      <motion.div
        className="home-heading-container"
        initial="hidden"
        animate="visible"
        variants={animations.slideInUp}
      >
        <h2 className="home-title">Top 10 Cryptocurrencies</h2>
        <h3 className="show-more"><Link to="/cryptocurrencies">Show more</Link></h3>
      </motion.div>
      
      <Cryptocurrencies simplified />
    </>
  );
};

export default Dashboard;
