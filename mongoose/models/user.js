const mongoose = require('mongoose');
const validator=require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var userschema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        minlength:1,
        unique: true,
        validate:{
            validator: validator.isEmail,
            message:'{VALUE} is not a valid email'
        }
    },
    password:{
        type:String,
        require:true,
        minlength:6
    },
    tokens:[{
        access:{
            type:String,
            require:true
        },
        token:{
            type:String,
            require:true
        }
    }]
});

userschema.methods.toJSON = function () {
    var u=this;
    var userobj = u.toObject();

    return _.pick(userobj,['_id','email']);
};

userschema.methods.generateAuthToken =function(){
    var u = this;
    var access = 'auth';
    var token = jwt.sign({_id:u._id.toHexString(),access},'abc123').toString();

    u.tokens.push({access,token});

    return u.save().then(()=>{
        return token;
    });
};

userschema.statics.findByToken = function(token){
    var user = this;
    var decoded ;

    //jwt.verify()
    try{
        decoded = jwt.verify(token,'abc123');
    }catch(e){
        return Promise.reject();
    }

    return user.findOne({
        '_id':decoded._id,
        'tokens.token':token,
        'tokens.access':'auth'
    });
}

var user = mongoose.model('user',userschema);

module.exports={user}