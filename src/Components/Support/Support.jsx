import React from 'react'
import '../Support/Support.css'
import { useNavigate } from "react-router-dom";
import { useInView } from 'react-intersection-observer'; 
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseLaptop } from "@fortawesome/free-solid-svg-icons";
import { faGears } from "@fortawesome/free-solid-svg-icons";
import { faHeadset } from "@fortawesome/free-solid-svg-icons";
import { faUpload } from "@fortawesome/free-solid-svg-icons";



const Support = () => {

    const navigate = useNavigate()

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

  


  return (
   <div className="support-service">
    <div className="support-service-container">
        <div className="support-service-content" onClick={() => navigate('/Service')}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: section2InView ? 1 : 0, x: section2InView ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="support-service-text-box"
            ref={section2Ref}
          >
            <h4>Chip level service</h4>
            <FontAwesomeIcon icon={faHouseLaptop} className="support-service-icon" />
          </motion.div>
        </div>

        <div className="support-service-content"  onClick={() => navigate('/Drivers')}>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: section3InView ? 1 : 0, x: section3InView ? 0 : 30 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="support-service-text-box"
            ref={section3Ref}
          >
            <h4>Driver issue</h4>
            <FontAwesomeIcon icon={faGears} className="support-service-icon" />
          </motion.div>
        </div>

        <div className="support-service-content"  onClick={() => navigate('/contact')}>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: section4InView ? 1 : 0, x: section4InView ? 0 : 40 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="support-service-text-box"
            ref={section4Ref}
          >
            <h4>Support</h4>           
            <FontAwesomeIcon icon={faHeadset} className="support-service-icon" />
          </motion.div>
        </div>

        <div className="support-service-content"  onClick={() => navigate('/welcome')}>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: section4InView ? 1 : 0, x: section4InView ? 0 : 40 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="support-service-text-box"
            ref={section4Ref}
          >
            <h4>Upload the issues with image</h4>           
            <FontAwesomeIcon icon={faUpload} className="support-service-icon" />
          </motion.div>
        </div>

      </div>
   </div>
  )
}

export default Support;