'use strict'

let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');

let User = require('../model/userSchema');
let jwt = require('jsonwebtoken');

let config = require('../config-server.json');

//parse json
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//setting headers
router.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

router.post('/login', (req, res) => {
  if (req.body.username && req.body.password) {
    User.findOne({ 'username': req.body.username }, (err, user) => {
      //if error
      if (err) res.status(500).json({"error": "try again"});
      //if user is found
      if (user == null) {
        res.status(400).json({"error": "verify username and password"})
      }
      else {
        user.comparePassword(req.body.password, (passwordErr, isMatch) => {
          if (err) {
            res.status(500).json({"error": "try again"});
          }
          if (!isMatch) {
            res.status(400).json({"error": "verify username and password"})
          }
          else {
            let userInfo = {
              sub: user.username,
              id: user._id,
              iss: 'http://kristiannoya.com',
              exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
              iat: Math.floor(Date.now() / 1000)
            };
            //send jwt here
            let token = jwt.sign(userInfo, config.jwtSecret);
            res.status(200).json({
              "success": true,
              "token": token,
              "userID": user._id,
              "username": user.username
            })
          }
        })
      }
    })
  }
})

router.post('/register', (req, res) => {
  if (req.body.username && req.body.password) {
    User.findOne({ 'username': req.body.username }, (err, user) => {
      // if there's somehow an error
      if (err) res.status(500).json({"error": "try again"});
      //username exists so they have to pick another name
      if (user != null) {
        res.status(400).json({"username": "taken"})
      }
      //username doesn't exist so they get to sign up
      else {
        var newUser = new User();
        newUser.username = req.body.username;
        newUser.password = req.body.password;
        req.body.userID ? newUser._id = req.body.userID : newUser._id = Date.now();

        newUser.save(function(err) {
          if (err)
            res.status(500).send({"error": "try again"});
          else {
            let userInfo = {
              sub: newUser.username,
              id: newUser._id,
              iss: 'http://kristiannoya.com',
              exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
              iat: Math.floor(Date.now() / 1000)
            };
            let token = jwt.sign(userInfo, config.jwtSecret);
            res.status(200).json({
              "success": true,
              "token": token,
              "userID": newUser._id,
              "username": newUser.username
            })
          }
        });
      }
    })
  }
  else {
    res.status(400).json({"missing": "username or password"});
  }
})

router.post('/verify', (req, res) => {
  jwt.verify(req.body.token, config.jwtSecret, (err, decoded) => {
    if (err) {
      res.status(401).end();
    }
    else {
      res.status(200).send({loggedIn: true, userID: decoded.id, username: decoded.sub});
    }
  })
})

module.exports = router;
