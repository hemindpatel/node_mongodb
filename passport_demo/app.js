const express=require('express');
const bodyParser=require('body-parser');
const passport=require('passport');
var LocalStrategy = require('passport-local').Strategy;

const {user}=require('../passport_demo/user');
const {mongoose}=require('../passport_demo/mongoose');

var app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(passport.initialize());
app.use(passport.session());
;

app.get('/signin',(req,res)=>{
   res.sendFile(__dirname+'/views/signin.html');
});

app.get('/login',(req,res)=>{
    res.sendFile(__dirname+'/views/login.html');
});

app.post('/login',passport.authenticate(
    'local',{
        successRedirect:'/home',
        failureRedirect:'/err'
    }
));

app.get('/home',(req,res)=>{
    // console.log('success');
    // res.send('success').end();
    res.sendFile(__dirname+'/views/login.html');
});

app.get('/err',(req,res)=>{
    console.log('error');
    res.send('fail').end();
});

passport.serializeUser(function(user,done){
     done(null,user);
});

passport.deserializeUser(function(user,done){
    done(null,user);
});

passport.use(new LocalStrategy(function(username,password,done){
    console.log("username : "+username);
    console.log("password : "+password);

    //user.find().then((r)=>console.log(r)).catch((e)=>console.log(e));
    process.nextTick(function () {
       user.findOne(
           {
               'email':username
           },
           function(err,user){
                if(err)
                {
                    return done(err)
                }
                if(!user)
                {
                    return done(null,false);
                }
                if(password!=user.password)
                {
                    return done(null,false)
                }
                //console.log(user);
                return done(null,user);
           });
    });
}));

app.listen(1212,()=>{
    console.log('Server started on 1212 server.');
})