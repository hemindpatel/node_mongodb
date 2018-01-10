require('./config/config');

const _=require('lodash');
const express=require('express');
const bodyParser=require('body-parser');
const {ObjectID} = require('mongodb').ObjectID;

const {mongoose1} = require('./db/mongoose');
const {todos} = require('./models/todo');
const {user} = require('./models/user');
const {authenticate} = require('./../middleware/authenticate');


const app=express();
const port = process.env.PORT || 3000

app.use(bodyParser.json());

console.log('started server.js file');
app.post('/todos',(req,res)=>{
    var todo = new user({
        text: req.body.text
    });

    todo.save().then((doc)=>{
        res.send(doc);
    },(e)=>{
        res.status(400).send(e);
    });
});

app.get('/todos',(req,res)=>{
    todos.find().then((todos)=>{
        res.send({todo});
    },(e)=>{
        res.status(400).send(e);
    });
});

app.get('/todos/:id',(res,req)=>{
    var id=req.params.id;

    if(!ObjectID.$isValid(id)){
        return res.status(404).send();
    }

    todos.findById(id).then((t)=>{
        if(!t){
            return res.status(404).send();
        }
        res.send({t});
    }).catch((e)=>{
        res.status(400).send();
    });
});

app.delete('/todos/:id',(req,res)=>{
    var id=req.params.id;

    if(!ObjectID.$isValid(id)){
        return res.status(404).send();
    }

    todos.findByIdAndRemove(id).then((t)=>{
        if(!t){
            return res.status(404).send();
        }
        res.send({t});
    }).catch((e)=>{
        res.status(400).send();
    });
});

app.patch('/todos/:id',(res,req)=>{
    var id = req.params.id;
    var body = _.pick(req.body,['text','completed']);

    if(!ObjectID.$isValid(id)){
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed)
    {
        body.completedAt = new Date().getTime();
    }
    else
    {
        body.completed=false;
        body.completedAt=null;
    }

    todos.findByIdAndUpdate(id,{$set:body},{new:true}).then((t)=>{
        if(!t){
            return res.status(404).send();
        }
        res.send({t});
    }).catch((e)=>{
        res.status(400).send();
    });
});

//post /users
app.post('/user',(req,res)=>{
    var body = _.pick(req.body, ['email','password']);
    var u = new user(body);

    u.save().then(()=>{
        return u.generateAuthToken();
         //res.send(u1);
    }).then((token)=>{
        res.header('x-auth',token).send(u);
    }).catch((e)=>{
         res.status(400).send(e);
    });
});

//PRIVATE ROUTE AND

// AUTHENTICATION MIDDLEWARE

app.get('/user/me',authenticate,(req,res)=>{
   res.send(req.user);
});


app.get('/',(req,res) => {
    console.log("Call get")
})

app.listen(port,()=>{
    console.log('started on port 3000');

});

module.exports={app};