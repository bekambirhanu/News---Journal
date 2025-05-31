import React from 'react';
import styles from '../style/LongCart.module.css';

const LongCart = ({ article }) => {
  const { title, category, content, author, created_at } = article;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={styles.container}>
      <article className={styles.article}>
        <div className={styles.header}>
          <div className={styles.category}>
            <span className={styles.categoryTag}>{category}</span>
          </div>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.meta}>
            <span className={styles.author}>By {author}</span>
            <span className={styles.date}>{formatDate(created_at)}</span>
          </div>
        </div>

        <div className={styles.content}>
          {content.split('\n').map((paragraph, index) => (
            <p key={index} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}
        </div>

        <div className={styles.footer}>
          <div className={styles.tags}>
            <span className={styles.tag}>#drought</span>
            <span className={styles.tag}>#climate</span>
            <span className={styles.tag}>#{category}</span>
          </div>
        </div>
      </article>
    </div>
  );
};

export default LongCart;
