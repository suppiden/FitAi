 import { createSession } from './payment.controller.js';
import express, { json } from 'express';
import cors from 'cors';
import { manejoLikes, recuperarIdSesion, validarSesion, validateAndSanitize } from './libs/utils.js';
import { TokenController } from './controllers/TokenController.js';
import { registro } from './controllers/UserController.js';
import { login } from './controllers/UserController.js';
import { nuevoThreads } from './controllers/ThreadController.js';



 const router = express.Router();
 const TokenCont = new TokenController();
 const saltRounds = 10
 const pass = ''


const app = express();

app.use(cors())
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



app.post("/create/thread", nuevoThreads);

app.post("/thread/like", manejoLikes);


app.post("/api/create/reply", async (req, res) => {
  //👇🏻 accepts the post id, user id, and reply
  const { id, userId, reply } = req.body;
  //👇🏻 search for the exact post that was replied to
  const result = threadList.filter((thread) => thread.id === id);
  //👇🏻 search for the user via its id
  const user = users.filter((user) => user.id === userId);
  //👇🏻 saves the user name and reply
  result[0].replies.unshift({
      userId: user[0].id,
      name: user[0].username,
      text: reply,
  });

  res.json({
      message: "Response added successfully!",
  });
});

app.post("/thread/replies", (req, res) => {
  // The post ID
  const { id } = req.body;
  // searches for the post
  const result = threadList.filter((thread) => thread.id === id);
  // return the title and replies
  res.json({
      replies: result[0].replies,
      title: result[0].title,
  });
});


app.get('/validarSesion', validarSesion);

app.post('/sesion', validateAndSanitize, registro);

app.get("/api/user/id", recuperarIdSesion);

router.get('/verify', TokenCont.confirmarToken);

app.post('/inicio', login)

app.post('/pago', createSession)

app.listen('8081', ()=>{
console.log('funciona')
})