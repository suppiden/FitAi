import { Threads }  from "../models/threadsModel.js";
import { Likes } from "../models/likesModel.js";
import { Replies } from "../models/repliesModel.js";
import { Novu } from '@novu/node'

const novu = new Novu(process.env.Novu)

const threadsModel = new Threads();
const repliesModel = new Replies();


export const nuevoThreads = async (req, res) => {
  const threadsModel = new Threads();
  const { thread } = req.body;
  const userId = req.session.usuarioId

  try {
    const newThread = await threadsModel.create(thread, userId);
    const allThreads = await threadsModel.getAll();

    res.json({
      message: "Thread created successfully!",
      newThread,
      allThreads,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred" });
  }
};


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



