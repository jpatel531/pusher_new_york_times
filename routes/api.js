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
		var previousArticlesTitles = _.pluck(previousArticles, "title");
		if (!(_.contains(previousArticlesTitles, currentArticle.title))) return true
	});

	return newArticles
};

var triggerEvent = function(){
	console.log("Triggering event...");

	var newArticles = deltaArticles();
	console.log(newArticles);

	_.each(newArticles, function(article){
		pusher.trigger('news-channel', 'new-story', article)
	});

	console.log("Event triggered");
};

var processListOf = function(articles){
	try {
		currentArticles = JSON.parse(articles).results;
	} catch(e){
		setImmediate(getArticles)
	}
	triggerEvent();
};

var getArticles = function(){
	previousArticles = currentArticles
	setTimeout(function(){
		nyt.newswire.recent({"section":"all"}, function(articles){
			processListOf(articles);
			getArticles();
		});
	}, 10000);
};

getArticles();
