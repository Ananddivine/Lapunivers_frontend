import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import './Forgot.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [stage, setStage] = useState(1); // Stage 1 for entering email, Stage 2 for entering OTP and new password
  const [loading, setLoading] = useState(false); // Define loading state

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbwuij_rkOOZxH6oMkHotL-Y9HhZe7FOq1OMfjrDHkk2hoiu139OlgMLhGa4jPU8Ikhg5g/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          email: email,
        }),
      });
      const data = await response.json();
      if (data.success) {
        document.getElementById("success-message").innerHTML = data.message;
        document.getElementById("success-message").classList.remove("hidden");
        setTimeout(() => {
            document.getElementById("success-message").classList.add("hidden");
        }, 3000);
        setStage(2); // Move to stage 2 for entering OTP and new password
      } else {
        document.getElementById("error-message").innerHTML = 'Error: ' + data.message;
        document.getElementById("error-message").classList.remove("hidden");
        setTimeout(() => {
            document.getElementById("error-message").classList.add("hidden");
        }, 3000);
      }
    } catch (error) {
      console.error('Error:', error);
      document.getElementById("error-message").innerHTML = 'Internal Server Error';
      document.getElementById("error-message").classList.remove("hidden");
      setTimeout(() => {
          document.getElementById("error-message").classList.add("hidden");
      }, 3000);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbwuij_rkOOZxH6oMkHotL-Y9HhZe7FOq1OMfjrDHkk2hoiu139OlgMLhGa4jPU8Ikhg5g/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          email: email,
          otp: otp,
          newPassword: newPassword,
        }),
      });
      const data = await response.json();
      if (data.success) {
        document.getElementById("success-message").innerHTML = data.message;
        document.getElementById("success-message").classList.remove("hidden");
        setTimeout(() => {
            document.getElementById("success-message").classList.add("hidden");
        }, 3000);
        window.location.href = '/login';
      } else {
        document.getElementById("error-message").innerHTML = 'Error: ' + data.message;
        document.getElementById("error-message").classList.remove("hidden");
        setTimeout(() => {
            document.getElementById("error-message").classList.add("hidden");
        }, 3000);
      }
    } catch (error) {
      console.error('Error:', error);
      document.getElementById("error-message").innerHTML = 'Internal Server Error';
      document.getElementById("error-message").classList.remove("hidden");
      setTimeout(() => {
          document.getElementById("error-message").classList.add("hidden");
      }, 3000);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      document.getElementById("error-message").innerHTML = 'Error: New password and confirm password do not match';
      document.getElementById("error-message").classList.remove("hidden");
      setTimeout(() => {
          document.getElementById("error-message").classList.add("hidden");
      }, 3000);
      return;
    }
    handlePasswordReset(e);
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
      {loading && (
        <div id="loading-spinner">
          <h1>Loading...</h1>
        </div>
      )}
      <div id="error-message" className="message hidden error-message"><FontAwesomeIcon icon={faTimes} /> <span id="error-message-text"></span></div>
      <div id="success-message" className="message hidden success-message"> <FontAwesomeIcon icon={faCheck} /> <span id="success-message-text"></span></div>
      {stage === 1 ? (
        <form onSubmit={handleEmailSubmit}>
          <h1>Forgot Password</h1>
          <input
            type="email"
            placeholder="Enter your email"
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className='submit' type="submit">Submit</button>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <h1>Reset Password</h1>
          <input
            type="text"
            name='otp'
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
            required
          />
          <input
          name='password'
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
           name='confirmpassword'
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button className='submit' type="submit">Reset Password</button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
