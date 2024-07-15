import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheck, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './Login.css';


const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      document.getElementById("setPasswordError");
      document.getElementById("setPasswordError").classList.remove("hidden");
        setTimeout(() => {
            document.getElementById("setPasswordError").classList.add("hidden");
        }, 5000)
      form.elements["password"].value = '';
      form.elements["confirm-password"].value = '';
      return;
    };



  


    const spinner = document.getElementById('loading-spinner');
    const spinners = document.getElementById('loading-spinners');
    spinner.style.display = 'block';
    spinners.style.display = 'block';

    const confirmPassword = form.elements["confirm-password"].value;
    if (password !== confirmPassword) {
      document.getElementById("result");
      document.getElementById("result").classList.remove("hidden");
        setTimeout(() => {
            document.getElementById("result").classList.add("hidden");
        }, 4000)
        form.elements["password"].value = '';
        form.elements["confirm-password"].value = '';
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
        document.getElementById("error-message").innerHTML = json.message;
        document.getElementById("error-message").classList.remove("hidden");
        setTimeout(() => {
            document.getElementById("error-message").classList.add("hidden");
        }, 4000);
      }
     form.elements["email"].value = '';
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      spinner.style.display = 'none';
      spinners.style.display = 'none';
    }
  };

  const togglePasswordVisibility = () =>{
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () =>{
    setShowConfirmPassword(!showConfirmPassword);
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
      <div id="error-message" className="message hidden error-message"><FontAwesomeIcon icon={faTimes} /> <span id="error-message-text"></span></div>
      <div id="success-message" className="message hidden success-message"> <FontAwesomeIcon icon={faCheck} /> Your message has been sent. Thank you!</div>
      <div id="loading-spinner" style={{ display: 'none' }}><h1>Loading...</h1></div>
      <div id="loading-spinners" style={{ display: 'none' }}><h1>Loading...</h1></div>
      <div className='login-container'>
      <form id="register-form" onSubmit={handleFormSubmit} className='register-form'>
        <input type="text" name="name" placeholder="Name" required />
        <input type="email" name="email" placeholder="Email id" required />
        {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
        <div className="password-container">
          <input type={showPassword ? "text" : "password"}  name="password"  placeholder="Password" required />
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} onClick={togglePasswordVisibility} className="password-toggle-icon" />
        </div>
        {passwordError && <p style={{ color: 'red' }} >{passwordError}</p>}
        <div className="password-container">
          <input type={showConfirmPassword ? "text" : "password"} name="confirm-password" placeholder="Confirm Password" required />
          <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} onClick={toggleConfirmPasswordVisibility} className="password-toggle-icon" />
        </div>
        <input type="text" name="password-hint" placeholder="Password-Hint" required />
        <button type="submit" disabled={loading}> {loading ? 'Submitting...' : 'Submit'} </button>
        <p><a href="/login">Already have an account</a></p>
      </form>
      </div>
      <div id="result"  className="message hidden error-message"><p style={{color: '#fff'}}>Password and confirm password do not match!</p></div>
      <div id="setPasswordError"  className="message hidden error-message"><p style={{color: '#fff'}}>Password must be at least 8 characters long <br/>And include at least one uppercase letter, one lowercase letter, one number, and one special character.</p></div>
    </div>
  );
};

export default Register;
