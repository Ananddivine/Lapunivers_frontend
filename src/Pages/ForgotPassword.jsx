import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Css/ToastStyles.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState('request'); // 'request', 'verify', 'reset'

  const navigate = useNavigate(); // Initialize useNavigate

  const handleRequestEmail = async () => {
    if (!email) {
      toast.error('Please enter your email!');
      return;
    }
    try {
      await axios.post('https://lapuniversbackend-production.up.railway.app/api/forgot-password/request-otp', { email });
      setStep('verify');
      toast.success('OTP sent to your email.');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error sending OTP.';
      toast.error(errorMessage);
    }
  };
  
  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error('Please enter OTP.');
      return;
    }
    try {
      await axios.post('https://lapuniversbackend-production.up.railway.app/api/forgot-password/verify-otp', { email, otp });
      setStep('reset');
      toast.success('OTP verified. Please enter a new password.');
    } catch (err) {
      toast.error('Invalid OTP.');
    }
  };
  
  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    try {
      await axios.post('https://lapuniversbackend-production.up.railway.app/api/forgot-password/reset-password', { email, newPassword });
      toast.success('Password reset successfully.');
  
      // Redirect to login page after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      toast.error('Error resetting password.');
    }
  };
  

  return (
    <div>
      {step === 'request' && (
        <div>
          <h2>Forgot Password</h2>
          <input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <button onClick={handleRequestEmail}>Send OTP</button>
        </div>
      )}

      {step === 'verify' && (
        <div>
          <h2>Verify OTP</h2>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
          />
          <button onClick={handleVerifyOtp}>Verify OTP</button>
        </div>
      )}

      {step === 'reset' && (
        <div>
          <h2>Reset Password</h2>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />
          <button onClick={handleResetPassword}>Reset Password</button>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
