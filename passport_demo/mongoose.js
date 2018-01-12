
var mongoose=require('mongoose');

var url = 'mongodb://hemin:lanetteam1@cluster0-shard-00-00-ic6wh.mongodb.net:27017,cluster0-shard-00-01-ic6wh.mongodb.net:27017,cluster0-shard-00-02-ic6wh.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';

mongoose.connect(url).then((res)=>{console.log("connected")}).catch((err)=>{console.log(err);});
module.exports = {mongoose}
