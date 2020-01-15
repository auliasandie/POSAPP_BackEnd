const db = require ('../Config/db');

module.exports = {
    getCategory: (req) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM category', (err, response) => {
                if (!err) {
                    resolve(response);
                } else {
                    reject(err);
                }
            })
        })
    },
    getCategoryById: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM category WHERE id= ?`, [id], (err, response)=> {
                if (!err) {
                    resolve(response);
                } else {
                    reject (err);
                }
            });

        })
    },
    addCategory: (body) => {
        console.log('ini body', body)
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO category SET ?`, [body], (err, response)=> {
                if (!err) {
                    resolve(response);
                } else {
                    reject (err);
                }
            })
        })
    },
    updateCategory: (body, id) => {
        console.log('CEKKKK', body, id)
        return new Promise((resolve, reject) => {
            db.query(`UPDATE category SET name=?, updated_at=? WHERE id=?`, [body.name, body.updated_at,id], (err, response) => {
                if (!err) {
                    resolve(response);
                } else {
                    reject (err);
                }
            })
        })
    },
    deleteCategory: id => {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM category WHERE id=?`, [id], (err, response) => {
                if (!err) {
                    resolve(response);
                } else {
                    reject (err);
                }
            })
        })
    }
}