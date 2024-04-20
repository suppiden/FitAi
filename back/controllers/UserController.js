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


export const login = async(req, res) =>{
    const User = new UserModel();
    try{
      let comprobacion = User.comprobarUser(req.body.email, req.body.pass)
      if(comprobacion){
      req.session.usuarioId= await User.getUserId(req.body.email);
       res.json({success: true, message: 'Login completado', userId: 'joya' });
      }else{
       console.log("algo ha pasado")
      }
     }catch(e){
       console.log(e)
     }
   
}


 


