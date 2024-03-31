import { Threads } from "../models/threadsModel";



export const nuevoThreads = async (req, res) => {
  const threadsModel = new Threads();
  const { thread, userId } = req.body;

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

