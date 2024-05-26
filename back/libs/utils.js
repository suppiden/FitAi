import nodemailer from 'nodemailer'
import { body, validationResult } from 'express-validator';
import { Novu } from '@novu/node'



export const sendMail = (verificationUrl, email) => {
let transporter1 = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Ejemplo: smtp.ejemplo.com
  port: 587, // El puerto para conexión segura, puede ser 465 para SSL
  secure: false, // true para 465, false para otros puertos
  auth: {
      user: 'abastospruebajon@gmail.com', // Tu usuario SMTP
      pass: 'jsdg nxpf vuhi xesd', // Tu contraseña SMTP
  },
  tls: {
      // No fallar en certificados inválidos (esto es un ejemplo, en producción deberías tenerlo en true)
      rejectUnauthorized: false
  }
});

// Opciones del correo electrónico
let mailOptions = {
  from: '"Fitai" <abastospruebajon@gmail.com>', // Dirección del remitente
  to: email, // Lista de destinatarios
  subject: 'Verifica tu cuenta', // Asunto
  html: `
    <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #6ca26b; text-align: center;">Bienvenido a Fitai!</h2>
        <p style="font-size: 16px; line-height: 1.5; color: #555;">
          Gracias por registrarte en Fitai. Estamos encantados de tenerte con nosotros.
        </p>
        <p style="font-size: 16px; line-height: 1.5; color: #555;">
          Por favor, haz clic en el siguiente enlace para verificar tu cuenta:
        </p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="${verificationUrl}" style="display: inline-block; background-color: #6ca26b; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">
            Verificar Cuenta
          </a>
        </div>
        <p style="font-size: 14px; line-height: 1.5; color: #888;">
          Si el enlace no funciona, copia y pega la siguiente URL en tu navegador:
        </p>
        <p style="font-size: 14px; line-height: 1.5; color: #888;">
          <a href="${verificationUrl}" style="color: #6ca26b;">${verificationUrl}</a>
        </p>
        <p style="font-size: 14px; line-height: 1.5; color: #888;">
          Si no te has registrado en Fitai, por favor ignora este correo.
        </p>
        <div style="text-align: center; margin-top: 30px;">
          <img src="https://your-logo-url.com/logo.png" alt="Fitai" style="width: 100px; height: auto;">
        </div>
      </div>
    </div>
  ` // cuerpo del correo en HTML
};

// Enviar el correo electrónico
transporter1.sendMail(mailOptions, (error, info) => {
  if (error) {
      return console.log(error);
  }
  console.log('Mensaje enviado: %s', info.messageId);
  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
});


}


export const validateAndSanitize = [
  body('email')
    .isEmail().withMessage('Must be a valid email')
    .normalizeEmail(), // Middleware para validar y normalizar el email
  body('pass')
    .isLength({ min: 3 }).withMessage('Password must be at least 3 chars long')
    .trim() // Middleware para asegurar una longitud mínima y quitar espacios
    .escape(), // Middleware para escapar caracteres HTML
  (req, res, next) => {
    // Este middleware verifica los resultados de la validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next(); // Si no hay errores, pasa al siguiente middleware/controlador
  }
];

export const validarSesion = (req, res) => {
  if (req.session.usuarioId) {
      res.json({ authenticated: true, userId: req.session.usuarioId });
  } else {
      res.json({ authenticated: false, userId: req.session.usuarioId });
  }
}

export const recuperarIdSesion = (req, res) => {
  if (req.session.userId) {
      res.json({ userId: req.session.userId });
  } else {
      res.status(401).json({ message: "Usuario no autenticado" });
  }
}


export const manejoLikes =  (req, res) => {
  // accepts the post id and the user id
  const { threadId, userId } = req.body;
  // gets the reacted post
  const result = thread.filter((thread) => thread.id === threadId);
  // gets the likes property
  const threadLikes = result[0].likes;
  // authenticates the reaction
  const authenticateReaction = threadLikes.filter((user) => user === userId);
  // adds the users to the likes array
  if (authenticateReaction.length === 0) {
      threadLikes.push(userId);
      return res.json({
          message: "You've reacted to the post!",
      });
  }
  // Returns an error user has reacted to the post earlier
  res.json({
      error_message: "You can only react once!",
  });
}

export const respondeThread = async (req, res) => {
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

  await novu.trigger("topicnotification", {
    to: [{ type: "Topic", topicKey: id }],
});

  res.json({
      message: "Response added successfully!",
  });
}

export const respuestas = (req, res) => {
  // The post ID
  const { id } = req.body;
  // searches for the post
  const result = threadList.filter((thread) => thread.id === id);
  // return the title and replies
  res.json({
      replies: result[0].replies,
      title: result[0].title,
  });
}

export const registrarTopico = async (req, res) => {
  const { email, password, username } = req.body;
  const id = generateID();
  const result = users.filter(
      (user) => user.email === email && user.password === password
  );

  if (result.length === 0) {
      const newUser = { id, email, password, username };
      //👇🏻 add the user as a subscriber
      await novu.subscribers.identify(id, { email: email });

      users.push(newUser);
      return res.json({
          message: "Account created successfully!",
      });
  }
  res.json({
      error_message: "User already exists",
  });
}


export const handler = async(req, res) =>{
  if (req.method === 'GET') {
    console.log('esto es de handler', req.session.usuarioId)
    // Authenticate the user and retrieve the user's unique ID from your database
    const userId = req.session.usuarioId // This should be replaced with actual authentication logic


    // Send the subscriberId back to the client
    res.json({ subscriberId: 'userId',
 });
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}


export const prueba = (req, res) =>{
  
    console.log('getSuscriberId')
    // Asumiendo que la autenticación se maneja y se asigna un usuarioId a la sesión
    if (req.session.usuarioId) {
      console.log('getSuscriberId1')
      res.json({ userId: req.session.usuarioId });
    } else {
      res.status(401).json({ error: "No autenticado" });
    }
  
}


