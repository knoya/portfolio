'use strict'

let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');

let Comment = require('../model/commentSchema');

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

//initialize API
module.exports = (io) => {
	router.get('/', function(req, res) {
	  Comment.find(function(err, comments) {
	    if (err) {
	      res.send(err);
	    }
	    res.json({"everything": "is working"})
	  })
	});

	//adding /comments route
	router.route('/comments')
	  //client requesting all comments
	  .get(function(req, res) {
	    Comment.find(function(err, comments) {
	      if (err)
	        res.send(err);
	      res.json(comments)
	    });
	  })
	  //client posting new comment
	  .post(function(req, res) {
	    if (req.body.token) {
	      jwt.verify(req.body.token, config.jwtSecret, (err, decoded) => {
	        //console.log("decoded: " + JSON.stringify(decoded, null, 2));
	        if (err) {
	          //user with token posts comment but the token expired or was forged
	          res.status(401).end();
	        }
	        else { //token successfully decoded so set the userID from the token
	          var comment = new Comment();
	          (req.body.username) ? comment.username = req.body.username : null; //change to get username from token
	          (req.body.text) ? comment.text = req.body.text : null;
	          (req.body.color) ? comment.color = req.body.color : null;
	          (req.body.opacity) ? comment.opacity = req.body.opacity : null;
	          (req.body.date) ? comment.date = req.body.date : null;
	          comment.userID = decoded.id;
	          comment.save(function(err) {
	            if (err)
	              res.send(err);
	            //res.json({ message: 'Comment submitted' });
	            res.status(200).json({ message: 'Comment submitted', as: decoded.id, aka: decoded.sub });
	            io.sockets.emit('newComment', comment);
	          });
	        }
	      })
	    }
	  });

	//adding route for specific comments
	router.route('/comments/:comment_id')
	  //client updating a comment
	  .put(function(req, res) {
	    if (req.body.token) {
	      jwt.verify(req.body.token, config.jwtSecret, (err, decoded) => {
	        //token not found so editing definitely isn't allowed
	        if (err) {res.status(401).end()}
	        else {
	          Comment.findById(req.params.comment_id, function(error, comment) {
	            if (error) {res.status(401).end()};
	            if (decoded.id == comment.userID) {
	              (req.body.username) ? comment.username = req.body.username : null; //take username from decoded.sub
	              (req.body.text) ? comment.text = req.body.text : null;
	              (req.body.opacity) ? comment.opacity = req.body.opacity : null;
	              (req.body.editDate) ? comment.editDate = req.body.editDate : null;
	              comment.save(function(err) {
	                if (err)
	                  res.send(err);
	                res.status(200).json({ message: 'Comment edited', as: decoded.sub });
	                io.sockets.emit('editComment', comment);
	              });

	            }
	            else {
	              console.log("not allowed")
	            }
	          })
	        }
	      })
	    }
	    else {
	      res.status(401).end();
	    }
	  })
	  //client deleting a comment
	  .delete(function(req, res) {
	    if (req.body.token) {
	      jwt.verify(req.body.token, config.jwtSecret, (err, decoded) => {
	        if (err) {res.status(401).end()}
	        else {
	          Comment.findById(req.params.comment_id, function(error, comment) {
	            if (error) {res.status(401).end()};
	            if (decoded.id == comment.userID) {
	              Comment.remove({ _id: req.params.comment_id }, function(err2, comment2) {
	                if (err2) {res.status(401).end()};
	                io.sockets.emit('removeComment', req.params.comment_id);
	                res.json({ message: 'Comment has been deleted' })
	              })
	            }
	            else {
	              console.log("not allowed")
	            }
	          })
	        }
	      })
	    }
	    else {
	      res.status(401).end();
	    }
	  });
  	return router;
}