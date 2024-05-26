import  { Replies }  from "../models/repliesModel.js";
import { Novu } from '@novu/node'

const novu = new Novu(process.env.Novu)

const replies = new Replies();



export const replyThread = async(req, res) =>{

  console.log('esto es en replyThread', req.body)
  const {id, userId, reply} = req.body;
  console.log(id, userId)

  if(replies.addReply(id, userId, reply)){
    res.json({
        succes: true,
        message: 'You replied to the message!'
    });
  }
}



export const getReplies = async(req, res) => {
  console.log('esto es en getReplues', req.params)
  const { id } = req.params; // Ahora estamos obteniendo el id de req.params

  try {
    console.log("aquiii")
    const NumOfReplies = await replies.countRepliesByThreadId(id); // Asumiendo que esto devuelve una promesa
    const repliesById = await replies.getRepliesById(id); // Asumiendo que esto devuelve una promesa
    console.log('esto en getreplies num',NumOfReplies)
    console.log('esto en getreplies id',repliesById)
    if(NumOfReplies !== undefined) {
      res.json({ 
        NumOfReplies,
        repliesById, 
        message:'you have replied successfully'
      });

    } else {
      res.status(404).json({ message: "No se encontraron respuestas" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}