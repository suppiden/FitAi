import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import useVerifySession from "./customHooks/useVerifySession";
import useVerifyEmail from "./customHooks/useVerifyEmail";
import useVerifyPago from "./customHooks/useVerifyPago";
import Nav from './Nav';
import ClipLoader from "react-spinners/ClipLoader"; // Importa el spinner

function ChatComponent() {
  const navigate = useNavigate();
  const [newMessage, setNewMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const { userId } = useVerifySession();
  const emailError = useVerifyEmail(userId);
  const { userId: pagoUserId, error: pagoError } = useVerifyPago(userId); // eslint-disable-line no-unused-vars
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
      if (emailError || pagoError) {
          navigate("/");
      } else {
          setLoading(false); // Cambiar el estado de carga a false
      }
  }, [emailError, pagoError, navigate]);

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userMessage = newMessage.trim();

    // Verifica si el mensaje del usuario no está vacío
    if (!userMessage) return;

    const messagesToSend = [
      { "role": "system", "content": "You're a helpful coding assistant." },
      { "role": "user", "content": userMessage }
    ];

    // Agrega el mensaje del usuario a la conversación inmediatamente
    setConversation(conversation => [...conversation, { type: 'user', text: userMessage }]);
    setNewMessage(''); // Limpiar el campo de entrada

    try {
      const response = await fetch('http://localhost:8081/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: messagesToSend }),
      });
      const data = await response.json();
      console.log(data);
      const botResponse = data.content || "Lo siento, no pude obtener una respuesta.";
      setConversation(conversation => [...conversation, { type: 'bot', text: botResponse }]);
    } catch (error) {
      console.error('Error al obtener la respuesta:', error);
      setConversation(conversation => [...conversation, { type: 'bot', text: "Error al procesar tu solicitud. Inténtalo de nuevo más tarde." }]);
    }
  };

  if (loading) {
    return (
      <div className="spinner-container">
        <ClipLoader size={50} color={"#123abc"} loading={loading} />
      </div>
    );
  }

  return (
    <div>
      <Nav userId={!!userId}/>
      <div id="conversation" style={{ height: '90vh', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px', marginBottom: '10px', borderTop: 'none' }}>
        {conversation.map((message, index) => (
          <div key={index} style={{ textAlign: message.type === 'bot' ? 'left' : 'right' }}>
            <p style={{
              background: message.type === 'bot' ? '#f1f0f0' : '#6ca26b',
              color: message.type === 'bot' ? 'black' : 'white',
              display: 'inline-block',
              padding: '5px 10px',
              borderRadius: '20px',
              borderTopRightRadius: message.type === 'user' ? '0' : '20px',
              borderTopLeftRadius: message.type === 'bot' ? '0' : '20px',
              margin: '10px',
              marginTop: '5vh'
            }}>
              {message.text}
            </p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newMessage}
          onChange={handleInputChange}
          placeholder="Escribe tu mensaje aquí..."
          style={{ width: 'calc(100% - 110px)', marginRight: '10px' }}
        />
        <button type="submit" style={{ backgroundColor: '#6ca26b', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '5px' }}>Enviar</button>
      </form>
    </div>
  );
}

export default ChatComponent;
