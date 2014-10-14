var secrets = require('./secrets');
var articleSearchKey = secrets.articleSearchKey;

var NYT = require('nyt');
var keys = {'article-search': articleSearchKey}
var nyt = new NYT(keys);

module.exports = nyt;