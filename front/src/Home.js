import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Likes } from "./Likes";
import { Comments } from "./Comments"

const Home = () => {
    const navigate = useNavigate()
    const [userId, setUserId] = useState(null);
    const [thread, setThread] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();
      if (userId) { // Asegúrate de que userId está disponible
          createThread(thread, userId);
          setThread(""); // Reinicia el estado de tu formulario
      } else {
          console.error('No hay ID de usuario disponible');
          // Manejar adecuadamente, como redirigir al login
      }
  };





    useEffect(() => {
      const verificarSesion = async () => {
        try {
          const response = await axios.get('http://localhost:8081/validarSesion'); // Asume que Axios está configurado globalmente para usar tu base URL
          if (!response.data.authenticated) {
            navigate("/");
          } else {
            console.log("Authenticated");
            setUserId(response.data.userId); 
          }
        } catch (error) {
          console.error('Error verificando la sesión:', error);
          navigate("/"); // Opcional: Redirigir al usuario si hay un error
        }
      };
  
      verificarSesion();
    }, [navigate]);


    const createThread = (thread, userId) => {
      axios.post("http://localhost:4000/create/thread", {
          thread,
          userId,
      })
      .then((response) =>  response.json())
      .then((data) => {
          setThread(data.allThreads)
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
                            value={thread}
                            onChange={(e) => setThread(e.target.value)}
                        />
                    </div>
                    <button className='homeBtn'>CREATE THREAD</button>
                </form>
                <div className='thread__container'>
                {thread.map((thread) => (
                    <div className='thread__item' key={thread.id}>
                        <p>{thread.title}</p>
                        <div className='react__container'>
                            <Likes numberOfLikes={thread.likes.length} threadId={thread.id} />
                            <Comments
                                numberOfComments={thread.replies.length}
                                threadId={thread.id}
                                title={thread.title}
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