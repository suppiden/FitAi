import { Likes } from "../models/likesModel.js";

const likes = new Likes();

export const manejoLikes = (req, res) => {

  const {thread, userId} = req.body;

  console.log('has llegado hasta el manejo de likes')
  console.log('has llegado hasta el manejo de likesthread', thread)
  console.log('has llegado hasta el manejo de user', userId)

  
  if(likes.addLike(10, 25)){
    const numeroLikes = likes.countLikesByThreadId(thread)
    return res.json({
      succes: true,
      numLikes: numeroLikes,
      message: 'Le has dado a like!'
    })
  }else{
    return res.json({
      error_message: 'no pudiste likear'
    })
  }

}

