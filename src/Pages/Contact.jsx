import React, { useEffect, useState } from "react";
import './Css/Contact.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import checkmark from '../Components/Assets/checkmark.png';
import bannerImage from '../Components/Assets/callcenter.png';

function Contact() {
  const [popupVisible, setPopupVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [validationError, setValidationError] = useState('');
  const phoneNumber = "+919141133686";
  const email = "ad91482948@gmail.com";

  const handleCallClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  }
  const handleEmailClick = () => {
    // Use window.location.href to trigger the mailto link
    window.location.href = `mailto:${email}`;
  };

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
        setTimeout(() => {
          document.getElementById("validation-error").classList.add("hidden");
        }, 3000);
        return false;
      }
    
      if (!mobilePattern.test(number)) {
        setValidationError('Please enter a valid 10-digit mobile number.');
        setTimeout(() => {
          document.getElementById("validation-error").classList.add("hidden");
        }, 3000);
        return false;
      }
    
      if (!emailPattern.test(email)) {
        setValidationError('Please enter a valid email address.');
        setTimeout(() => {
          document.getElementById("validation-error").classList.add("hidden");
        }, 3000);
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

<div className="banner-container">
        <div className="banner-content">
          <h1 className="banner-title">Contact Us</h1>
          <p className="banner-description">We are here to help! Please reach out with any questions or feedback.</p>
        </div>
        <div className="banner-image">
          <img src={bannerImage} alt="Contact Banner" />
        </div>
      </div>

      <div className="contact-container">
               <div className="form-section">
                  <div id="error-message" className={`message ${error ? '' : 'hidden'} error-message`}>
                    <FontAwesomeIcon icon={faTimes} /> Please check the internet to submit the details. Thank you!
                  </div>
                  <div id="validation-error" className={`message ${validationError ? '' : 'hidden'} error-message`}>
                   <FontAwesomeIcon icon={faTimes} /> {validationError}                
                   </div>
                  <div id="success-message" className={`message hidden success-message ${popupVisible ? 'open-popup' : ''}`}></div>                  
                    <form className="contact-form" name="contactform" method="post">
                      <input type="text" name="name" placeholder="Name" required/>
                      <input type="number" name="number" placeholder="Mobile Number" required/>
                      <input type="email" name="email" placeholder="Email Id" required/>
                      <input type="text" name="message" placeholder="Message" required/>
                      <button type="submit">Submit</button>
                    </form>                  
                  </div>
                  <div className="details-section">
          <h2>Contact Details</h2>
          <p onClick={handleCallClick} ><FontAwesomeIcon icon={faPhone} /> Phone: +91 91411336861</p>
          <p onClick={handleEmailClick} ><FontAwesomeIcon icon={faEnvelope} /> Email: support@lapUniverse.com</p>
          <p><FontAwesomeIcon icon={faMapMarkerAlt} /> Address: 123, Main Street, City, Country</p>
        </div>
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
