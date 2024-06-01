import React from 'react';
import './ErrorBox.css'; // Importando los estilos CSS

const ErrorBox = ({ message }) => {
  return (
    <div className="error-box">
      {message}
    </div>
  );
};

export default ErrorBox;
