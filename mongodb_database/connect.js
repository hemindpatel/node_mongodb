const MongoClient=require('mongodb').MongoClient;
//const {MongoClient,ObjectID}=require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    const con=client.db("TodoApp");

    // con.collection('Todos').insertOne({
    //     text:'walking',
    //     completed:true
    // },(err,result)=>{
    //     if(err){
    //         return console.log('Unable to inset models',err);
    //     }
    //     console.log(JSON.stringify(result.ops,undefined,2));
    // });

    con.collection('Todos').insertMany([{
        text:'walking',
        completed:true
    },{
        text:'baba',
        completed:false
    }],(err,result)=>{
        if(err){
            return console.log('Unable to inset models',err);
        }
        console.log(JSON.stringify(result.ops,undefined,2));
    });


    // con.collection('Users').insertOne({
    //     name:"Hardik Patel",
    //     age:22,
    //     location:"Songadh"
    // },(err,result)=>{
    //     if(err){
    //         return console.log("Unable to add new user,",err);
    //     }
    //     console.log(JSON.stringify(result.ops,undefined,2));
    // });

    client.close();
});