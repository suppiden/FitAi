import { createClient } from '@libsql/client';


const db = createClient({
  url: "libsql://fitai-suppiden.turso.io",
  authToken: process.env.keyTurso
})

export class Threads{

  constructor(){}

  // async create(threadTitle, userId) {
  //   // Insertar el nuevo thread en la base de datos
  //   const result = await db.execute('INSERT INTO threads (title, userId) VALUES ($1, $2) RETURNING *', [threadTitle, userId]);
  //   return result.rows[0];
  // }


  create = async (threadTitle, userId) =>{
    const generateID = () => Math.random().toString(36).substring(2, 10);
    const  id = generateID();
let result= await db.execute({
  sql: `INSERT INTO new_threads (titulo, userId) VALUES (?, ?)`,
  args: [threadTitle, userId]
});

return result.rows[0]
} 

getAll =async () => {
    // Obtener todos los threads de la base de datos
    const result = await db.execute('SELECT * FROM new_threads ORDER BY created_at DESC');
    return result.rows;
  } 
  

}
