'use strict'

var express = require('express');
var app = express();
var path = require('path');
var web = require('./routes/web');
var email = require('./routes/email');
var etymapi = require('./routes/etymapi');

let config = require('./config-server.json');


let server = app.listen(config.port, () => {
	console.log('Listening on 3000');
});
let io = require('socket.io')(server);


let apiRouter = require('./routes/api')(io);
let authRouter = require('./routes/auth');


//serve static from
app.use(express.static('public', {index: false}));


//routes
app.use('/api', apiRouter);
app.use('/auth', authRouter);
app.use('/send', email);
app.use('/', web);
app.use('/etymapi', etymapi);


app.use(function (req, res, next) {
  res.status(404).send("Oh no a 404 page!")
})