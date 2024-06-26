import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useVerifySession from "./customHooks/useVerifySession";
import useVerifyEmail from "./customHooks/useVerifyEmail";
import useVerifyPago from "./customHooks/useVerifyPago";
import axios from 'axios';
import Nav from './Nav.js';

const Replies = () => {
  const [replyList, setReplyList] = useState([]);
  const [name, setName] = useState('');
  const [reply, setReply] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  console.log('esto es al principio de replies', id);

  const { userId } = useVerifySession();
  const emailError = useVerifyEmail();
  const { userId: pagoUserId, error: pagoError } = useVerifyPago(); // eslint-disable-line no-unused-vars

  const [loading, setLoading] = useState(true); // eslint-disable-line no-unused-vars

  useEffect(() => {
    if (emailError || pagoError) {
      navigate("/");
    } else {
      setLoading(false); // Cambiar el estado de carga a false
    }
  }, [emailError, pagoError, navigate]);

  useEffect(() => {
    const fetchReplies = () => {
      axios.get(`http://localhost:8081/thread/${id}/replies`)
        .then((response) => {
          console.log('estp es en replies', response.data);
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
  };

  return (
    <>
      <Nav userId={!!userId} />
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
                <p style={{ opacity: "0.5" }}></p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Replies;
