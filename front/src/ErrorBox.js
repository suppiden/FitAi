import React from 'react';

const ErrorBox = ({ message }) => {
  return (
    <div style={{
      backgroundColor: 'rgba(255, 0, 0, 0.2)', // Rojo transparente
      color: 'red',
      border: '1px solid red',
      padding: '10px',
      borderRadius: '5px',
      margin: '20px',
      textAlign: 'center',
      height:'5vh',
       width:'30%',
      position: 'absolute',
      left: '50%',
      top: '80vh',
    }}>
      {message}
    </div>
  );
};

export default ErrorBox;
