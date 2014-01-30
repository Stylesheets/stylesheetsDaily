/*
 * Module dependencies
 */
var express = require('express'),
  routes = require('./routes'),
  http = require('http'),
  path = require('path'),
  stylus = require('stylus'),
  nib = require('nib'),
  BasicScraping = require('./basicScraping'),
  AmazonProduct = require('./amazonProduct'),
  cronJob = require('cron').CronJob;

var app = express();

/* TODO review if we need this function?, 
what is nib used for?

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}
*/

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// routes =========================
// Main entry into web view
app.get('/', routes.index);

// api ----------------------------
// get data -----------------------
app.get('/api/deals', function(req, res) {
  res.json(myDeals);
});

app.get('/api/amazonProducts', function(req, res) {
  res.json(amazonImageURL);
});

// Launch Server ==================
http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

// Check that expected arguments were passed on command line else exit.
if (process.argv.length !== 5) {
  console.error("\nError: Script requires awsId, awsSecret, assocId arguments for aws Advertisement requests after node javascript file.\n");
  console.error("\tFormat expected is: node server.js awsId awsSecret assocId\n");
  exit();
}

// Attempt getting Amazon Product results
var amazonProduct = new AmazonProduct();
var amazonImageURL = [];

amazonProduct.execute(function(data) {
  amazonImageURL = data;
});

// Attempt scraping data =========================
var bs = new BasicScraping("Cigars International", "http://www.cigarsinternational.com/joecigar/");

console.log("look at BasicScraping go...");

var myDeals = [];

// Get Daily deal from Joe's site
bs.getData("Cigars International", "http://www.cigarsinternational.com/joecigar/", "cigar", function(data, err) {
  console.log(data);
  //console.log(data[0]);
  myDeals.push(data);
  //arry[1] = data[1];
});

// Get 1-day-deal from Joe's site
bs.getData("Cigars International", "http://www.cigarsinternational.com/specials/1-day-deal/", "cigar", function(data, err) {
  console.log(data);
  //console.log(data[0]);
  myDeals.push(data);
  //arry[1] = data[1];
});

// Get weekly deal from Joe's site
bs.getData("Cigars International", "http://www.cigarsinternational.com/specials/weekly-special/", "cigar", function(data, err) {
  console.log(data);
  //console.log(data[0]);
  myDeals.push(data);
  //arry[1] = data[1];
});

// Get weekend spotlight from Joe's site
bs.getData("Cigars International", "http://www.cigarsinternational.com/specials/weekend-spotlight/", "cigar", function(data, err) {
  console.log(data);
  //console.log(data[0]);
  myDeals.push(data);
  //arry[1] = data[1];
});

bs.getWineData("Wine Woot Deals", "http://wine.woot.com/", "wine", function(data, err) {
  console.log(data);
  //console.log(data[0]);
  myDeals.push(data);
  //arry[1] = data[1];
});

// Sandbox =========================
var job = new cronJob('* * * * * *', function() {
  console.log("cron job fired every second!");
});
//uncomment following line to see cron job run
// job.start();