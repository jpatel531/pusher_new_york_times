var express = require('express');
var router = express.Router();
var pusher = require('../config/pusherConfig');
var nyt = require('../config/NYTConfig');
var _ = require('underscore');

/* Articles JSON. */
router.get('/articles', function(req, res) {
	res.json(currentArticles);
});

module.exports = router;

// NYT

var currentArticles = []
var previousArticles = []

var deltaArticles = function(){
	var newArticles =  _.filter(currentArticles, function(currentArticle){
		var previousArticlesIds = _.pluck(previousArticles, "_id");
		if (!(_.contains(previousArticlesIds, currentArticle._id))) return true
	});

	return newArticles
};

var triggerEvent = function(){
	console.log("Triggering event...");

	var newArticles = deltaArticles();

	_.each(newArticles, function(article){
		pusher.trigger('news-channel', 'new-story', article)
	});

	console.log("Event triggered");
};

var processListOf = function(articles){
	currentArticles = JSON.parse(articles).response.docs;
	currentArticles.shift();
	triggerEvent();
};

var getArticles = function(){
	previousArticles = currentArticles
	setTimeout(function(){
		nyt.article.search({"sort":"newest"}, function(articles){
			processListOf(articles);
			getArticles();
		});
	}, 8000);
};

getArticles();