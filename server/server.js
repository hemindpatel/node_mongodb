const express=require("express");
var app=express();
app.get('/',(req,res)=>{
   res.status(404).send({
       error:"page not found",
       name:"app"
   });
});
app.get("/users",(req,res)=>{
   res.send([{
      name:"hemin",
       age:22
   },{
      name:"vruti",
       age:23
   }])
});


app.listen(8080);
module.exports.app=app;