'use strict'

let express = require('express');
let app = express();
let router = express.Router();
let bodyParser = require('body-parser');
let fetch = require('node-fetch');
var async = require('async');
let etymologies = require('./index.json');
let contractions = require('./contractions.json');
var sg = require('sendgrid')('api_key');

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

router.route('/')
	.post(function(req, res) {
		let text = req.body.text;
		if (text.split(/[\s]/g).length <= 200) {
			let wordObjArr = text.sentenceSplitter().isWord().punctuationStrip().isContraction().addEtymology().checkVariants();
			res.json(wordObjArr);
		}
		else {
			res.json([{"too":"long"}]);
		}
	});

router.post('/comments',function(req,res){
	var request = sg.emptyRequest();
	request.body = {
	  "personalizations": [
	    {
	      "to": [
	        {
	          "email": "easyetymology@gmail.com"
	        }
	      ],
	      "subject": "New message received on Easy Etymology"
	    }
	  ],
	  "from": {
	    "email": "etymologyrequest@kristiannoya.com",
	    "name": "Comment"
	  },
	  "content": [
	    {
	      "type": "text/plain",
	      "value": 
	      `From: ${req.body.email ? req.body.email : 'N/A'}
	      About: ${req.body.radio ? req.body.radio : 'N/A'}
	      Word: ${req.body.word ? req.body.word : 'N/A'}
	      Comments: ${req.body.comments ? req.body.comments : 'N/A'}
	      Source: ${req.body.source ? req.body.source : 'N/A'}


	      ${JSON.stringify(req.body, null, 2)}`
	    }
	  ]
	};
	request.method = 'POST'
	request.path = '/v3/mail/send'
	sg.API(request, function (error, response) {
	  if (error) {
	  	console.log(error);
	  }
	  res.status(200).json({message: "sent"});
	})
});

String.prototype.sentenceSplitter = function() {
	let lowerCaseArr = this.toLowerCase().split(/[\s]/g);
	let splitArr = this.split(/[\s]/g);
	let wordObjArr = new Array;
	for (var i=0; i<splitArr.length; i++) {
		wordObjArr[i] = new Object;
		wordObjArr[i].word = splitArr[i];
		wordObjArr[i].lowercase = lowerCaseArr[i];
	}
	return wordObjArr;
}

Array.prototype.isWord = function() {
	let newObjArr = this.map(function(wordObj, i) {
		if (/[a-z]/i.test(wordObj.lowercase)) {
			wordObj.isWord = true;
			return wordObj;
		}
		else {
			wordObj.isWord = false;
			return wordObj;
		}
	})
	return newObjArr;
}

