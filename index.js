require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./api/helpers/error-handle');
const expressGraphQL = require("express-graphql");
import schema from "./api/graphQL";
let middleware = require('./api/ultis');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// api routes
app.use('/authentication', require('./api/controllers/authenControler'));
app.use('/contacts', require('./api/controllers/contactControler'));
app.use('/tasks', require('./api/controllers/taskControler'))
//app.use(middleware.checkToken)

app.use("/graphql", bodyParser.json(), middleware.checkToken, async (request, response) => {
  return expressGraphQL({
    schema,
    graphiql: true,
    context: {
      user: request.decoded
    }
  })(request, response);
}
);
// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const server = app.listen(port, function () {
  console.log('Server listening on port ' + port);
});