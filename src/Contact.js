import React, { useEffect, useState } from "react";
import './Contact.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import checkmark from './images/checkmark.png';

function Contact() {
  const [popupVisible, setPopupVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwb-qRNlnlVg2RfP9-B6Ukl1kNCeH0BKjitjOLWYyi9aaeWSM6Il4q4uG3b8lIgRGxQ/exec';
    const form = document.forms['contactform'];

    const validateForm = () => {
      const name = form.name.value.trim();
      const number = form.number.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const mobilePattern = /^\d{10}$/;

      if (!name || !number || !email || !message) {
        setValidationError('All fields are required.');
        return false;
      }

      if (!mobilePattern.test(number)) {
        setValidationError('Please enter a valid 10-digit mobile number.');
        return false;
      }

      if (!emailPattern.test(email)) {
        setValidationError('Please enter a valid email address.');
        return false;
      }

      setValidationError('');
      return true;
    };


    const handleSubmit = (e) => {
      e.preventDefault();

      if (!validateForm()) {
        return;
      }
      
      setLoading(true);
      
      fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => response.json())
        .then(_result => {
          setLoading(false);
          setPopupVisible(true);
          setTimeout(() => {
            setPopupVisible(false);
          }, 4000); 
        })
        .catch(_error => {
          setLoading(false);
          setError(true);
          setTimeout(() => {
            setError(false);
          }, 3000); 
        });
          
      form.reset();
    };

    form.addEventListener('submit', handleSubmit);

    return () => {
      form.removeEventListener('submit', handleSubmit);
    };
  }, []); 

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
      <div id="error-message" className={`message ${error ? '' : 'hidden'} error-message`}>
        <FontAwesomeIcon icon={faTimes} /> Please check the internet to submit the details. Thank you!
      </div>
      <div id="validation-error" className={`message ${validationError ? '' : 'hidden'} error-message`}>
        <FontAwesomeIcon icon={faTimes} /> {validationError}
      </div>
      <div id="success-message" className={`message hidden success-message ${popupVisible ? 'open-popup' : ''}`}></div>
      <h1>Contact Us</h1>
      <div className="container contact-box">
        <form className="contact-form" name="contactform" method="post">
          <input type="text" name="name" placeholder="Name" required/>
          <input type="number" name="number" placeholder="Mobile Number" required/>
          <input type="email" name="email" placeholder="Email Id" required/>
          <input type="text" name="message" placeholder="Message" required/>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className={`popup ${popupVisible ? 'open-popup' : ''}`} id="popup">
        <img src={checkmark} alt="checkmark" />
        <h2>Thank You!</h2>
        <p>Your message has been sent. Thank you!</p>
        <button type='button' onClick={() => setPopupVisible(false)}>OK</button>
      </div>
      {loading && (
        <div id="loading-spinner">
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Contact;
