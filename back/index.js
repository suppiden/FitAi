 import { createSession } from './payment.controller.js';
import express, { json } from 'express';
import cors from 'cors';
import { recuperarIdSesion, validarSesion,
   validateAndSanitize, respondeThread, respuestas, registrarTopico, handler, prueba } from './libs/utils.js';
import { TokenController } from './controllers/TokenController.js';
import { manejoLikes } from './controllers/LikesController.js';
import { registro } from './controllers/UserController.js';
import { login } from './controllers/UserController.js';
import { nuevoThreads } from './controllers/ThreadController.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { getReplies, replyThread } from './controllers/RepliesController.js';
import { Novu } from '@novu/node';
import http from 'http';



const novu = new Novu(process.env.Novu)






 const router = express.Router();
 const TokenCont = new TokenController();
 const saltRounds = 10
 const pass = ''


const app = express();

const corsOptions = {
  origin: 'http://localhost:3000', 
  credentials: true,
};

app.use(cors(corsOptions));
app.use(json())
app.use('/', router)
app.use(cookieParser());
app.use(session({
    secret: 'tuSecreto',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.get('/', (req, res) => {
  res.send('Hello from our server!')
})

//login and auth


app.post('/sesion', validateAndSanitize, registro);

router.get('/verify', TokenCont.confirmarToken);

 app.post('/inicio', login) 

 app.post('/pago', createSession)

 app.get('/validarSesion', validarSesion);

 // Endpoint para obtener el userId
app.get("/get-user-id", (req, res) => {
  // Asumiendo que la autenticación se maneja y se asigna un usuarioId a la sesión
  if (req.session.usuarioId) {
    res.json({ userId: req.session.usuarioId });
  } else {
    res.status(401).json({ error: "No autenticado" });
  }
});


app.get('/getSubscriberId', prueba )



//forum
 app.get("/user/id", recuperarIdSesion);

 app.post("/create/thread", nuevoThreads);

 app.post("/thread/like", manejoLikes);

 app.post("/thread/reply", replyThread );

// Cambia la ruta para incluir el parámetro `id`
app.get("/thread/:id/replies", getReplies);



app.post("/registerTopic", registrarTopico);





// // Esto es opcion 3 para los streams
// app.post('/completions', async (req, res) => {
//   const userMessages = req.body.messages;

//   if (!Array.isArray(userMessages) || userMessages.length === 0) {
//     return res.status(400).send({ error: 'La solicitud debe incluir mensajes.' });
//   }

//   // Prepara la solicitud al servidor de LM Studio
//   const dataString = JSON.stringify({
//     messages: userMessages,
//     temperature: 0.7,
//     max_tokens: -1,
//     stream: true
//   });

//   const options = {
//     hostname: 'localhost',
//     port: 1234,
//     path: '/v1/chat/completions',
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Content-Length': dataString.length
//     }
//   };

//   // Realiza la solicitud y maneja la respuesta como un stream
//   const reqLM = http.request(options, (resLM) => {
//     let fullResponse = ''; // Para almacenar la respuesta completa y verificar errores

//     resLM.on('data', (chunk) => {
//         // Aquí se acumula la respuesta completa para depuración o revisión
//         fullResponse += chunk;

//         // Intenta parsear el chunk y extraer el contenido
//         try {
//             const parsedChunk = JSON.parse(chunk); // Parsea el fragmento como JSON
//             const content = parsedChunk?.choices?.[0]?.delta?.content; // Intenta extraer el contenido
//             if (content) {
//                 // Aquí manejas el contenido, por ejemplo, acumulándolo para enviarlo al cliente
//                 console.log(content); // Muestra o acumula el contenido como necesites
//             }
//         } catch (error) {
//             // Manejar errores de parseo, por ejemplo, si el chunk no es JSON válido
//             console.error("Error parsing chunk:", error);
//         }
//     });

//     resLM.on('end', () => {
//         // Al finalizar, manejas la respuesta completa si es necesario
//         console.log("Full response for review:", fullResponse); // Muestra la respuesta completa para revisión
//         // Aquí enviarías la respuesta procesada al cliente
//     });
// });



//   reqLM.on('error', (e) => {
//     console.error(`Problem with request: ${e.message}`);
//   });

//   // Envía los datos al servidor de LM Studio
//   reqLM.write(dataString);
//   reqLM.end();
// });








//ESTO ES OPCION 4 
app.post('/completions', async (req, res) => {
  const userMessages = req.body.messages;

  if (!Array.isArray(userMessages) || userMessages.length === 0) {
    return res.status(400).send({ error: 'La solicitud debe incluir mensajes.' });
  }

  const dataString = JSON.stringify({
    messages: userMessages,
    temperature: 0.7,
    max_tokens: -1,
    stream: true
  });

  const options = {
    hostname: 'localhost',
    port: 1234,
    path: '/v1/chat/completions',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': dataString.length
    }
  };

  const reqLM = http.request(options, (resLM) => {
    let contentAccumulated = ''; // Para acumular solo el contenido de los mensajes

    resLM.on('data', (chunk) => {
      // Procesa cada chunk como una línea de texto, ignora el prefijo 'data: '
      const strChunk = chunk.toString();
      const jsonData = strChunk.replace('data: ', '');

      try {
        const parsedData = JSON.parse(jsonData);
        const content = parsedData.choices[0].delta.content;
        if (content) {
          contentAccumulated += content + ' '; // Acumula el contenido
        }
      } catch (error) {
        // Omitido el manejo de errores para brevedad
      }
    });

    resLM.on('end', () => {
      // Envía el contenido acumulado como respuesta
      console.log('Contenido acumulado:', contentAccumulated);
      res.send({content: contentAccumulated});
    });
  });

  reqLM.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
  });

  reqLM.write(dataString);
  reqLM.end();
});

