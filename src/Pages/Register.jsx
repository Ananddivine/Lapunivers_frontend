import React, { useState, useEffect } from 'react';
import './Css/Login.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Css/ToastStyles.css';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';

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

  // Handle OTP expiration check
  useEffect(() => {
    const otpExpiry = localStorage.getItem('otp-expiry');
    if (otpExpiry && step === 2) {
      const remainingTime = otpExpiry - new Date().getTime();
      // If OTP is expired, reset the flow to step 1
      if (remainingTime <= 0) {
        toast.error('OTP has expired. Please request a new one.');
        setStep(1);
        localStorage.removeItem('otp-expiry');
        localStorage.removeItem('encrypted-email');
        localStorage.removeItem('otp-step');
      }
    }
  }, [step]);

  // Load saved email and OTP expiration from localStorage
  useEffect(() => {
    const encryptedEmail = localStorage.getItem('encrypted-email');
    if (encryptedEmail && step === 2) {
      const decryptedEmail = CryptoJS.AES.decrypt(encryptedEmail, 'secret-key').toString(CryptoJS.enc.Utf8);
      setFormData((prev) => ({ ...prev, email: decryptedEmail }));
    }
  }, [step]);

  // Input change handler
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Send OTP
  const sendOtp = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://lapuniversbackend-production.up.railway.app/api/users/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });
      const responseData = await response.json();
      if (responseData.success) {
        toast.success('OTP has been sent to your email!');
        const encryptedEmail = CryptoJS.AES.encrypt(formData.email, 'secret-key').toString();
        const otpExpiry = new Date().getTime() + 2 * 60 * 1000; // OTP valid for 2 minutes

        // Save encrypted email and OTP expiration
        localStorage.setItem('encrypted-email', encryptedEmail);
        localStorage.setItem('otp-expiry', otpExpiry);
        localStorage.setItem('otp-step', 2);
        setStep(2);
      } else {
        toast.error(responseData.message || 'Failed to send OTP.');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const verifyOtp = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://lapuniversbackend-production.up.railway.app/api/users/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email, otp: formData.otp }),
      });
      const responseData = await response.json();
      if (responseData.success) {
        toast.success('OTP verified. Proceed to create your account.');
        localStorage.setItem('otp-step', 3);
        setStep(3);
      } else {
        toast.error(responseData.message || 'Invalid or expired OTP.');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle step 3 timeout (2 minutes)
useEffect(() => {
  if (step === 3) {
    const timer = setTimeout(() => {
      toast.error('Session expired. Please restart the process.');
      resetToStep1();
    }, 2 * 60 * 1000); // 2 minutes

    return () => clearTimeout(timer); // Clear timer on cleanup
  }
}, [step]);

// Reset to Step 1 and clear localStorage
const resetToStep1 = () => {
  setStep(1);
  setFormData({ email: '', otp: '', username: '', password: '' });
  localStorage.removeItem('otp-expiry');
  localStorage.removeItem('encrypted-email');
  localStorage.removeItem('otp-step');
};


  // Create Account
  const signup = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://lapuniversbackend-production.up.railway.app/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });
      const responseData = await response.json();
      if (response.ok && responseData.success) {
        const tokenExpiryTime = new Date().getTime() + 24 * 60 * 60 * 1000; // Set token expiry to 24 hours

        localStorage.setItem('auth-token', responseData.token);
        localStorage.setItem('token-expiry', tokenExpiryTime);
        localStorage.setItem('username', responseData.user.name);
        toast.success('Account created successfully! Redirecting...');
        setTimeout(() => navigate('/welcome'), 2000);
      } else {
        toast.error(responseData.message || 'Failed to create account.');
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
              <bold style={{ color: 'white' }}>Please note</bold> : <small style={{ color: '#7aa5d0' }}>The OTP will remain valid for 2 minutes.</small>
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
