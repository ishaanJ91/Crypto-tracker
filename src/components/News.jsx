import React, { useState, useEffect } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useGetCryptoNewsQuery } from "../services/cryptoNews";
import { useGetCryptosQuery } from '../services/cryptoAPI';
import Loader from './Loader';
import { SearchOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

const News = ({ simplified }) => {
  const [pageSize, setPageSize] = useState(simplified ? 6 : 18);
  const { data } = useGetCryptosQuery(100);
  const [newsCategory, setNewsCategory] = useState('cryptocurrency');
  const { data: cryptoNews, error, refetch } = useGetCryptoNewsQuery({ query: newsCategory, count: pageSize });
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    refetch({ query: newsCategory, count: pageSize });
  }, [pageSize, newsCategory, refetch]);

  if (!cryptoNews) return <Loader />;

  const sortedArticles = [...cryptoNews.articles].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  const loadMore = () => {
    if (simplified) {
      navigate('/news');
    } else {
      setPageSize(prevPageSize => prevPageSize + 6);
    }
  };

  const filteredArticles = sortedArticles.filter(article => 
    article.title.toLowerCase().includes(searchTerm) ||
    article.description.toLowerCase().includes(searchTerm)
  );

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
    <motion.div
      className="news-container"
      initial="hidden"
      animate="visible"
      variants={animations.fadeIn}
    >
      <motion.div
        className="search-crypto"
        initial="hidden"
        animate="visible"
        variants={animations.fadeIn}
      >
        <SearchOutlined style={{ fontSize: '20px', width: '20px' }} />
        <input
          placeholder="Search Cryptocurrency News"
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          className="search-input"
        />
      </motion.div>
      <motion.div
        className="news-articles"
        initial="hidden"
        animate="visible"
        variants={animations.staggerChildren}
      >
        {filteredArticles.length === 0 ? (
          <p>No news available</p>
        ) : (
          filteredArticles.slice(0, pageSize).map((news, i) => (
            <motion.div
              className="news-card"
              key={i}
              initial="hidden"
              animate="visible"
              variants={animations.slideInUp}
            >
              <a href={news.url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  <img
                    className="news-image"
                    src={news.urlToImage || 'https://variety.com/wp-content/uploads/2021/12/Bitcoin-Cryptocurrency-Placeholder.jpg'}
                    alt="news"
                  />
                </div>
                <h4 className="news-title">{news.title}</h4>
                <div className="news-provider">
                  <span className="provider-name">{news.source.name}</span>
                  <span className="news-date">{moment(news.publishedAt).startOf('ss').fromNow()}</span>
                </div>
              </a>
            </motion.div>
          ))
        )}
      </motion.div>
      {!simplified && (
        <motion.div
          className="load-more"
          onClick={loadMore}
          initial="hidden"
          animate="visible"
          variants={animations.slideInUp}
        >
          Load More
        </motion.div>
      )}
    </motion.div>
  );
};

export default News;