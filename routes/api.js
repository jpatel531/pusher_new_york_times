var express = require('express');
var router = express.Router();

var pusher = require('../config/pusherConfig');
var nyt = require('../config/NYTConfig');


/* Articles JSON. */
router.get('/articles', function(req, res) {
	nyt.article.search({}, function(articles){
		var formattedArticles = JSON.parse(articles).response.docs;
		formattedArticles.shift();
		res.json(formattedArticles);
	});
});

module.exports = router;