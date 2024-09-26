import React, { useState } from 'react';
import './Css/Login.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Css/ToastStyles.css';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.email || !formData.password || !formData.username) {
      toast.error('All fields are required.');
      return false;
    }
    return true;
  };

  const signup = async () => {
    setLoading(true);
    if (!validateForm()) {
      setLoading(false);
      return;
    }
    try {
      const response = await fetch('https://lapuniversbackend-production.up.railway.app/signup', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.authToken);
        localStorage.setItem('user-email', formData.email);
        localStorage.setItem('username', formData.username);
        toast.success('Signup successful! Redirecting...');
        setTimeout(() => window.location.replace("/welcome"), 2000);
      } else {
        toast.error(responseData.error);
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h1>Sign Up</h1>
        <div className="register-fields">
          <input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder="Your Name" required />
          <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder="Email Id" required />
          <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder="Password" required />
        </div>
        <button onClick={signup}>
          {loading ? 'Processing...' : 'Register'}
        </button>
        <p className="loginsignup-login">
          Already have an account? <span onClick={() => window.location.href = '/login'}>Login Here</span>
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

export default Register;
