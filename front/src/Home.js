

import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import  Likes  from "./Likes";
import  Comments  from "./Comments"

const Home = () => {
    const navigate = useNavigate()
    const [userId, setUserId] = useState('')
    const [threads, setThreads] = useState([]);
const [threadInput, setThreadInput] = useState('');


   


    const handleSubmit = (e) => {
      e.preventDefault();
      if (userId) { // Asegúrate de que userId está disponible
        createThread(threadInput, userId);
        setThreadInput(''); // Reinicia el estado de tu formulario
      } else {
          console.error('No hay ID de usuario disponible');
          // Manejar adecuadamente, como redirigir al login
      }
  };



    useEffect(() => {
      const verificarSesion = async () => {
        try {
          var response = await axios.get('http://localhost:8081/validarSesion'); // Asume que Axios está configurado globalmente para usar tu base URL
          if (!response.data.authenticated) {
            navigate("/");
            console.log("no se ha podido verificar")
          } else {
            console.log("Authenticated");
            setUserId(response.data.userId)
            
            console.log('esto es el user', response.data.userId)
          }
        } catch (error) {
          console.error('Error verificando la sesión:', error);
          navigate("/"); // Opcional: Redirigir al usuario si hay un error
        }
      };
  
      verificarSesion();
    }, [navigate]);
    



    const createThread = (thread, userId) => {
        axios.post("http://localhost:8081/create/thread", {
            thread,
            userId,
        })
        .then((response) => {
            // Acceso directo a response.data en lugar de response.json()
            setThreads(response.data.allThreads);
            console.log(response.data.allThreads)
        })
        .catch((error) => {
            console.error('Error:', error);
            // No olvides manejar los errores de manera que el usuario sepa qué ha ido mal.
        });
      };

 

  


    
    return (
        <>
            <Nav />
            <main className='home'>
                <h2 className='homeTitle'>Create a Thread</h2>
                <form className='homeForm' onSubmit={handleSubmit}>
                    <div className='home__container'>
                        <label htmlFor='thread'>Title / Description</label>
                        <input
                            type='text'
                            name='thread'
                            required
                            value={threadInput}
                            onChange={(e) => setThreadInput(e.target.value)}                        />
                    </div>
                    <button className='homeBtn'>CREATE THREAD</button>
                </form>
                <div className='thread__container'>
                {threads.map((thread) => (
                    <div className='thread__item' key={thread.id}>
                        <p>{thread.titulo}</p>
                        <div className='react__container'>
                            <Likes userId={userId} thread={thread.id} />
                            <Comments
                                threadId={thread.id}
                                title={thread.titulo}
                            />
                        </div>
                    </div>
                ))}
            </div>

            </main>
        </>
    );
};

export default Home;