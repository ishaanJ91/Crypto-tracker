import React, { useState, useEffect } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useGetCryptoNewsQuery } from "../services/cryptoNews";
import Loader from './Loader';
import { SearchOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

const News = ({ simplified }) => {
  const [pageSize, setPageSize] = useState(simplified ? 6 : 18);
  const { data: cryptoNews, error, refetch } = useGetCryptoNewsQuery(pageSize);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    refetch(pageSize);
  }, [pageSize, refetch]);

  if (!cryptoNews) return <Loader />;
  if (error) return <p>Error loading news...</p>;

  const sortedArticles = cryptoNews?.results?.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate)) || [];

  const loadMore = () => {
    if (simplified) {
      navigate('/news');
    } else {
      setPageSize(prevPageSize => prevPageSize + 6);
    }
  };

  const filteredArticles = sortedArticles.filter(article =>
    article.article_title.toLowerCase().includes(searchTerm) ||
    (article.article_description && article.article_description.toLowerCase().includes(searchTerm))
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
              <a href={news.article_url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  <img
                    className="news-image"
                    src={news.article_photo_url || 'https://variety.com/wp-content/uploads/2021/12/Bitcoin-Cryptocurrency-Placeholder.jpg'}
                    alt="news"
                  />
                </div>
                <h4 className="news-title">{news.article_title}</h4>
                <div className="news-provider">
                  <span className="provider-name">{news.source}</span>
                  <span className="news-date">{moment(news.post_time_utc).startOf('ss').fromNow()}</span>
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
