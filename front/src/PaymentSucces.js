import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const PaymentSuccess = () => {
    const navigate = useNavigate();
    const planPrice = localStorage.getItem('planPrice'); // Recuperar precio del plan
  
    useEffect(() => {
      setTimeout(() => {
        activatePayment()
          .then(() => {
            localStorage.removeItem('planPrice'); // Limpiar localStorage
            navigate('/sesion');
          })
          .catch(error => console.error('Error en la activación del pago:', error));
      }, 3000); // Redirige después de 10 segundos
    }, [navigate]);
  
    const activatePayment = async () => {
      try {
        const response = await axios.post('http://localhost:8081/activarPago', { price: planPrice });
        if (response.data.success) {
          console.log('Pago activado correctamente');
        } else {
          console.error('Error al activar el pago');
        }
      } catch (error) {
        throw new Error('Error al realizar la solicitud de activación de pago');
      }
    };
  
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        backgroundColor: '#f4f4f9',
        color: '#333',
        fontSize: '24px',
        fontFamily: 'Arial, sans-serif'
      }}>
        <h1>Pago realizado con éxito</h1>
        <p>Tu transacción se ha completado. Serás redirigido en breve.</p>
      </div>
    );
  };
  
  export default PaymentSuccess;
