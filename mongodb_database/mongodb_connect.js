//const mc=require('mongodb').MongoClient;
const {MongoClient,ObjectID}=require('mongodb');
var obj=new ObjectID();
console.log(obj);
//distucturing
// var user={name:"nidhi",age:14};
// var {name}=user;
//console.log(name);
var url = 'mongodb://localhost:27017/std';
MongoClient.connect(url,(err,db)=>
{
    if(err){
        return console.log('not connect');
    }
    console.log('connect');
   // db.collection(' ').insertMany([{name:'ankita',city:'surat'},{name:'hemin',city:'surat'}]);
   // db.collection('user').insertMany([{name:'mohini',city:'surat'},{name:'piku',city:'Navsari'}],(error,result) => {
   //     if(error){
   //         return console.log("Unable to insert ",error);
   //     }
   //     console.log(JSON.stringify(result.ops,undefined,2));
   // })
    db.close();
})