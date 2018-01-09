const express = require('express'),
    bodyParser = require('body-parser'),
    app = express();

app.use(bodyParser.json());

app.get('/',(req,res) => {
    console.log("Hallo")
});

app.listen(3000,() => console.log("Server started"))