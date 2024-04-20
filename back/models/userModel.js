import { createClient } from '@libsql/client';
import bcrypt from 'bcrypt';


const db = createClient({
  url: "libsql://prueba-suppiden.turso.io",
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MTA3ODU2MjEsImlkIjoiMTFlZTg4ZjItYmZkZS00NTUxLWE4YjUtMDgyNjcyN2RhNzdkIn0.GPxzS-ONyY7TNPuqnM-lB9BN83nQGT-uIDUmU5EkU6TOsHYFb1m49zYNk6X8JZVf3uVxMSmCQoeeD6z4_0q6Aw"
})


export class UserModel{
constructor(){}


insert = async (nombre, email, pass) =>{
  let result = await db.execute({
    sql: `INSERT INTO usersEM (name, email, password) VALUES (?, ?, ?)`,
    args: [nombre, email, pass]
  });

  return result.lastInsertRowid
  }
  
  
  insertPass = async (pass) =>{
  let result = await db.execute({
    sql: `INSERT INTO usersEM (pass) VALUES (:pass)`,
    args: { pass: pass}
  })
  
  }
  
  getPass = async(user) => {
    let result = await db.execute({
      sql: `SELECT * from usersEM where email = (:user)`,
      args: { user: user}
      
      
    })
    return result.rows[0].password
  }

  // getUserId = async(email) => {
  //   let result = await db.execute({
  //     sql: `SELECT * from usersEM where email = (:email)`,
  //     args: { email: email}
      
      
  //   })
  //   return result.rows[0].id
  // }

  getUserId = async(email) => {
    let result = await db.execute({
      sql: `SELECT * from usersEM where email = (:email)`,
      args: { email: email}
      
      
    })
    return result.rows[0].id
  }
  
  
  
  comprobarUser = async(user, pass) => {
  
   let passw = this.getPass(user)
    if(passw){
      bcrypt.compare(pass, passw, function(err, result) {
        if(result) {
          return true;
        } else {
          return false;
        }
        
      });
    }else{
      console.log("introduce contraseña")
      return false
    }
  }


  activacion = async(id_user) => {
    let result = await db.execute({
      sql: `UPDATE usersEM SET verified = 1 WHERE id = (:id_user)`,
      args: { id_user: id_user }
    });
    return result.rowsAffected > 0 ;
  }
  

}

