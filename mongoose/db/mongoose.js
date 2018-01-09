const mongoose1=require('mongoose');

// mongoose.Promise=globle.Promise;
mongoose1.connect('mongodb://hemin:lanetteam1@cluster0-shard-00-00-ic6wh.mongodb.net:27017,cluster0-shard-00-01-ic6wh.mongodb.net:27017,cluster0-shard-00-02-ic6wh.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin',err => {
    if(err)
        console.log('unable to connect mongoose');
    else
        console.log('mongoose db connected');
});

module.exports={mongoose1};