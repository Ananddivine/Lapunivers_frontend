import React from 'react';
import { useNavigate } from 'react-router-dom';

const Terms = () => {

  const navigate = useNavigate();

  return (
    <div className="container my-5">
      <div className="card shadow-lg">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Terms and Conditions</h2>
          <p>
            Welcome to our laptop service platform. By registering on this website, you agree to the terms and conditions outlined below:
          </p>
          <ol>
            <li className="mb-3">
              <strong>Acceptance of Terms:</strong> By registering, you confirm that you have read, understood, and agreed to these terms and conditions.
            </li>
            <li className="mb-3">
              <strong>Account Security:</strong> 
              <ul>
                <li>All registration data is encrypted and securely stored.</li>
                <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
              </ul>
            </li>
            <li className="mb-3">
              <strong>Email Verification:</strong> 
              <ul>
                <li>To prevent spam, email verification is mandatory and must be completed within 10 minutes.</li>
                <li>If verification is not completed, the registration process will need to be restarted.</li>
              </ul>
            </li>
            <li className="mb-3">
              <strong>Content Usage:</strong> 
              <ul>
                <li>BIOS files, schematics, and board views are free to download for registered users.</li>
                <li>Users can upload laptop-related issues with images to seek solutions.</li>
              </ul>
            </li>
            <li className="mb-3">
              <strong>Prohibited Activities:</strong> 
              <ul>
                <li>Use of temporary or disposable email addresses is prohibited.</li>
                <li>Any disruptive activities will lead to account termination.</li>
              </ul>
            </li>
            <li className="mb-3">
              <strong>Data Protection:</strong> User data will be securely stored and never shared without consent, except as required by law.
            </li>
            <li className="mb-3">
              <strong>Amendments:</strong> We reserve the right to update these terms and conditions without prior notice.
            </li>
          </ol>
          <p className="text-center mt-4">
            <strong>By registering, you agree to abide by these terms and conditions.</strong>
          </p>
          <div className="text-center mt-3">
            <button className="btn btn-primary" onClick={() => navigate('/Register')}>Go Back</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
