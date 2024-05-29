import './indexCatch.css';
import Nav from './Nav';
import axios from 'axios';
import React, { useState } from 'react'; // Fixed import here
import { Link, useNavigate } from 'react-router-dom'; // Correctly import Link and useNavigate
import woman from './woman2.png'



function App() {
  const [userId, setUserId] = useState('')
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
          navigate('/registered');
      }
      })
      .catch(error => {
        console.error('Error al enviar datos:', error);
      });
  };


  return (
    <>
    <Nav userId={!!userId}/>
    <main className='register'>
  <div className='registerCard'>
    <h1 className='registerTitle'>Crea una cuenta</h1>
    <form className='registerForm' onSubmit={handleSubmit}>
      <label htmlFor="nombre" style={{ color: '#fffbf5' }}>Nombre:</label>
      <input
        id="nombre"
        name="nombre"
        type="text"
        value={inputs.nombre}
        onChange={handleChange}
      />
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
      <button className='registerBtn' type="submit">Enviar</button>
      <p style={{ color: '#fffbf5' }}>¿Tienes una cuenta? <Link to='/inicio'>Iniciar sesión</Link></p>
    </form>
  </div>
</main>
<div className="image2">
        <img src={woman} className="image" alt="Man illustration" />
      </div>

    
    </>

  );
}


export default App;
