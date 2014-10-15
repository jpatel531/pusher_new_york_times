var secrets = require('./secrets');
var articleSearchKey = secrets.articleSearchKey;
var newsWireKey = secrets.newsWireKey;

var NYT = require('nyt');
var keys = {'article-search': articleSearchKey, 'newswire': newsWireKey}
var nyt = new NYT(keys);

module.exports = nyt;