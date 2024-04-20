import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios'

const Replies = () => {
    const [replyList, setReplyList] = useState([]);
    const [reply, setReply] = useState("");
    const [title, setTitle] = useState("");
    const[userId, setUserId] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
    console.log('esto es al principio de replies',id)


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
      const fetchReplies = () => {
          axios.get(`http://localhost:8081/thread/${id}/replies`)
          .then((response) => {
            console.log('estp es en replies', response.data)
              const data = response.data;
              setReplyList(data.repliesById);
              setTitle(data.repliesById.content);
          })
          .catch((error) => {
              console.error('Error fetching replies:', error);
              // Aquí puedes manejar el error, por ejemplo, configurando un estado para mostrar un mensaje al usuario.
          });
      }; 
      fetchReplies();
  }, [id]);
    // This function when triggered when we add a new reply
    const addReply = () => {
        axios.post("http://localhost:8081/thread/reply", {
          id,
          userId,
          reply
        })
        .then((res) => {
            alert(res.data.message); // Accede directamente a `res.data` para obtener los datos.
            navigate("/forum");
        })
        .catch((err) => console.error(err));
      };
      
  
  const handleSubmitReply = (e) => {
      e.preventDefault();
      //👇🏻 calls the function
      addReply();
      setReply("");
  }

    return (
      <main className='replies'>
      <h1 className='repliesTitle'>{title}</h1>

      <form className='modal__content' onSubmit={handleSubmitReply}>
          <label htmlFor='reply'>Reply to the thread</label>
          <textarea
              rows={5}
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              type='text'
              name='reply'
              className='modalInput'
          />

          <button className='modalBtn'>SEND</button>
      </form>

      <div className='thread__container'>
          {replyList.map((reply) => (
              <div className='thread__item' key={reply.id}>
                  <p>{reply.content}</p>
                  <div className='react__container'>
                      <p style={{ opacity: "0.5" }}>by {reply.id}</p>
                  </div>
              </div>
          ))}
      </div>
  </main>
    );
};

export default Replies;