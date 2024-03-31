import nodemailer from 'nodemailer'
import { body, validationResult } from 'express-validator';

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
  from: '"Fitai" abastospruebajon@gmail.com', // Dirección del remitente
  to: email, // Lista de destinatarios
  subject: 'Verifica tu cuenta', // Asunto // cuerpo del correo en texto plano
  html: `<p>Haz clic en el siguiente enlace para verificar tu cuenta: <a href="${verificationUrl}">${verificationUrl}</a></p>` // cuerpo del correo en HTML
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
      res.json({ authenticated: false });
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





