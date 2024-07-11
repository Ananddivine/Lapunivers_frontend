import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'
const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(false);
    const form = e.target;
    const data = new FormData(form);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email = form.elements["email"].value;

    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setEmailError('');

    const password = form.elements["password"].value;

    // Add your own password strength criteria here
    const isStrongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

    if (!isStrongPassword) {
      setPasswordError('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.');
      return;
    }

    setPasswordError('');


    const spinner = document.getElementById('loading-spinner');
    const spinners = document.getElementById('loading-spinners');
    spinner.style.display = 'block';
    spinners.style.display = 'block';

    const confirmPassword = form.elements["confirm-password"].value;
    if (password !== confirmPassword) {
      document.getElementById("result").innerHTML = "Password and confirm password do not match!";
      setLoading(false);
      spinner.style.display = 'none';
      spinners.style.display = 'none';
      return;
    }

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbzoASWgBHMhk9kxEWjsQ36pu21D1g5oX0vpL8X5EGyACJhNuwid54Zr_cGMGt0alp5FCw/exec", {
        method: "POST",
        body: data
      });
      
      const json = await response.json();

      console.log(json);
      if (json.success) {
        localStorage.setItem('username', json.name);
        localStorage.setItem('email', json.email);
        const storageChangeEvent = new Event('storage');
        window.dispatchEvent(storageChangeEvent);
        navigate(`/welcome?name=${json.name}`);
      } else {
        document.getElementById("result").innerHTML = json.message;
      }

      form.reset();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      spinner.style.display = 'none';
      spinners.style.display = 'none';
    }
  };
  return (
    <div>
      <style>
      {`
          #loading-spinner {
            display: block;
            position: fixed;
            z-index: 8888;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.678);
          }

          #loading-spinner:before {
            content: '';
            display: block;
            position: absolute;
            left: 50%;
            top: 50%;
            width: 70px;
            height: 70px;
            margin: -30px 0 0 -30px;
            border-radius: 50%;
            border: 10px solid #ffffff00;
            border-top-color: #008cf0;
            border-bottom-color: #0088f0;
            animation: spin 2s linear infinite;
          }

          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }

          #loading-spinners {
            display: block;
            position: fixed;
            z-index: 8888;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(253, 253, 253, 0);
          }

          #loading-spinners:before {
            content: '';
            display: block;
            position: absolute;
            left: 50%;
            top: 50%;
            width: 50px;
            height: 50px;
            margin: -20px 0 0 -20px;
            border-radius: 50%;
            border: 10px solid #ffffff00;
            border-top-color: #008cf0;
            border-bottom-color: #0088f0;
            animation: spins 2s linear infinite;
          }

          @keyframes spins {
            to {
              transform: rotate(-360deg);
            }
          }
          #loading-spinner h1 {
            z-index: 9999;
            position: relative;
            left: 49%;
            top: 49%;
            font-size: 15px;
            font-weight: 700;
            color: #000;
          }
        `}
      </style>

      <div id="loading-spinner" style={{ display: 'none' }}><h1>Loading...</h1></div>
      <div id="loading-spinners" style={{ display: 'none' }}><h1>Loading...</h1></div>
<div className='login-container'>
      <form id="register-form" onSubmit={handleFormSubmit} className='register-form'>
        <input type="text" name="name" placeholder="Name" required />
        <input type="email" name="email" placeholder="Email id" required />
        {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
        <input type="password" name="password" placeholder="Password" required />
        {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
        <input type="password" name="confirm-password" placeholder="Confirm-Password" required />
        <input type="text" name="password-hint" placeholder="Password-Hint" required />
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
        <p><a href="/login">Already have an account</a></p>
      </form>
      </div>
      <div id="result"></div>
    </div>
  );
};

export default Register;
