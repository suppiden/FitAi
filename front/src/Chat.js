import React, { useState } from 'react';

function ChatComponent() {
  const [newMessage, setNewMessage] = useState('');
  const [conversation, setConversation] = useState([]);

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userMessage = newMessage.trim();

    // Verifica si el mensaje del usuario no está vacío
    if (!userMessage) return;

    const messagesToSend = [
      { "role": "system", "content": "You're a helpful coding assistant." }, // Esto se puede ajustar según el contexto de tu aplicación
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
        // Corrección aquí: cambia 'prompt' por 'messages' y envía como array
        body: JSON.stringify({ messages: messagesToSend }),
      });
      const data = await response.json();
      console.log(data)
      // Asume que data.choices es un array con la respuesta y la extrae adecuadamente
      const botResponse = data.content|| "Lo siento, no pude obtener una respuesta.";
      setConversation(conversation => [...conversation, { type: 'bot', text: botResponse }]);
    } catch (error) {
      console.error('Error al obtener la respuesta:', error);
      setConversation(conversation => [...conversation, { type: 'bot', text: "Error al procesar tu solicitud. Inténtalo de nuevo más tarde." }]);
    }
};

  return (
    <div>
      <div id="conversation" style={{ height: '90vh', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
        {conversation.map((message, index) => (
          <div key={index} style={{ textAlign: message.type === 'bot' ? 'left' : 'right' }}>
            <p style={{ background: message.type === 'bot' ? '#f1f0f0' : '#007bff', color: message.type === 'bot' ? 'black' : 'white', display: 'inline-block', padding: '5px 10px', borderRadius: '20px' }}>
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
        <button type="submit" style={{ width: '100px' }}>Enviar</button>
      </form>
    </div>
  );
}

export default ChatComponent;