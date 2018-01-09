//const mc=require('mongodb').MongoClient;
const {MongoClient,ObjectID}=require('mongodb');

var url = 'mongodb://localhost:27017/std';
MongoClient.connect(url,(err,db)=>
{
    if(err){
        return console.log('not connect');
    }
    console.log('connect');
    db.collection('user').find().count().then((count)=>
    {
        console.log(`Todos count ${count}`);
        console.log(JSON.stringify(docs,undefined,2));
    },(err)=>{
        console.log("Unable to fech todos",err);
    });
    db.close();
})