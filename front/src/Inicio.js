
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './index.css';


function Inicio({ nombre, contra }) {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: '',
    pass:''
  });

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
        if(response.data.success) {
          // Redirecciona al usuario a sesion.html
          // navigate('/sesion');
          console.log('ha traido algo')
          navigate('/sesion')
      }
      })
      .catch(error => {
        console.error('Error al enviar datos:', error);
      });
  };

  return (
    <main className='login'>
      <h1 className='loginTitle'>Inicia Sesion</h1>
    <form className='loginForm' onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          value={inputs.email}
          onChange={handleChange}
        />
      
      
        <label htmlFor="password">password:</label>
        <input
          id="pass"
          name="pass"
          type="password"
          value={inputs.pass}
          onChange={handleChange}
        />
      
      <button className='loginBtn' type="submit">Enviar</button>
      <p>
        Don't have an account? <Link to='/register'>Create one</Link>
      </p>
    </form>
    </main>
  );
}


export default Inicio;
