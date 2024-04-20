import './index.css';
import axios from 'axios';
import React, { useState } from 'react'; // Fixed import here
import { Link, useNavigate } from 'react-router-dom'; // Correctly import Link and useNavigate



function App() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    nombre: '',
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
    axios.post('http://localhost:8081/sesion', inputs)
      .then(response => {
        if(response.data.success) {
          // Redirecciona al usuario a sesion.html
          navigate('/sesion');
      }
      })
      .catch(error => {
        console.error('Error al enviar datos:', error);
      });
  };

  return (
    <main className='register'>
      <h1 className='registerTitle'>Crea una cuenta</h1>
    <form  className='username' onSubmit={handleSubmit}>
      
        <label htmlFor="nombre">Nombre:</label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          value={inputs.nombre}
          onChange={handleChange}
        />
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
      <button className='registerBtn' type="submit">Enviar</button>
      <p> Have an account? <Link to='/'>Sign in</Link></p>
    </form>
    </main>
  );
}


export default App;
