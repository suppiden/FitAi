 import { createSession } from './payment.controller.js';
import express, { json } from 'express';
import cors from 'cors';
import { recuperarIdSesion, validarSesion,
   validateAndSanitize, respondeThread, respuestas, registrarTopico, handler, prueba } from './libs/utils.js';
import { TokenController } from './controllers/TokenController.js';
import { getLikes, likeThread, manejoLikes } from './controllers/LikesController.js';
import { activacionPago, nameUser, registro, verificationEmail, verificationPago } from './controllers/UserController.js';
import { login } from './controllers/UserController.js';
import { allThreads, nuevoThreads } from './controllers/ThreadController.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { getReplies, replyThread } from './controllers/RepliesController.js';
import { Novu } from '@novu/node';
import http from 'http';









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


app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send({ error: "No se pudo cerrar la sesión correctamente." });
    }
    res.clearCookie('connect.sid', { path: '/' }); // Asegúrate de que el nombre de la cookie y la ruta coincidan con tu configuración.
    return res.send({ message: "Sesión cerrada correctamente." });
  });
});


 app.post('/pago', createSession)

 app.get('/validarSesion', validarSesion);

 app.get('/validarEmail', verificationEmail );

 app.get('/validarPago', verificationPago);

 app.post('/activarPago', activacionPago);

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

app.get('/user', nameUser)

 app.post("/create/thread", nuevoThreads);

 app.get("/create/thread", allThreads);

 //app.post("/thread/like", manejoLikes);

 app.post("/thread/reply", replyThread );

 app.post("/thread/:id/replies", replyThread );

// Cambia la ruta para incluir el parámetro `id`
app.get("/thread/:id/replies", getReplies);

app.get("/thread/:id/likes", getLikes);

app.post("/thread/:id/likes", likeThread);



app.post("/registerTopic", registrarTopico);











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


  // curl -X GET http://10.39.39.194:1234/v1/models
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



app.listen('8081', ()=>{
console.log('funciona')
}) 