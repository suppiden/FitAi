import React from 'react';

const BotonToken = ({ message }) => {
  return (
    <button style={{
      backgroundColor: 'rgba(0, 128, 0, 0.8)', // Verde oscuro transparente
      color: 'white', // Texto en blanco
      border: '1px solid green',
      padding: '10px',
      borderRadius: '5px',
      margin: '20px',
      textAlign: 'center',
      height: '5vh',
      width: '30%',
      position: 'absolute',
      left: '65%',
      top: '90vh',
      transform: 'translateX(-50%)', // Centrar horizontalmente
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Sombra para darle profundidad
      cursor: 'pointer', // Cambiar el cursor al pasar por encima
      transition: 'background-color 0.3s ease', // Transición suave
    }}
    onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(0, 128, 0, 1)'} // Efecto hover
    onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(0, 128, 0, 0.8)'}
    >
      {message}
    </button>
  );
};

export default BotonToken;
