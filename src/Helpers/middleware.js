require('dotenv').config();
const jwt = require('jsonwebtoken');
const secret = process.env.TOKEN_SECRET;

const auth = {
    verifyToken: (req, res, next) => {
        const bearerHeader = req.headers['authorization'];
        if(bearerHeader !== undefined){
            const bearer = bearerHeader.split(' ');
            const token = bearer[1];
            
            try{
                const data = jwt.verify(token, secret);
                console.log('token', token)
                if(data){
                    req.username = data.username;
                    next();
                }
            } catch (err) {
                console.log(err);
                res.sendStatus(403); 
            }        

        } else {
            console.error('no bearer', bearerHeader)
            res.sendStatus(403);
        }
    },
}