const express = require('express'),
    loadDb = require('./loadDb'),
    authenticate = require('./authentication'),
    permits = require('./permission');

const app = express(),
    api = express.Router();

// first middleware will setup db connection
app.use(loadDb.loadDb());

// authenticate each request
// will set `request.user`
 app.use(authenticate.authenticate());

// setup permission middleware,
// check `request.user.role` and decide if ok to continue
app.use("/api/private", permits.permits("admin"));
app.use(["/api/foo", "/api/bar"], permits.permits("owner", "employee"));

// setup requests handlers
api.get("/private/whatever", (req, res) => {
    console.log('call request on private/whatever');
    res.json({whatever: true})
});
api.get("/foo", (req, res) => res.json({currentUser: req.user}));
api.get("/bar", (req, res) => res.json({currentUser: req.user}));
api.get("/",(req,res)=>{
    console.log('call it');
    res.send('success');
});

// setup permissions based on HTTP Method

// account creation is public
api.post("/account", (req, res) => req.json({message: "created"}));

// account update & delete (PATCH & DELETE) are only available to account owner
api.patch("/account", permits.permits('owner'), (req, res) => req.json({message: "updated"}));
api.delete("/account", permits.permits('owner'), (req, res) => req.json({message: "deleted"}));

// viewing account "GET" available to account owner and account member
api.get("/account", permits.permits('owner', 'employee'),  (req, res) => req.json({currentUser: req.user}));

// mount api router
app.use("/api", api);

// start 'er up
app.listen(process.env.PORT || 3000,()=>console.log('server started'));