const express=require('express');
const uuid = require('node-uuid');
const csp = require('helmet-csp');
const bodyParser = require('body-parser');

var app=express();

app.use(csp({
    // Specify directives as normal.
    directives: {
        defaultSrc: ["'self'", 'default.com'],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ['style.com'],
        fontSrc: ["'self'", 'fonts.com'],
        imgSrc: ['img.com', 'data:'],
        sandbox: ['allow-forms', 'allow-scripts'],
        reportUri: '/report-violation',
        objectSrc: ["'none'"],
        upgradeInsecureRequests: true
    },

    // This module will detect common mistakes in your directives and throw errors
    // if it finds any. To disable this, enable "loose mode".
    loose: false,

    // Set to true if you only want browsers to report errors, not block them.
    // You may also set this to a function(req, res) in order to decide dynamically
    // whether to use reportOnly mode, e.g., to allow for a dynamic kill switch.
    reportOnly: false,

    // Set to true if you want to blindly set all headers: Content-Security-Policy,
    // X-WebKit-CSP, and X-Content-Security-Policy.
    setAllHeaders: false,

    // Set to true if you want to disable CSP on Android where it can be buggy.
    disableAndroid: false,

    // Set to false if you want to completely disable any user-agent sniffing.
    // This may make the headers less compatible but it will be much faster.
    // This defaults to `true`.
    browserSniff: true
}));

app.use(bodyParser.json({
    type: ['json', 'application/csp-report']
}))

app.post('/report-violation', function (req, res) {

    if (Object.keys(req.body).length>0) {
        console.log('CSP Violation: ', req.body)
    } else {
        console.log('CSP Violation: No data received!')
    }
    res.status(204).end()
});



app.use(function (req, res, next) {
    res.locals.nonce = uuid.v4()
    next()
})

app.use(csp({
    directives: {
        scriptSrc: [
            "'self'",
            function (req, res) {
                return "'nonce-" + res.locals.nonce + "'"  // 'nonce-614d9122-d5b0-4760-aecf-3a5d17cf0ac9'
            }
        ]
    }
}))

app.use(function (req, res) {
    res.end('<script nonce="' + res.locals.nonce + '">alert(1 + 1);</script>')
})

app.listen(3000,()=>console.log('server started'));