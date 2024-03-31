import React, { useState } from 'react';
import axios from 'axios';
import './App.css';


const Pago = () => {
  const [respuestaApi, setRespuestaApi] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8081/pago')
      .then(response => {
        // Aquí actualizamos el estado con la respuesta de la API
        // Puedes ajustar esto dependiendo de cómo quieras mostrar los datos
        window.location.href =  response.data.url;
      })
      .catch(error => {
        console.error('Error al enviar datos:', error);
        // También podrías querer actualizar el estado para mostrar el error
        setRespuestaApi('Error al realizar el pago.');
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button>Inicia el pago</button>
      </form>
      {/* Renderizar la respuesta de la API */}
      {respuestaApi && <pre>{respuestaApi}</pre>}
    </div>
  );
}

export default Pago;
