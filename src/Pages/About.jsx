import React from "react";
import './Css/About.css';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptopMedical } from "@fortawesome/free-solid-svg-icons";
import { faFaceSmile } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom"


function About() {

    const navigate = useNavigate();

    const handelNavigate = (path) => {
        navigate(path);
    }

    return (
        <div className="about-container">
            <h1 className="title">Lap Universe</h1>

            <div className="box-section">
                {/* Left side content */}
                <div className="content">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-box"
                    >
                        <h3>Service</h3>
                        <p>LapUniverse Full Focused on chiplevel Service</p>
                    </motion.div>
                    <div className="arrow-line left-arrow"></div>
                </div>

                {/* Center Box */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="main-box"
                >
                    <h3>Why to choose</h3>
                    <h3>LapUniverse</h3>              
                </motion.div>

                {/* Right side content */}
                <div className="content">
                    <div className="arrow-line right-arrow"></div>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-box"
                    >
                        <h3>Use Cases</h3>
                        <p>It's the common question the lapunivese 
                        provides best service and the dealer price for
                         the laptop services and parts</p>
                    </motion.div>
                </div>
            </div>

                <div className="about-second-container">
                   <div className="about-content">
                   <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="about-text-box"
                    >

                        <h4>Genuine Work</h4>
                        <FontAwesomeIcon icon={faLaptopMedical} className="about-icon" />
                </motion.div>
                   </div>

                   <div className="about-content">
                   <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="about-text-box"
                    >

                        <h4> Trusted Customers Service</h4>
                        <FontAwesomeIcon icon={faFaceSmile} className="about-icon" />

                </motion.div>
                   </div>

                   <div className="about-content">
                   <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.9 }}
                        className="about-text-box"
                    >

                        <h4> Quality Products</h4>
                        <FontAwesomeIcon icon={faStar} className="about-icon" />
                        <FontAwesomeIcon icon={faStar} className="about-icon" />
                        <FontAwesomeIcon icon={faStar} className="about-icon" />
                        <FontAwesomeIcon icon={faStar} className="about-icon" />
                        

                </motion.div>
                   </div>

                </div>



                <div className="about-redirecting-page">

                    <div className="redirecting-page-box">
                            <h4 onClick={() => handelNavigate('/Services')}>Need To Find The Solution For Your Laptop</h4>
                    </div>

                    <div className="redirecting-page-box">
                            <h4 onClick={() => handelNavigate('/Welcome')}>Upload The Issues</h4>
                    </div>


                    <div className="redirecting-page-box">
                            <h4 onClick={() => handelNavigate('/Services')}>Get The Bios Files</h4>
                    </div>

                    <div className="redirecting-page-box">
                            <h4 onClick={() => handelNavigate('/Welcome')}>Need Any Assistents In Bios</h4>
                    </div>


                </div>
                


        </div>
    );
}

export default About;
