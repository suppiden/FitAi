

import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import  Likes  from "./Likes";
import  Comments  from "./Comments"
import './forum.css'
import useVerifySession from "./customHooks/useVerifySession";
import useVerifyEmail from "./customHooks/useVerifyEmail";
import useVerifyPago from "./customHooks/useVerifyPago";

const Home = () => {
    const navigate = useNavigate()
    const [userId, setUserId] = useState('')
    const [threads, setThreads] = useState([]);
const [threadInput, setThreadInput] = useState('');
    const { verified } = useVerifySession();
    const emailError = useVerifyEmail();
    const { userId: pagoUserId, error: pagoError } = useVerifyPago();
    const [loading, setLoading] = useState(true); // Estado de carga
    const [name, setName] = useState('');


   


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

    

    useEffect(() => {
      const fetchThreads = async () => {
        axios.get("http://localhost:8081/create/thread", {

      })
      .then((response) => {
          // Acceso directo a response.data en lugar de response.json()
          setThreads(response.data.allThreads);
          console.log(response.data.allThreads)
      })
      };
  
      fetchThreads();
    }, [navigate]);

    useEffect(() => {
      let isMounted = true;

      const fetchUser = async () => {
          try {
              const response = await axios.get("http://localhost:8081/user");
              if (isMounted) {
                  setName(response.data.name);
                  console.log(response.data.name);
              }
          } catch (error) {
              console.error('Error fetching user data:', error);
          } finally {
              setLoading(false); // Cambiar el estado de carga a false
          }
      };

      fetchUser();

      return () => {
          isMounted = false;
      };
  }, []);

  const error = emailError || pagoError;

  useEffect(() => {
      if (emailError || pagoError) {
          navigate("/");
      } else {
          setLoading(false); // Cambiar el estado de carga a false
      }
  }, [emailError, pagoError, navigate]);
    



    const createThread = (thread, userId) => {
        axios.post("http://localhost:8081/create/thread", {
            thread,
            userId,
        })
        .then((response) => {
            // Acceso directo a response.data en lugar de response.json()
            /*setThreads(response.data.allThreads);
            console.log(response.data.allThreads)*/
        })
        .catch((error) => {
            console.error('Error:', error);
            // No olvides manejar los errores de manera que el usuario sepa qué ha ido mal.
        });
      };

 

  


    
    return (
        <>
            <Nav userId={!!userId}/>
            <main className='homeForum'>
                <h2 className='homeTitleForum'>Create a Thread</h2>
                <form className='homeForm' onSubmit={handleSubmit}>
                    <div className='homeContainerForum'>
                        <label htmlFor='thread'>Title / Description</label>
                        <input
                            type='text'
                            name='thread'
                            required
                            value={threadInput}
                            onChange={(e) => setThreadInput(e.target.value)}                        />
                    </div>
                    <button className='homeBtnForum'>CREATE THREAD</button>
                </form>
                <div className='threadContainerForum'>
                {threads.map((thread) => (
                    <div className='threadItemForum' key={thread.id}>
                        <p>{thread.titulo}</p>
                        <div className='reactContainerForum'>
                            <Likes userId={userId} thread={thread.id} />
                            <Comments
                                threadId={thread.id}
                                title={thread.titulo}
                                userId={userId}
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