import React, { useState } from 'react';
import './Css/Login.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Css/ToastStyles.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(false); // Track if password is wrong

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      toast.error('All fields are required.');
      return false;
    }
    return true;
  };

  const login = async () => {
    setLoading(true);
    setPasswordError(false); // Reset error state on new login attempt
    if (!validateForm()) {
      setLoading(false);
      return;
    }
    try {
      const response = await fetch('https://lapuniversbackend-production.up.railway.app/api/users/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
    
      if (response.ok && responseData.success) {
        const tokenExpiryTime = new Date().getTime() + 24 * 60 * 60 * 1000; // Set token expiry to 24 hours
  
        localStorage.setItem('auth-token', responseData.token);
        localStorage.setItem('token-expiry', tokenExpiryTime);
        // localStorage.setItem('user-email', formData.email);
        localStorage.setItem('username', responseData.user.name);
        // localStorage.setItem('userId', responseData.user.id);
  
        toast.success('Login successful! Redirecting...');
        setTimeout(() => window.location.replace("/welcome"), 2000);
      } else {
        toast.error(responseData.message || 'Login failed. Please try again later!');
        if (responseData.message === "Invalid password") {
          setPasswordError(true);
        }
        setFormData({ ...formData, password: '' });
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Login</h1>
        <div className="login-fields">
          <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder="Email Id" required />
          <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder="Password" required />
          <button onClick={login}>
            {loading ? 'Processing...' : 'Login'}
          </button>

          {/* Show the forgot password link if the password is wrong */}
          {passwordError && (
            <span className="forgot-password-link">
              Wrong password? <a href="/forgotpassword">Forgot Password</a>
            </span>
          )}
        </div>

        <p className="loginsignup-login">
          Don't have an account? <span onClick={() => window.location.href = '/register'}>Register Here</span>
        </p>
      </div>

      {loading && (
        <div id="loading-spinner" className="loading-spinner">
          <div className="spinner"></div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Login;
