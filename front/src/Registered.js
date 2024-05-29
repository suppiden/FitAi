import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Registered = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/');
        }, 5000);

        return () => clearTimeout(timer);  // Cleanup timeout on component unmount
    }, [navigate]);

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
            <h1>Cuenta registrada con éxito</h1>
            <p>Tu acción se ha completado. Comprueba tu email.</p>
            <p>Si no eres redirigido automáticamente, <Link to="/">pulsa aquí</Link>.</p>
        </div>
    );
};

export default Registered;
