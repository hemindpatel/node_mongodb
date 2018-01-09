const mongoose=require('mongoose');

var todo=mongoose.model('todo',{
    username:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    }
});

module.exports={todo};