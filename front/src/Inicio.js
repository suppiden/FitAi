import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './indexCatch.css';
import Nav from './Nav';
import woman from './woman2.png';

function Inicio({ nombre, contra }) {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [inputs, setInputs] = useState({
    email: '',
    pass: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8081/inicio', inputs)
      .then(response => {
        if (response.data.success) {
          localStorage.setItem("_id", response.data.userId);
          console.log('Ha traído algo y es:', response.data.userId);
          navigate('/sesion');
        } else {
          setErrorMessage(response.data.message);
        }
      })
      .catch(error => {
        console.error('Error al enviar datos:', error);
        setErrorMessage('Error al enviar datos');
      });
  };

  return (
    <>
      <Nav userId={!!userId} />
      <main className='login'>
        <div className='loginCard'>
          <h1 className='loginTitle'>Inicia sesión</h1>
          <form className='loginForm' onSubmit={handleSubmit}>
            <label htmlFor="email" style={{ color: '#fffbf5' }}>Email:</label>
            <input
              id="email"
              name="email"
              type="email"
              value={inputs.email}
              onChange={handleChange}
            />
            <label htmlFor="pass" style={{ color: '#fffbf5' }}>Contraseña:</label>
            <input
              id="pass"
              name="pass"
              type="password"
              value={inputs.pass}
              onChange={handleChange}
            />
            {errorMessage && <p className="errorMessage">{errorMessage}</p>}
            <button className='loginBtn' type="submit">Iniciar sesión</button>
            <p style={{ color: '#fffbf5' }}>¿No tienes una cuenta? <Link to='/registro'>Regístrate</Link></p>
          </form>
        </div>
      </main>
      <div className="image2">
        <img src={woman} className="image" alt="Man illustration" />
      </div>
    </>
  );
}

export default Inicio;
