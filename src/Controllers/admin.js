const adminModel = require("../Models/admin")
const formRes = require ("../Helpers/formRes");
bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'),
secretKey = process.env.TOKEN_SECRET|| '261011'



module.exports= {
   
    loginAdmin: (req, res) => {
      console.log('body',req.body)
      const username = req.body.username;
      const password = (req.body.password)
      console.log('login', username, '', password);
      adminModel .loginAdmin(username, password)
      .then(results => {
      console.log('LOGIIIN', results)
        if(results.length !==0) {
          const payload = { ...results[0], expiresIn: '1h'};
          
          jwt.sign(payload, secretKey, (err, token) => {
            console.log(payload, 'payloaddd')
            
            if(err) {
              console.log(err, 'error')
            }
            // res.header("Access-Control-Allow-Origin", "*");
            res.setHeader('Authorization', `Bearer ${token}`);
            console.log('result hasil',results[0])
            console.log('ini token', token)
            return res.json({
              data : results,
              token
              
            })
            })
                
        } else  {
          const data = {
            user: null,
            token: null
          }
          formRes.success(res, 401, {error: 'Wrong username or password!'}, data)
        }
      })
      .catch(error => {console.log('res', error); res.json(error)})
    },


    showAdmin: (req, res) => {
        adminModel
        .showAdmin()
        .then(response => formRes.showAdminRes(res, response, 200))
        .catch(err => console.log(err))
    },
    updateAdmin: (req, res) => {
        var date = new Date();
        const id = req.query.id;
        const body = {
          ...req.body,
          updated_at: date
        };
        console.log(body);
        adminModel
          .updateAdmin(body, id)
          .then(response => formRes.updateAdminRes(res, response, 200))
          .catch(err => console.log(err));
      },
      deleteAdmin: (req, res) => {
        const id = req.query.id;
        adminModel
          .deleteAdmin(id)
          .then(response => formRes.deleteAdminRes(res, response, 200))
          .catch(err => console.log(err));
      }
}