// Esto es opcion 2
// app.post('/completions', async (req, res) => {
//   const userMessages = req.body.messages; // Correcto, usa 'messages' directamente

//   if (!Array.isArray(userMessages) || userMessages.length === 0) {
//     return res.status(400).send({ error: 'La solicitud debe incluir mensajes.' });
//   }

//   try {
//     const lmStudioResponse = await fetch('http://localhost:1234/v1/chat/completions', {
//       method: 'POST',
//       headers: {
//           'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         messages: userMessages, // Aquí estaba el error, ahora se pasa correctamente
//         temperature: 0.7,
//         max_tokens: -1,
//         stream: true
//       }),
//     });

//     if (lmStudioResponse.headers.get("content-type")?.includes("application/json")) {
//     const data = await lmStudioResponse.json();
//     res.send(data);
//     }else{
//       console.error('Respuesta no es JSON:', await lmStudioResponse.text());
//   res.status(500).send('Error interno del servidor');
//     }
//   } catch (error) {
//     console.error('Error al solicitar LM Studio:', error);
//     res.status(500).send('Error interno del servidor');
//   }
// });


// ESTO ES OPCION 1
// app.post('/completions', async (req, res) => {
//   const userMessages = req.body.messages; // Esperamos un arreglo de mensajes en la solicitud

//   // Verifica que messages sea un arreglo y no esté vacío
//   if (!Array.isArray(userMessages) || userMessages.length === 0) {
//     return res.status(400).send({ error: 'La solicitud debe incluir mensajes.' });
//   }

//   try {
//     const lmStudioResponse = await fetch('http://localhost:1234/v1/completions', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         messages: userMessages, // Pasa el arreglo de mensajes directamente
//         temperature: 0.7, // Puedes ajustar este valor según tus necesidades
//         max_tokens: -1, // O establece un límite específico de tokens si lo prefieres
//         stream: true // Depende de si quieres recibir la respuesta de manera continua
//       }),
//     });

//     const data = await lmStudioResponse.json();
//     res.send(data);
//   } catch (error) {
//     console.error('Error al solicitar LM Studio:', error);
//     res.status(500).send('Error interno del servidor');
//   }
// });


app.listen('8081', ()=>{
console.log('funciona')
}) 