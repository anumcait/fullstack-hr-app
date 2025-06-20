import React, { useState } from 'react';
import './LoginForm.css';
import logo from "../../assets/images/logo_synkspot.png";
import axios from 'axios';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    // try {
    //   const response = await axios.post('http://localhost:5000/api/auth/login', {
    //     username,
    //     password
    //   });

      // Handle success (store user or redirect)
      console.log('Login successful:',username);//, response.data);
      localStorage.setItem('userName', username);//JSON.stringify(response.data));
      window.location.href = '/dashboard';

    // } catch (err) {
    //   console.error('Login error:', err);
    //   setError('Invalid username or password');
    // }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="tab-header">Sign In</div>
        <div className="login-header">
          <img src={logo} alt="Logo" className="logo" />
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <label>User Name:</label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="checkbox-area">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me next time.</label>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-btn">LOG IN</button>
        </form>
      </div>

      <div className="footer">
        <span>2025 Suvih Technologies. All rights reserved</span>
        <span className="powered">Powered By: Synkspot</span>
      </div>
    </div>
  );
};

export default LoginForm;