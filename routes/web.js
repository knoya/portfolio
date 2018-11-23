'use strict'

var express = require('express');
var app = express();
var path = require('path');

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/../public/site/index.html'));
});

app.get('/portfolio', function(req, res) {
	res.sendFile(path.join(__dirname + '/../public/site/index.html'));
});

app.get('/email', function(req, res) {
	res.sendFile(path.join(__dirname + '/../public/site/index.html'));
});

app.get('/calculator', function(req, res) {
	res.sendFile(path.join(__dirname + '/../public/calculator/calc.html'));
});

app.get('/weather', function(req, res) {
	res.sendFile(path.join(__dirname + '/../public/weather/weather.html'));
});

app.get('/tictactoe', function(req, res) {
	res.sendFile(path.join(__dirname + '/../public/tictactoe/tictactoe.html'));
});

app.get('/chat', function(req, res) {
	res.sendFile(path.join(__dirname + '/../public/chat/index.html'));
});
app.get('/chat/*', function(req, res) {
	res.sendFile(path.join(__dirname + '/../public/chat/index.html'));
});

app.get('/portfoliov1', function(req, res) {
	res.sendFile(path.join(__dirname + '/../public/portfolio/index.html'));
});

app.get('/etymology', function(req, res) {
	res.sendFile(path.join(__dirname + '/../public/etymology/index.html'));
});

module.exports = app;