import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [stage, setStage] = useState(1); // Stage 1 for entering email, Stage 2 for entering OTP and new password
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Define loading state

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      // Fetch data or perform actions here...
      const response = await fetch('https://script.google.com/macros/s/AKfycbzlg57wYK-ZAeYT6RTIkoKWg8L005I54LTYbs9W9kKznD3N1ATIziA-5bkshcdLXliRGw/exec', {
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
        setMessage(data.message);
        setStage(2); // Move to stage 2 for entering OTP and new password
      } else {
        setMessage('Error: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Internal Server Error');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      // Send OTP and new password to server for password reset
      const response = await fetch('https://script.google.com/macros/s/AKfycbzlg57wYK-ZAeYT6RTIkoKWg8L005I54LTYbs9W9kKznD3N1ATIziA-5bkshcdLXliRGw/exec', {
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
       
        setMessage(data.message);
        window.location.href = '/login';
      } else {
        setMessage('Error: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Internal Server Error');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('Error: New password and confirm password do not match');
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
      {stage === 1 ? (
        <form onSubmit={handleEmailSubmit}>
          <h1>Forgot Password</h1>
          <p>{message}</p>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <h1>Reset Password</h1>
          <p>{message}</p>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Reset Password</button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;