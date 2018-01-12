var mongoose=require("mongoose");
var db=require("../passport_demo/mongoose");

var UserDetail = new mongoose.Schema({
    email:String,
    password: String
});
//const user = mongoose.model('users', UserDetail);
const user = mongoose.model('users', UserDetail);

//user.find().then((res)=>{console.log(res)});
module.exports={user}