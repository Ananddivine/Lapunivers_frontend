import React, { useState } from 'react';
import './Css/Login.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Css/ToastStyles.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ email: '', otp: '', username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
        toast.success('OTP sent to your email!');
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
        // localStorage.setItem('user-email', formData.email);
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
