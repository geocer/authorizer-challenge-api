const express = require('express');
const http = require("http");
const app = express();
const expressSwagger = require('express-swagger-generator')(app);

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

let host = process.env.SERVER_URL || "localhost:8080";
let _schemas = "http";

let options = {
    swaggerDefinition: {
        info: {
            description: 'Code Challenge - Authorizer',
            title: 'Authorizer API',
            version: '1.0.0',
        },
        host: `${host}`,
        basePath: '/v1',
        produces: [
            "application/json"
        ],
        schemes: [_schemas]
    },
    basedir: __dirname, //app absolute path
    files: ['./api/*.js'] //Path to the API handle folder
};
expressSwagger(options);

// SERVER
const server = http.createServer(app);

server.listen(8080, function () {
    console.log(`Authorizer API server is running in port 8080`);
});

app.get('/', function (req, res) {
    res.redirect('/api-docs/');
});

require('./api/routes')(app);