Array.prototype.punctuationStrip = function() {
	let newObjArr = this.map(function(wordObj, i) {
		if(wordObj.isWord == false) {
			wordObj.strippedWord = null;
			return wordObj;
		}
		else {
			wordObj.strippedWord = wordObj.lowercase.replace(/[‘’]/g,"'").replace(/[“”]/g,"\"").replace(/[.,\/#!?$%\^&\*;:{}=\_\"`~()]/g,"");
			return wordObj;
		}
	})
	return newObjArr;
}

Array.prototype.isContraction = function() {
	let newObjArr = this.map(function(wordObj, i) {
		if (contractions.find(e => e.word === wordObj.strippedWord)) {
			let contractionObj = contractions.find(e => e.word === wordObj.strippedWord);
			wordObj.isContraction = true;
			wordObj.contractionStems = contractionObj.stems;
		}
		return wordObj;
	})
	return newObjArr;
}

Array.prototype.addEtymology = function() {
	let newObjArr = this.map(function(wordObj, i) {
		if (wordObj.isContraction) {
			let newWordObj = new Object;
			newWordObj.word = wordObj.word;
			newWordObj.contractionStems = wordObj.contractionStems;
			newWordObj.lowercase = wordObj.lowercase;
			newWordObj.isWord = true;
			newWordObj.strippedWord = wordObj.strippedWord;
			newWordObj.isContraction = true;

			newWordObj.data = new Array;

			for (let i = 0; i< wordObj.contractionStems.length; i++) {
				newWordObj.data[i] = new Object;
				let etyObj = etymologies.find(e => e.word === wordObj.contractionStems[i]);
				newWordObj.data[i].contractionStem = wordObj.contractionStems[i];
				etyObj.etymology ? newWordObj.data[i].etymology = etyObj.etymology : null;
				etyObj.pos ? newWordObj.data[i].pos = etyObj.pos : null;
				etyObj.crossreferences ? newWordObj.data[i].crossreferences = etyObj.crossreferences : null;
				etyObj.quotes ? newWordObj.data[i].quotes = etyObj.quotes : null;
				etyObj.years ? newWordObj.data[i].years = etyObj.years : null;
				etyObj.category ? newWordObj.data[i].category = etyObj.category : null;
				etyObj.wnetymology ? newWordObj.data[i].wnetymology = etyObj.wnetymology : null;
			}
			return(newWordObj);
		}
		if (!wordObj.isContraction) {
			let newWordObj = new Object;
			newWordObj.word = wordObj.word;
			newWordObj.contractionStems = wordObj.contractionStems;
			newWordObj.lowercase = wordObj.lowercase;
			newWordObj.isWord = wordObj.isWord;
			newWordObj.strippedWord = wordObj.strippedWord;
			newWordObj.isContraction = false;

			let etyObj = etymologies.find(e => e.word === wordObj.strippedWord);
			newWordObj.data = new Array;
			newWordObj.data[0] = new Object;

			if (etyObj == undefined) {
				return(newWordObj);
			}

			etyObj.etymology ? newWordObj.data[0].etymology = etyObj.etymology : newWordObj.data[0].etymology = null;
			etyObj.pos ? newWordObj.data[0].pos = etyObj.pos : newWordObj.data[0].pos = null;
			etyObj.crossreferences ? newWordObj.data[0].crossreferences = etyObj.crossreferences : newWordObj.data[0].crossreferences = null;
			etyObj.quotes ? newWordObj.data[0].quotes = etyObj.quotes : newWordObj.data[0].quotes = null;
			etyObj.years ? newWordObj.data[0].years = etyObj.years : newWordObj.data[0].years = null;
			etyObj.category ? newWordObj.data[0].category = etyObj.category : newWordObj.data[0].category = null;
			etyObj.wnetymology ? newWordObj.data[0].wnetymology = etyObj.wnetymology : newWordObj.data[0].wnetymology = null;
			return(newWordObj);
		}
	});

	return newObjArr;
}

Array.prototype.checkVariants = function() {

	let newObjArr = this.map(variantChecker);
	return newObjArr;
}

function variantChecker(wordObj, i) {
	if(wordObj.isWord == false) {
		return wordObj;
	}
	if ((wordObj.data[0].category == null) && (wordObj.isWord == true)) {
		var str;
		if (wordObj.strippedWord.endsWith('s') && (isThisAWord(wordObj.strippedWord.slice(0, -1)))) {
			str = wordObj.strippedWord.slice(0, -1);
		} 
		else if (wordObj.strippedWord.endsWith('less') && (isThisAWord(wordObj.strippedWord.slice(0, -4)))) {
			str = wordObj.strippedWord.slice(0, -4);
		} 
		else if (wordObj.strippedWord.endsWith('ness') && (isThisAWord(wordObj.strippedWord.slice(0, -4)))) {
			str = wordObj.strippedWord.slice(0, -4);
		} 
		else if (wordObj.strippedWord.endsWith('es') && (isThisAWord(wordObj.strippedWord.slice(0, -2)))) {
			str = wordObj.strippedWord.slice(0, -2);
		} 
		else if (wordObj.strippedWord.endsWith('ers') && (isThisAWord(wordObj.strippedWord.slice(0, -3)))) {
			str = wordObj.strippedWord.slice(0, -3);
		}
		else if (wordObj.strippedWord.endsWith('ly') && (isThisAWord(wordObj.strippedWord.slice(0, -2)))) {
			str = wordObj.strippedWord.slice(0, -2);
		}
		else if (wordObj.strippedWord.endsWith('ally') && (isThisAWord(wordObj.strippedWord.slice(0, -4)))) {
			str = wordObj.strippedWord.slice(0, -4);
		}
		else if (wordObj.strippedWord.endsWith('d') && (isThisAWord(wordObj.strippedWord.slice(0, -1)))) {
			str = wordObj.strippedWord.slice(0, -1);
		}
		else if (wordObj.strippedWord.endsWith('ed') && (isThisAWord(wordObj.strippedWord.slice(0, -2)))) {
			str = wordObj.strippedWord.slice(0, -2);
		}
		else if (wordObj.strippedWord.endsWith("ing") && (isThisAWord(wordObj.strippedWord.slice(0, -3)+'e'))) {
			str = wordObj.strippedWord.slice(0, -3)+'e';
		}
		else if (wordObj.strippedWord.endsWith('ing') && (isThisAWord(wordObj.strippedWord.slice(0, -3)))) {
			str = wordObj.strippedWord.slice(0, -3);
		}
		else if (wordObj.strippedWord.endsWith("ing") && (isThisAWord(wordObj.strippedWord.slice(0, -4)))) {
			str = wordObj.strippedWord.slice(0, -4);
		}
		else if (wordObj.strippedWord.endsWith('er') && (isThisAWord(wordObj.strippedWord.slice(0, -3)))) { //bigger - look for 'er' and chop off the last 'g' too
			str = wordObj.strippedWord.slice(0, -3);
		}
		else if (wordObj.strippedWord.endsWith('er') && (isThisAWord(wordObj.strippedWord.slice(0, -2)))) {
			str = wordObj.strippedWord.slice(0, -2);
		}
		else if (wordObj.strippedWord.endsWith('r') && (isThisAWord(wordObj.strippedWord.slice(0, -1)))) {
			str = wordObj.strippedWord.slice(0, -1);
		}
		else if (wordObj.strippedWord.endsWith('ful') && (isThisAWord(wordObj.strippedWord.slice(0, -3)))) {
			str = wordObj.strippedWord.slice(0, -3);
		}
		else if (wordObj.strippedWord.endsWith('est') && (isThisAWord(wordObj.strippedWord.slice(0, -4)))) { //fattest - look for 'est' and trim 1 mores
			str = wordObj.strippedWord.slice(0, -4);
		}
		else if (wordObj.strippedWord.endsWith('est') && (isThisAWord(wordObj.strippedWord.slice(0, -3)))) {
			str = wordObj.strippedWord.slice(0, -3);
		}
		else if (wordObj.strippedWord.endsWith('ment') && (isThisAWord(wordObj.strippedWord.slice(0, -4)))) {
			str = wordObj.strippedWord.slice(0, -4);
		}
		else if (wordObj.strippedWord.endsWith('ism') && (isThisAWord(wordObj.strippedWord.slice(0, -3)))) {
			str = wordObj.strippedWord.slice(0, -3);
		}
		else if (wordObj.strippedWord.endsWith("'s") && (isThisAWord(wordObj.strippedWord.slice(0, -2)))) {
			str = wordObj.strippedWord.slice(0, -2);
		} 
		else if (wordObj.strippedWord.endsWith("ied") && (isThisAWord(wordObj.strippedWord.slice(0, -3)+'y'))) {
			str = wordObj.strippedWord.slice(0, -3)+'y';
		} 
		else if (wordObj.strippedWord.endsWith("ies") && (isThisAWord(wordObj.strippedWord.slice(0, -3)+'y'))) {
			str = wordObj.strippedWord.slice(0, -3)+'y';
		}

		if (etymologies.find(e => e.word === str)) {
			let etyObj = etymologies.find(e => e.word === str);
			(etyObj.word) ? wordObj.data[0].etyword = etyObj.word : null;
			(etyObj.pos) ? wordObj.data[0].pos = etyObj.pos : null;
			(etyObj.crossreferences) ? wordObj.data[0].crossreferences = etyObj.crossreferences : null;
			(etyObj.quotes) ? wordObj.data[0].quotes = etyObj.quotes : null;
			(etyObj.etymology) ? wordObj.data[0].etymology = etyObj.etymology : null;
			(etyObj.years) ? wordObj.data[0].years = etyObj.years : null;
			(etyObj.wnetymology) ? wordObj.data[0].wnetymology = etyObj.wnetymology : null;
			(etyObj.category) ? wordObj.data[0].category = etyObj.category : null;
		}
		return wordObj;
	}
	else {
		return wordObj;
	}
}

function isThisAWord(str) {
	if (etymologies.find(e => e.word === str)) {
		return true;
	}
	else {
		return false;
	}
}

module.exports = router;
