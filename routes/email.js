'use strict'

var express = require('express');
let bodyParser = require('body-parser');
var sg = require('sendgrid')('api_key');
var app = express();

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/',function(req,res){
	var request = sg.emptyRequest();
	request.body = {
	  "personalizations": [
	    {
	      "to": [
	        {
	          "email": "kristian.noya@gmail.com"
	        }
	      ],
	      "subject": "New message received from kristiannoya.com"
	    }
	  ],
	  "from": {
	    "email": "newMessage@kristiannoya.com"
	  },
	  "content": [
	    {
	      "type": "text/plain",
	      "value": "From: "+req.body.name+"\n Message: "+req.body.message
	    }
	  ]
	};

	request.method = 'POST'
	request.path = '/v3/mail/send'
	sg.API(request) 
	.then((response) => {
	  	res.status(200).json({status: 'success'});
	})
	.catch((err) => {
    	res.status(500).json({status: 'error'});
	})
	
	//setTimeout(() => {res.status(200).json({status: 'success'})}, 1000);
});

module.exports = app;
