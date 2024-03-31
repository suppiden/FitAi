import { createClient } from '@libsql/client';
import bcrypt from 'bcrypt';

export const db = createClient({
  url: "libsql://prueba-suppiden.turso.io",
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MTA3ODU2MjEsImlkIjoiMTFlZTg4ZjItYmZkZS00NTUxLWE4YjUtMDgyNjcyN2RhNzdkIn0.GPxzS-ONyY7TNPuqnM-lB9BN83nQGT-uIDUmU5EkU6TOsHYFb1m49zYNk6X8JZVf3uVxMSmCQoeeD6z4_0q6Aw"
})


export class Modelo{

  constructor(){}

  



// insert = async (nombre, email, pass) =>{
//   console.log('\n esto son depurados', nombre, email)
// let result = await db.execute({
//   sql: `INSERT INTO users (name, email, pass) VALUES (:name, :email, :pass)`,
//   args: { name: nombre, email: email, pass: pass }
// })

// }
insert = async (nombre, email, pass, verificationToken) =>{
await db.execute({
  sql: `INSERT INTO users (name, email, password, verificationToken) VALUES (?, ?, ?, ?)`,
  args: { name: nombre, email: email, pass: pass, verificationToken: verificationToken }
});
}


insertPass = async (pass) =>{
let result = await db.execute({
  sql: `INSERT INTO users (pass) VALUES (:pass)`,
  args: { pass: pass}
})

}

getPass = async(user) => {
  let result = await db.execute({
    sql: `SELECT * from users where email = (:user)`,
    args: { user: user}
    
    
  })
  return result.rows[0].pass
}


comprobarUSer = async(user, pass) => {

 let passw = this.getPass(user)

  if(passw){
    bcrypt.compare(pass, passw, function(err, result) {
      if(result) {
        return true;
      } else {
        return false
      }
      
    });
  }else{
    console.log("introduce contraseña")
    return false
  }
}
}




