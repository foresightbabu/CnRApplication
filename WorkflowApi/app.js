var express = require('express');
var app = express();
var config = require('./appConfig');
var router = require('./appRouter');
var bodyParser = require('body-parser');
var errors = require('./Common/errorCodes');
var cors = require('cors');

app.locals.errors = errors;

app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use((req, res, next) => {
    console.log(`${req.path} - ${req.statusCode}`);
    next();
})

require('events').EventEmitter.defaultMaxListeners = 100;

// Configure router //
app.use(router);

//Configure app to listen in the port. Port number is configurable in appConfig.js
app.listen(config.app.port, function () {
    console.log('Example app listening on port 3000!');
});