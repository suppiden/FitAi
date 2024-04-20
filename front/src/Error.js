
import React from 'react';
import './error.css'; // Ensure this CSS file includes the styles shown in your screenshots

const ErrorComponent = () => {
  return (
    <div className="error__container">
      <div className="error__code">
        <p>4</p>
        <p>0</p>
        <p>4</p>
      </div>
      <div className="error__title">Page Not Found</div>
      <div className="error__description">
        We can't seem to find that page. It might have been removed or doesn't exist anymore.
      </div>
      <button className="action">Go Home</button>
    </div>
  );
};

export default ErrorComponent;

