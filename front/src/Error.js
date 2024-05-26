// src/components/ErrorComponent.js
import React from 'react';
import './error.css'; // Ensure this CSS file includes the styles shown in your screenshots
import { useNavigate } from "react-router-dom";



const ErrorComponent = () => {
const navigate = useNavigate();

  const goInicio = () => {
    navigate("/inicio");
  };
  return (
    <div className="errorContainer">
      <div className="errorCode">
        <p className="errorDigit">4</p>
        <p className="errorDigit">0</p>
        <p className="errorDigit">4</p>
      </div>
      <div className="errorTitle">Page Not Found</div>
      <div className="errorDescription">
        We can't seem to find that page. It might have been removed or doesn't exist anymore.
      </div>
      <button className="action" onClick={goInicio}>Go Home</button>
    </div>
  );
};

export default ErrorComponent;
