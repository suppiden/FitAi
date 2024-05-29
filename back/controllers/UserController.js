import { v4 as uuidv4 } from 'uuid';
import { Modelo } from '../models/model.js';
import { UserModel } from '../models/userModel.js';
import bcrypt from 'bcrypt'
import { Token } from '../models/token.js';
import { TokenController } from './TokenController.js';
const saltRounds = 10
const pass = ''

import { Novu } from '@novu/node'

const novu = new Novu(process.env.Novu)

// Para generar un token único

// Configura tu transporte de nodemailer


export const registro = async (req, res) =>{
  const User = new UserModel();
  const resultado = {success: false, message: ''}
   const token = new Token();
    const verificationToken = uuidv4(); // Genera un token único 
    // URL para el enlace de verificación

    const validez = Date.now() *3600
    
    try{
    
     const hash = await bcrypt.hash(req.body.pass, saltRounds);
     
     const userId= await User.insert(req.body.nombre, req.body.email, hash)
    await novu.subscribers.identify(userId.toString(), { email: req.body.email });
    await token.addToken(verificationToken, validez, userId)
    const tokenControll = new TokenController()
    tokenControll.enviarMail(verificationToken, req.body.email);
    

    return res.json({ success: true, message: 'Email confirmado' });
  } catch (e) {
    console.error(e);
    return res.json({ success: false, message: 'Error durante el proceso de registro' });
  }
}


export const login = async (req, res) => {
  const User = new UserModel();
  try {
    const comprobacion = await User.comprobarUser(req.body.email, req.body.pass);
    if (comprobacion) {
      req.session.usuarioId = await User.getUserId(req.body.email);
      res.json({ success: true, message: 'Login completado', userId: req.session.usuarioId });
    } else {
      res.json({ success: false, message: 'Contraseña incorrecta' });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
};
   



export const nameUser = async(req, res) =>{
  const User = new UserModel();
  try{
    if (!req.session.usuarioId) {
      return res.json({ success: false, message: "No autenticado" });
  }
    let name = await User.getUserName(req.session.usuarioId)
  
     res.json({success: true, name: name});
    
   }catch(e){
     console.log(e)
   }
 
  
}


export const verificationEmail = async (req, res) => {
  const User = new UserModel();
  try {
      if (!req.session.usuarioId) {
          return res.json({ success: false, message: "No autenticado" });
      }
      console.log("esto es en verificationEmail", req.session.usuarioId);
      let verify = await User.getVerificacion(req.session.usuarioId);
      console.log("esto es verify de email", verify.verified);
      res.json({ success: verify.verified !== 0 });
  } catch (e) {
      console.log(e);
      res.status(500).json({ success: false, message: "Error en el servidor" });
  }
}



export const verificationPago = async (req, res) => {
  const User = new UserModel();
  try {
      if (!req.session.usuarioId) {
          return res.json({ success: false, message: "No autenticado" });
      }
      console.log("esto es en verificationPago", req.session.usuarioId);
      let pago = await User.getPago(req.session.usuarioId);
      console.log(pago.verificationToken, "esto es en userController en verification pago");
      res.json({ success: pago.verificationToken != null });
  } catch (e) {
      console.log(e);
      res.status(500).json({ success: false, message: "Error en el servidor" });
  }
}



   export const activacionPago = async(req, res) =>{
    const User = new UserModel();
    try{
      console.log(req.session.usuarioId, "esto es activacion pago" )
      let pago = await User.activacionPago(req.session.usuarioId, req.body.price)
      if(pago !=0){
       res.json({success: true});
      }else{
        res.json({success: false});
      }
     }catch(e){
       console.log(e)
     }



    
 
}







 


