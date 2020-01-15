const db = require ('../Config/db');
const bcrypt = require('bcrypt');
salt = bcrypt.genSaltSync(10);


module.exports = {
    loginAdmin: (username, password) => {
           return new Promise((resolve, reject) => {
               db.query('SELECT * FROM admin WHERE username=? AND password=?', [username, password], (err, results) => {
                   if (!err){
                       console.log('data user',results)
                       resolve(results);
                   } else {
                       reject(new Error(err));
                   }
               })
           })
       },


    showAdmin: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM admin`, (err, response) => {
                if (!err) {
                    resolve(response)
                } else {
                    reject(err);
                }
            });
        });
    },
   
    updateAdmin: (body, id) => {
        return new Promise ((resolve, reject) => {
            db.query(`UPDATE admin SET ? WHERE id=?`, [body, id], (err, response) => {
                if(!err) {
                    resolve(response);
                } else {
                    reject(err);
                }
            });
        });
        
    },
    deleteAdmin: id => {
        return new Promise ((resolve, reject) => {
            db.query(`DELETE FROM admin WHERE id=?`, [id], (err, response) => {
                if(!err){
                    resolve(response)
                } else {
                    reject(err);
                }
            });
        });
    },
}

