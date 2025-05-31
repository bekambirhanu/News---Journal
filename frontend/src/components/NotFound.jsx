import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../style/NotFound.module.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.errorCode}>404</h1>
        <h2 className={styles.title}>Page Not Found</h2>
        <p className={styles.description}>
          Oops! The page you're looking for seems to have vanished into thin air.
          Let's get you back on track.
        </p>
        <button 
          className={styles.homeButton}
          onClick={() => navigate('/')}
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound; 