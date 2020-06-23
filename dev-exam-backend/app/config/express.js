const path = require('path');
const health = require('express-ping');
var expressValidator = require("express-validator");
const consign = require('consign');
const { __express: ejs } = require('ejs');
const hystrix = require('./hystrix');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const { requestHandler, responseHandler } = require('./loggerInterceptor');
const cors = require('cors')    

const app = express();
app.use(express.json());

app.use(requestHandler);
app.use(responseHandler);

app.disable('etag');
    
app.use(cors({ origin: 'http://localhost:4200' }));

// app.use(session({ secret: 'anything', resave: true, saveUninitialized: true }));
// app.use(passport.initialize());     
// app.use(passport.session());

app.use(health.ping('/health'));

app.use(expressValidator());

app.set('hystrix', hystrix);


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.engine('.ejs', ejs);

consign({ cwd: 'app' }).include('routes').into(app);

module.exports = { app };
