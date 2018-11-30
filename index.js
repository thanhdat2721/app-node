require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
//const jwt = require('./api/helpers/jwt');
const errorHandler = require('./api/helpers/error-handle');
const expressGraphQL = require("express-graphql");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api

//app.use(jwt());

// api routes
app.use('/authentication', require('./api/controllers/authenControler'));
app.use('/contacts', require('./api/controllers/contactControler'));
app.use('/tasks', require('./api/controllers/taskControler'))
// app.use("/graphql", cors(), bodyParser.json(),
//   expressGraphQL({
//     schema,
//     graphiql: true
//   })
// );
// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const server = app.listen(port, function () {
  console.log('Server listening on port ' + port);
});