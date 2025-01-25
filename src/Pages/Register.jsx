import React, { useState, useEffect } from 'react';
import './Css/Login.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Css/ToastStyles.css';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import axiosInstance from '../Components/axiosInstance/axiosInstance'; // Import the axiosInstance

const Register = () => {
  const [step, setStep] = useState(() => parseInt(localStorage.getItem('otp-step')) || 1);
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleClearLocalStorage = () => {
    localStorage.clear();
    resetToStep1();
  };

  useEffect(() => {
    const otpExpiry = localStorage.getItem('otp-expiry');
    if (otpExpiry && step === 2) {
      const remainingTime = otpExpiry - new Date().getTime();
      if (remainingTime <= 0) {
        toast.error('OTP has expired. Please request a new one.');
        setStep(1);
        localStorage.removeItem('otp-expiry');
        localStorage.removeItem('encrypted-email');
        localStorage.removeItem('otp-step');
      }
    }
  }, [step]);

  useEffect(() => {
    const encryptedEmail = localStorage.getItem('encrypted-email');
    if (encryptedEmail && step === 2) {
      const decryptedEmail = CryptoJS.AES.decrypt(encryptedEmail, 'secret-key').toString(CryptoJS.enc.Utf8);
      setFormData((prev) => ({ ...prev, email: decryptedEmail }));
    }
  }, [step]);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendOtp = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post('/api/users/send-otp', {
        email: formData.email,
      });
      if (response.data.success) {
        toast.success('OTP has been sent to your email!');
        const encryptedEmail = CryptoJS.AES.encrypt(formData.email, 'secret-key').toString();
        const otpExpiry = new Date().getTime() + 2 * 60 * 1000;
        localStorage.setItem('encrypted-email', encryptedEmail);
        localStorage.setItem('otp-expiry', otpExpiry);
        localStorage.setItem('otp-step', 2);
        setStep(2);
      } else {
        toast.error(response.data.message || 'Failed to send OTP.');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Something went wrong. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post('/api/users/verify-otp', {
        email: formData.email,
        otp: formData.otp,
      });
      if (response.data.success) {
        toast.success('OTP verified. Proceed to create your account.');
        localStorage.setItem('otp-step', 3);
        setStep(3);
      } else {
        toast.error(response.data.message || 'Invalid or expired OTP.');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (step === 3) {
      const timer = setTimeout(() => {
        toast.error('Session expired. Please restart the process.');
        resetToStep1();
      }, 2 * 60 * 1000);

      return () => clearTimeout(timer);
    }
  }, [step]);

  const resetToStep1 = () => {
    setStep(1);
    setFormData({ email: '', otp: '', username: '', password: '' });
    localStorage.removeItem('otp-expiry');
    localStorage.removeItem('encrypted-email');
    localStorage.removeItem('otp-step');
  };

  const signup = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post('/api/users/signup', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      if (response.data.success) {
        const tokenExpiryTime = new Date().getTime() + 24 * 60 * 60 * 1000;
        localStorage.setItem('auth-token', response.data.authToken);
        localStorage.setItem('token-expiry', tokenExpiryTime);
        localStorage.setItem('username', response.data.user.name);
        toast.success('Account created successfully! Redirecting...');
        setTimeout(() => navigate('/welcome'), 2000);
      } else {
        toast.error(response.data.message || 'Failed to create account.');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h1>Sign Up</h1>
        {step === 1 && (
          <div className="register-fields">
            <input
              name="email"
              value={formData.email}
              onChange={changeHandler}
              type="email"
              placeholder="Email Address"
              required
            />
            <button onClick={sendOtp} disabled={loading}>
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          </div>
        )}
        {step === 2 && (
          <div className="register-fields">
            <input
              name="otp"
              value={formData.otp}
              onChange={changeHandler}
              type="text"
              placeholder="Enter OTP"
              required
            />
            <button onClick={verifyOtp} disabled={loading}>
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
            <p className="info-text">
              <strong style={{ color: 'white' }}>Please note</strong> :{' '}
              <small style={{ color: '#7aa5d0' }}>The OTP will remain valid for 2 minutes.</small>
            </p>
            <p
              onClick={handleClearLocalStorage}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                cursor: 'pointer',
                color: isHovered ? 'blue' : '#ccc',
                textDecoration: isHovered ? 'none' : 'none',
              }}
            >
              Wrong Email ??
            </p>
          </div>
        )}
        {step === 3 && (
          <div className="register-fields">
            <input
              name="username"
              value={formData.username}
              onChange={changeHandler}
              type="text"
              placeholder="Your Name"
              required
            />
            <input
              name="password"
              value={formData.password}
              onChange={changeHandler}
              type="password"
              placeholder="Password"
              required
            />
            <button onClick={signup} disabled={loading}>
              {loading ? 'Processing...' : 'Create Account'}
            </button>
            <p
              onClick={handleClearLocalStorage}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                cursor: 'pointer',
                color: isHovered ? 'blue' : '#ccc',
                textDecoration: isHovered ? 'none' : 'none',
              }}
            >
              Wrong Email ??
            </p>
          </div>
        )}
        <p className="loginsignup-login">
          Read our : <a href="/terms">terms and conditions</a>
        </p>
        <p className="loginsignup-login">
          Already have an account?{' '}
          <span onClick={() => navigate('/login')} className="login-link">
            Login Here
          </span>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
