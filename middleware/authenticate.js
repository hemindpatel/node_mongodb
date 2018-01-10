var {user} = require('./../mongoose/models/user');

var authenticate = (req,res,next)=>{
    var token = req.header('x-auth');

    user.findByToken(token).then((u1)=>{
        if(!u1){
            return Promise.reject();
        }
        req.user = user;
        req.token = token;
        next();
    }).catch((e)=>{
        res.status(401).send();
    });
};

module.exports={authenticate}