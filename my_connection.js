const MongoClient=require('mongodb').MongoClient;
MongoClient.connect('mongodb://hemin:lanetteam1@cluster0-shard-00-00-ic6wh.mongodb.net:27017,cluster0-shard-00-01-ic6wh.mongodb.net:27017,cluster0-shard-00-02-ic6wh.mongodb.net:27017/admin?replicaSet=Cluster0-shard-0&ssl=true',(err,client)=>{
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const con=client.db("mydb");

    //insert many
    con.collection('user').insertMany([{
        username:'abc',
        password:'a'
    },{
        username:'abcd',
        password:'ab'
    }],(err,result)=>{
        if(err){
            return console.log('Unable to inset models',err);
        }
        console.log(JSON.stringify(result.ops,undefined,2));
    });
    client.close();
});