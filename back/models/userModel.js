import { createClient } from '@libsql/client';
import bcrypt from 'bcrypt';


const db = createClient({
  url: "libsql://fitai-suppiden.turso.io",
  authToken: process.env.keyTurso
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
    if (result.rows.length > 0) {
      return result.rows[0].password;
    } else {
      return null;
    }
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



  getUserName = async(id) => {
    let result = await db.execute({
      sql: `SELECT * from usersEM where id = (:id)`,
      args: { id: id}
      
      
    })
    return result.rows[0].name
  }
  
  
  
  async comprobarUser(user, pass) {
    const passw = await this.getPass(user);
    if (passw) {
      const result = await bcrypt.compare(pass, passw);
      return result;
    } else {
      console.log("Introduce contraseña");
      return false;
    }
  }



  activacion = async(id_user) => {
    let result = await db.execute({
      sql: `UPDATE usersEM SET verified = 1 WHERE id = (:id_user)`,
      args: { id_user: id_user }
    });
    return result.rowsAffected > 0 ;
  }
  

getVerificacion = async(id) => {
  let result = await db.execute({
    sql: `SELECT verified from usersEM where id = (:id)`,
    args: { id: id}
    
    
  })
  return result.rows[0]
}


getPago = async(id) => {
  let result = await db.execute({
    sql: `SELECT verificationToken from usersEM where id = (:id)`,
    args: { id: id}
    
    
  })
  console.log(result, "esto es en userModel getPago")
  return result.rows[0]
}


activacionPago = async (id_user, pago) => {
  console.log("esto es en user model activacionPAgo", pago, id_user )
  let result = await db.execute({
    sql: "UPDATE usersEM SET verificationToken = (:pago) WHERE id = (:id_user)",
    args: { id_user: id_user, pago: pago }
  });
  return result.rowsAffected > 0;
}


}