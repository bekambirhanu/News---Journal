import React from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import styles from '../style/Article.module.css';

const Article = ({ article }) => {
  const { title, category, content, author, created_at } = article;
  const navigate = useNavigate();
  const location = useLocation();

  // Format the date to be more readable
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleReadMore = () => {
    navigate(`/article/${article.id}`, { 
      state: { 
        from: location,
        article: article 
      } 
    });
  };

  return (
    <article className={styles.article}>
      <div className={styles.category}>
        <span className={styles.categoryTag}>{category}</span>
      </div>
      
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.meta}>
        <hr/>
        <span className={styles.author}>By {author}</span>
        <span className={styles.date}>{formatDate(created_at)}</span>
      </div>
      
      <div className={styles.content}>
        {content}
      </div>
      
      <div className={styles.footer}>
        <button className={styles.readMore} onClick={handleReadMore}>
          Read More
        </button>
      </div>
    </article>
  );
};

export default Article;
