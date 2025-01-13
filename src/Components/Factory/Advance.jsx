import React from 'react';
import './Advance.css';
import { useNavigate } from 'react-router-dom';

const Advance = () => {

    const navigate = useNavigate();


  return (
    <div className="experts-container">
      <div className="content-wrapper">
        <h2>Expert Laptop & Chip-Level Services</h2>
        <p className="description">
          Get the best care for your laptop with our expert services. From diagnosing issues to advanced chip-level repairs, we ensure your device performs at its peak. Trust us for fast, reliable, and professional service.
        </p>
        <div className="card-grid">
          {/* Card 1 */}
          <div className="card">
            <div className="icon">
              <span>🔧</span>
            </div>
            <h3>Comprehensive Diagnostics</h3>
            <p>
              Quickly identify and troubleshoot laptop hardware and software issues with our advanced diagnostic tools.
            </p>
          </div>
          {/* Card 2 */}
          <div className="card">
            <div className="icon">
              <span>⚡</span>
            </div>
            <h3>Chip-Level Repairs</h3>
            <p>
              Restore functionality with precision chip-level repairs for motherboards and other critical components.
            </p>
          </div>
          {/* Card 3 */}
          <div className="card">
            <div className="icon">
              <span>🖥️</span>
            </div>
            <h3>Screen Replacement</h3>
            <p>
              Fix cracked or malfunctioning laptop screens with high-quality replacements tailored to your model.
            </p>
          </div>
          {/* Card 4 */}
          <div className="card">
            <div className="icon">
              <span>🔋</span>
            </div>
            <h3>Battery & Power Issues</h3>
            <p>
              Diagnose and resolve charging and power-related problems, ensuring reliable performance for your laptop.
            </p>
          </div>
        </div>
        <button onClick={() => navigate('/Services')} className="cta-button">Explore Our Services</button>
      </div>
    </div>
  );
};

export default Advance;
