import { createClient } from '@libsql/client'
import dotenv from 'dotenv'

dotenv.config();


const db = createClient({
  url: "libsql://fitai-suppiden.turso.io",
  authToken: process.env.keyTurso
})





 async function  getUserId (email) {
    let result = await db.execute({
      sql: `SELECT * from usersEM where email = ?`,
      args: [email]
      
      
    })
    console.log(result.rows[0])
    return result.rows[0].id
  }

  const id = getUserId("juana88@mailinator.com")
  console.log("blaaaaaaaaaaa", id)
 /* async function create (threadTitle, userId) {
    const generateID = () => Math.random().toString(36).substring(2, 10);
    const  id = generateID();
let result= await db.execute({
  sql: `INSERT INTO new_threads (titulo, userId) VALUES (?, ?)`,
  args: [threadTitle, userId]
});

return result.rows[0]
} 

create('blalba', 25)*/

    


// const insert1 = async (nombre, email) =>{
// const result = await db.execute({
//   sql: `INSERT INTO users (name, email) VALUES (:name, :email)`,
//   args: { name: nombre, email: email }
// })

// return console.log(result.lastInsertRowid)
// };

// insert1("nombreprubea", "emailprueba")



// const insert3 = async (token, validez,userId ) =>{
//   const result = await db.execute({
//     sql: "INSERT INTO tokens2 (token, timestamp, userId) VALUES (?, ?, ?)",
//         args: [token, validez, userId ]
//   })
  
//   return console.log(result.rows[0])
//   };
  


//   const insert4 = async (name, email, password, verified, verificationToken) =>{
//     let result = await db.execute({
//       sql: `INSERT INTO usersEM (name, email, password, verified, verificationToken) VALUES (?, ?, ?, ?, ?)`,
//       args: [name, email, password, verified, verificationToken]
//     });
//     return result.rows[0]
//     }


  

//     const insert5 = async (name, email, pass) =>{
//       let result = await db.execute({
//         sql: `INSERT INTO users (name, email, pass) VALUES (?, ?, ?)`,
//         args: [name, email, pass]
//       });

//       return result.lastInsertRowid
//       }





  //  let prueba = insert4("prueba", "pruebaemaill1", "pruebapass", 0 , "pruebatoken").then(name =>{
  //   console.log(name.name)
  //  })
  
  // const consulta = async() =>{
  //     let result = await db.execute({
  //       sql: 'SELECT * from usersEM where email = email2'
  //     })

  //     return result.rows[0].email
  //   }

  // consulta().then(email =>{
  //   console.log(email)
  // })




  // const consulta = async () => {
  //   // Asumiendo que estás usando parámetros correctamente y accediendo a los resultados adecuadamente
  //   let emailToSearch = 'email2'; // Este es el email que quieres buscar
  //   let result = await db.execute({
  //     sql: 'SELECT * FROM usersEM WHERE email = :email',
  //     args: { email: emailToSearch }
  //   });
  
  //   return result.rows[0].email; // Asegúrate de que este acceso a los resultados es correcto según tu biblioteca de base de datos
  // };
  
  // // Luego, llamar a consulta
  // consulta().then(email => {
  //   console.log(email);
  // }).catch(error => {
  //   console.error('Error:', error);
  //});
   //let token = await insert5("nombre", "email", "pass")
//    insert4("pruebaToken1", "email10", "pass", 0, "token").then(token => {
//     insert3("token", 3242, token);
// });










// const transporter = nodemailer.createTransport({
//   service: 'gmail', // Cambia esto según tu proveedor de correo electrónico
//   auth: {
//     user: 'tuemail@example.com',
//     pass: 'tucontraseña'
//   }
// });


// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Correo enviado: ' + info.response);
//   }
// });


// let transporter1 = nodemailer.createTransport({
//     host: 'smtp.gmail.com', // Ejemplo: smtp.ejemplo.com
//     port: 587, // El puerto para conexión segura, puede ser 465 para SSL
//     secure: false, // true para 465, false para otros puertos
//     auth: {
//         user: 'abastospruebajon@gmail.com', // Tu usuario SMTP
//         pass: 'jsdg nxpf vuhi xesd', // Tu contraseña SMTP
//     },
//     tls: {
//         // No fallar en certificados inválidos (esto es un ejemplo, en producción deberías tenerlo en true)
//         rejectUnauthorized: false
//     }
// });

// // Opciones del correo electrónico
// let mailOptions = {
//     from: '"Fitai" abastospruebajon@gmail.com', // Dirección del remitente
//     to: 'juan2@mailinator.com', // Lista de destinatarios
//     subject: 'Asunto del correo', // Asunto
//     text: 'Hola mundo?', // cuerpo del correo en texto plano
//     html: '<b>Hola mundo?</b>' // cuerpo del correo en HTML
// };

// // Enviar el correo electrónico
// transporter1.sendMail(mailOptions, (error, info) => {
//     if (error) {
//         return console.log(error);
//     }
//     console.log('Mensaje enviado: %s', info.messageId);
//     // Preview only available when sending through an Ethereal account
//     console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
// });



// const sendMail = (verificationUrl, email) => {
//   let transporter1 = nodemailer.createTransport({
//     host: 'smtp.gmail.com', // Ejemplo: smtp.ejemplo.com
//     port: 587, // El puerto para conexión segura, puede ser 465 para SSL
//     secure: false, // true para 465, false para otros puertos
//     auth: {
//         user: 'abastospruebajon@gmail.com', // Tu usuario SMTP
//         pass: 'jsdg nxpf vuhi xesd', // Tu contraseña SMTP
//     },
//     tls: {
//         // No fallar en certificados inválidos (esto es un ejemplo, en producción deberías tenerlo en true)
//         rejectUnauthorized: false
//     }
//   });
  
//   // Opciones del correo electrónico
//   let mailOptions = {
//     from: '"Fitai" abastospruebajon@gmail.com', // Dirección del remitente
//     to: email, // Lista de destinatarios
//     subject: 'Verifica tu cuenta', // Asunto // cuerpo del correo en texto plano
//     html: `<p>Haz clic en el siguiente enlace para verificar tu cuenta: <a href="${verificationUrl}">${verificationUrl}</a></p>` // cuerpo del correo en HTML
//   };
  
//   // Enviar el correo electrónico
//   transporter1.sendMail(mailOptions, (error, info) => {
//     if (error) {
//         return console.log(error);
//     }
//     console.log('Mensaje enviado: %s', info.messageId);
//     // Preview only available when sending through an Ethereal account
//     console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
//   });
  
  
//   }
  

//   sendMail("blabla", "juan3@mailinator.com")







console.log(process.env.keyPrueba);

