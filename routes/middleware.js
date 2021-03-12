const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require('../config');

module.exports = (req, res, next) =>{
    
    const authHeader = req.headers['authorization'];
    const header = authHeader.split(' ')
    const token = header[1];
    if(token === null) res.sendStatus(401)

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if(err) return res.sendStatus(403)
        req.user = user
        console.log(req.user);
        next();
    })
}
