import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../components/api';
import styles from '../style/Auth.module.css';
import { LOGGEDIN, ISAUTHOR } from '../components/constants';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Get CSRF token when component mounts
  useEffect(() => {
    const getCsrfToken = async () => {
      try {
        const res = await api.get('/api/csrf/');
        if (res.status==200){
          const csrf_token = res.data.CSRF_cookie;
          localStorage.setItem('csrf_token', csrf_token);
        }
      } catch (err) {
        console.error('Error getting CSRF token:', err);
       }
     };
     getCsrfToken()
     }, [] );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post('/api/login/', {
        'username': username,
        'password': password, 
      });

      if (response.status === 200) {
        localStorage.setItem(LOGGEDIN, 'true');
        navigate('/');
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (err) {
      if (err.response?.status === 400) {
        setError('Invalid username or password.');
      } else if (err.response?.status === 403) {
        setError(err.response['define']);
      } else {
        setError('An error occurred. Please try again later.');
        console.log(err);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Welcome</h1>
        <p className={styles.subtitle}>Please sign in to continue</p>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" value={username} onChange={(e) => {setUsername(e.target.value)}} required placeholder="Enter your username" />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input type="text" id="password" name="password" value={password} onChange={(e) => {setPassword(e.target.value)}} required placeholder="Enter your password" />
          </div>

          <button type="submit" className={styles.submitButton}>
            Sign In
          </button>
        </form>

        <p className={styles.switchText}>
          Don't have an account?{' '}
          <Link to="/register" className={styles.switchLink}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login; 