import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../components/api';
import styles from '../style/Auth.module.css';

function Register() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }

    try {
      // TODO: Replace with your actual API endpoint
      const response = await api.post('/api/register/', {'first_name': firstName, 'last_name': lastName, 'password':password, 'username':username, 'email':email });
      const data = await response.json();

      if (response.ok) {
        // Store the token in localStorage
        // Redirect to login page
        navigate('/login');
      } else {
        setError(data.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Create Account</h1>
        <p className={styles.subtitle}>Join us to get started</p>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              id="username"
              name="l_name"
              value={firstName}
              onChange={(e) => {setFirstName(e.target.value);}}
              required
              placeholder="Enter your first name"
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              id="username"
              name="l_name"
              value={lastName}
              onChange={(e) => {setLastName(e.target.value);}}
              required
              placeholder="Enter your last name"
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => {setUsername(e.target.value);}}
              required
              placeholder="Choose a username"
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e)=> {setEmail(e.target.value)}}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e)=> {setPassword(e.target.value)}}
              required
              placeholder="Create a password"
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirm"
              value={confirm}
              onChange={(e)=> {setConfirm(e.target.value)}}
              required
              placeholder="Confirm your password"
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Sign Up
          </button>
        </form>

        <p className={styles.switchText}>
          Already have an account?{' '}
          <Link to="/login" className={styles.switchLink}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register; 