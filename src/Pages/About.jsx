import React, {useEffect} from "react";
import './Css/About.css';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptopMedical } from "@fortawesome/free-solid-svg-icons";
import { faFaceSmile } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useInView } from 'react-intersection-observer'; // Import the hook


function About() {
  const navigate = useNavigate();
  useEffect(() => {
    // Scroll to top whenever the component mounts
    window.scrollTo(0, 0);
  }, []);

  const handelNavigate = (path) => {
    navigate(path);
  };

  // IntersectionObserver for triggering animation when sections are in view
  const { ref: section1Ref, inView: section1InView } = useInView({
    triggerOnce: false, // Trigger every time the section enters the view
    threshold: 0.5, // Trigger when at least 50% of the element is in view
  });

  const { ref: section2Ref, inView: section2InView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  const { ref: section3Ref, inView: section3InView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  const { ref: section4Ref, inView: section4InView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  
  const { ref: section5Ref, inView: section5InView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  return (
    <div className="about-container">
      <h1 className="title">Lap Universe</h1>

      <div className="box-section">
        {/* Left side content */}
        <div className="content">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: section1InView ? 1 : 0, x: section1InView ? 0 : -30 }}
            transition={{ duration: 0.5 }}
            className="text-box"
            ref={section1Ref}
          >
            <h3>Service</h3>
            <p>LapUniverse Full Focused on chiplevel Service</p>
          </motion.div>
          <div className="arrow-line left-arrow"></div>          
        </div>
        

        {/* Center Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: section2InView ? 1 : 0, scale: section2InView ? 1 : 0.8 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="main-box"
          ref={section2Ref}
        >
          <h3>Why to choose</h3>
          <h3>LapUniverse</h3>
        </motion.div>

        {/* Right side content */}
        <div className="content">
          <div className="arrow-line right-arrow"></div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: section3InView ? 1 : 0, x: section3InView ? 0 : 30 }}
            transition={{ duration: 0.5 }}
            className="text-box"
            ref={section3Ref}
          >
            <h3>Use Cases</h3>
            <p>It's the common question the LapUniverse provides best service and dealer prices for laptop services and parts</p>
          </motion.div>
        </div>
      </div>

      <div className="about-second-container">
        <div className="about-content">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: section4InView ? 1 : 0, x: section4InView ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="about-text-box"
            ref={section4Ref}
          >
            <h4>Genuine Work</h4>
            <FontAwesomeIcon icon={faLaptopMedical} className="about-icon" />
          </motion.div>
        </div>

        <div className="about-content">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: section4InView ? 1 : 0, x: section4InView ? 0 : 30 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="about-text-box"
          >
            <h4>Trusted Customers Service</h4>
            <FontAwesomeIcon icon={faFaceSmile} className="about-icon" />
          </motion.div>
        </div>

        <div className="about-content">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: section4InView ? 1 : 0, x: section4InView ? 0 : 40 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="about-text-box"
          >
            <h4>Quality Products</h4>
            <FontAwesomeIcon icon={faStar} className="about-icon" />
            <FontAwesomeIcon icon={faStar} className="about-icon" />
            <FontAwesomeIcon icon={faStar} className="about-icon" />
            <FontAwesomeIcon icon={faStar} className="about-icon" />
          </motion.div>
        </div>
      </div>

      <div className="about-redirecting-page">

      <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: section5InView ? 1 : 0, scale: section5InView ? 1 : 0.8 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          ref={section5Ref}
        >
        <div className="redirecting-page-box">
          <h4 onClick={() => handelNavigate('/Services')}>Need To Find The Solution For Your Laptop</h4>
        </div>

     </motion.div>

     <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: section5InView ? 1 : 0, scale: section5InView ? 1 : 0.8 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          ref={section5Ref}
        >
        <div className="redirecting-page-box">
          <h4 onClick={() => handelNavigate('/Welcome')}>Upload The Issues</h4>
        </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: section5InView ? 1 : 0, scale: section5InView ? 1 : 0.8 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          ref={section5Ref}
        >
        <div className="redirecting-page-box">
          <h4 onClick={() => handelNavigate('/Services')}>Get The Bios Files</h4>
        </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: section5InView ? 1 : 0, scale: section5InView ? 1 : 0.8 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          ref={section5Ref}
        >
        <div className="redirecting-page-box">
          <h4 onClick={() => handelNavigate('/Welcome')}>Need Any Assistants In Bios</h4>
        </div>
        </motion.div>
      </div>
    </div>
  );
}

export default About;
