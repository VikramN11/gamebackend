const jwt = require("jsonwebtoken");

const authentication = (req, res, next) =>{
    const token = req.headers.Authorization;
    jwt.verify(token, 'chidiyaudd', (err, decoded)=>{
        if(decoded){
            // req.body.user=decoded.userID;
            next();
        }
        else{
            res.send("Please login")
        }
      });
}

module.exports = {authentication};