/*
 * Module dependencies
 */
var express = require('express'),
  stylus = require('stylus'),
  nib = require('nib'),
  BasicScraping = require('./basicScraping');

var app = express();

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(stylus.middleware({
  src: __dirname + '/public',
  compile: compile
}));
app.use(express.static(__dirname + '/public'));

// TODO: Figure out how to return results from basicScraping function within res.render to display in template
app.get('/', function(req, res) {
  res.render('index', {
    title: 'Ryan is a loser.com!',
    prodDescription: 'basicScraping.getData()'
  });
});

var port = 8080;

app.listen(port);
console.log("server started on port: " + port);

var bs = new BasicScraping("cigarsinternational", "http://www.cigarsinternational.com/joecigar/");

console.log("look at BasicScraping go...");
//bs.echo();
bs.getData(function(err, data) {
  console.log(err, data);
  //console.log(data[0]);
});