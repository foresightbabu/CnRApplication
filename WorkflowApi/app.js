var express = require('express');
var app = express();
var config = require('./appConfig');
var router = require('./appRouter');
var bodyParser = require('body-parser');
var errors = require('./Common/errorCodes');
var cors = require('cors');
var requestValidation = require('./Common/RequestValidation');


/*Routers Starts */
var ClientServiceRoute = require('./Routers/ClientServicesRoute');
var ServicesFormControlsRoute = require('./Routers/ServicesFormControlsRoute');
/*Routers Ends */

app.locals.errors = errors;
app.use(cors());
var port = process.env.PORT || 3000;
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

if (process.env.NODENV == "DEV") {
    app.use((req, res, next) => {
        console.log(`${process.env.NODENV} : ${req.path} - ${res.statusCode}`);
        next();
    });

    process.on('warning', (warning) => {
        console.warn(warning.name);    // Print the warning name
        console.warn(warning.message); // Print the warning message
        console.warn(warning.stack);   // Print the stack trace
    });
}


if (process.env.NODENV == "DEV") {
    require('events').EventEmitter.defaultMaxListeners = 100;
}

if (process.env.NODENV == "PROD") {
    require('events').EventEmitter.defaultMaxListeners = 0;
}

// Configure router //
app.use(router);
app.use('/clientservice', ClientServiceRoute)
app.use('/ServicesFormControls', ServicesFormControlsRoute)
//Configure router end //

if (process.env.NODENV == "PROD") {
    port = config.app.prod.port;
}

else if (process.env.NODENV == "DEV") {
    port = config.app.dev.port;
}

//Configure app to listen in the port. Port number is configurable in appConfig.js
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});
