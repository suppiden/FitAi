import {sendMail} from '../libs/utils.js'
import { Token } from '../models/token.js';
import { UserModel } from '../models/userModel.js';

export class TokenController{

  constructor(){}


  enviarMail = (verificationToken, mail) =>{

    const verificationUrl = `http://localhost:8081/verify?token=${verificationToken}`;
  
  sendMail(verificationUrl, mail)

  }


   confirmarToken = async (req, res) => {
    try {
      const token1 = new Token();
      // Primero, obtenemos el ID del usuario asociado con el token
      const idUser = await token1.getTokenUser(req.query.token);
      console.log(req.query.token)
  
      if (idUser) {
        console.log(idUser)
        const user = new UserModel();
  
        // Intentamos activar el usuario
        const activacionExitosa = await user.activacion(idUser);
  
        if (activacionExitosa) {
          // Si la activación fue exitosa, procedemos a borrar el token
          await token1.deleteToken(req.query.token);
          return res.json({ success: true, message: 'Email confirmado' });
        } else {
          // La activación falló por alguna razón
          return res.json({ success: false, message: 'La activación ha fallado' });
        }
      } else {
        // No se encontró el usuario para el token dado
        return res.json({ success: false, message: 'Token inválido o no encontrado' });
      }
    } catch (error) {
      console.error('Error confirmando token:', error);
      return res.json({ success: false, message: 'Error durante la confirmación del token' });
    }
  };
  
}