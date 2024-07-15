import React, { useEffect } from "react";
import './Contact.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';

function Contact() {
    useEffect(() => {
      const scriptURL = 'https://script.google.com/macros/s/AKfycbwb-qRNlnlVg2RfP9-B6Ukl1kNCeH0BKjitjOLWYyi9aaeWSM6Il4q4uG3b8lIgRGxQ/exec';
      const form = document.forms['contactform'];
      const loadingSpinner = document.getElementById("loading-spinner");

      const handleSubmit = (e) => {
        e.preventDefault();
        
        loadingSpinner.classList.remove("hidden");
        
        fetch(scriptURL, { method: 'POST', body: new FormData(form) })
          .then(response => response.json())
          .then(_result => {
            loadingSpinner.classList.add("hidden");
            document.getElementById("success-message").classList.remove("hidden");
            setTimeout(() => {
              document.getElementById("success-message").classList.add("hidden");
            }, 3000); 
          })
          .catch(_error => {
            loadingSpinner.classList.add("hidden");
            document.getElementById("error-message").classList.remove("hidden");
            setTimeout(() => {
              document.getElementById("error-message").classList.add("hidden");
            }, 3000); 
          });
            
        form.reset();
      };

      form.addEventListener('submit', handleSubmit);

      return () => {
        form.removeEventListener('submit', handleSubmit);
      };
    }, []);
    return(
        <div>
            <div id="error-message" className="message hidden  error-message" ><FontAwesomeIcon icon={faTimes} />  Pleace check the internet to submit the details. Thank you!.</div>
          <div id="success-message" className="message hidden success-message"> <FontAwesomeIcon icon={faCheck} /> Your message has been sent. Thank you!</div>
                <h1>Contact Us</h1>
                <div className="container contact-box">
                <form  className="contact-form" name="contactform" method="post" >
                    <input type="text" name="name" placeholder="Name" required/>
                    <input type="number" name="number" placeholder="Mobile Number" required/>
                    <input type="email" name="email" placeholder="Email Id" required/>
                    <input type="text" name="message" placeholder="Message" required/>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div id="loading-spinner" className="hidden">
            <div className="spinner-container">
              <div className="spinner"></div>
            </div>
          </div>
        </div>
    );
}
export default Contact; 
