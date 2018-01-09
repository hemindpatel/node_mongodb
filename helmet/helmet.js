// Load required modules
var express = require('express');
var helmet = require('helmet');
//var csp = require('helmet-csp');

// Create our Express application
var app = express();

// Implement CSP with Helmet
app.use(helmet.csp({
    // directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ['*.google-analytics.com'],
        styleSrc: ["'unsafe-inline'"],
        imgSrc: ['*.google-analytics.com'],
        connectSrc: ["'none'"],
        fontSrc: [],
        objectSrc: [],
        mediaSrc: [],
        frameSrc: []
    // },
    // loose: false,
    // reportOnly:false,
    // setAllHeaders: false,
    // disableAndroid: false,
    // browserSniff: true
}));

// Simple endpoint
app.get('/', function(req, res) {
    res.send('Time to secure your application...');
});

// Start the server
app.listen(3000,()=> console.log('server started on 3000 port'));