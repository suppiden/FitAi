import { Likes } from "../models/likesModel.js";

const likes = new Likes();

export const manejoLikes = (req, res) => {

  const {thread, userId} = req.body;

  console.log('has llegado hasta el manejo de likes')
  console.log('has llegado hasta el manejo de likesthread', thread)
  console.log('has llegado hasta el manejo de user', userId)

  
  if(likes.addLike(thread, userId)){
    const numeroLikes = likes.countLikesByThreadId(thread)
    return res.json({
      success: true,
      numLikes: numeroLikes,
      message: 'Le has dado a like!'
    })
  }else{
    return res.json({
      error_message: 'no pudiste likear'
    })
  }

}


export const likeThread = async(req, res) =>{

  console.log('esto es en likeThread', req.body)
  const {thread, userId} = req.body;
  console.log(thread, userId, 'bu')

  if(likes.addLike(thread, userId)){
    res.json({
        success: true,
        message: 'You liked the message!'
    });
  }
}



export const getLikes = async(req, res) => {
  const { id } = req.params; // Ahora estamos obteniendo el id de req.params

  try {
    const NumOfLikes = await likes.countLikesByThreadId(id) // Asumiendo que esto devuelve una promesa
    if(NumOfLikes !== undefined) {
      res.json({ 
        NumOfLikes});

    } else {
      res.status(404).json({ message: "No se encontraron respuestas" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}
