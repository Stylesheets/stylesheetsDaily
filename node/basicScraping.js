var http = require("http");
var cheerio = require("cheerio");

module.exports = BasicScraping;

/* Constructor
 */
function BasicScraping(name, url) {
	// always initialize all instance properties
	this.name = name;
	this.url = url;
}

/*
 * echo test that this module is available.
 */
BasicScraping.prototype.echo = function() {
	console.log('__filename', __filename);
	console.log('__dirname', __dirname);
	console.log('process.argv', process.argv);
	console.log('process.env', process.env);
	if (module === require.main) {
		console.log('This is the main module being run.');
	}

	console.log("getting data for " + __filename + ", " + this.name + " " + this.url);
	this.getData();
};

/* Utility function that downloads a URL and invokes
 * callback with the data.
 */
BasicScraping.prototype.download = function(url, callback) {
	http.get(url, function(res) {
		var data = "";

		res.on('data', function(chunk) {
			data += chunk;
		});

		res.on("end", function() {
			callback(data);
		});
	}).on("error", function() {
		callback(null);
	});
};

/* Callback receives results of prod-description text.
 * TODO: Figure out how to return an array of product data
 */
BasicScraping.prototype.getData = function(callback) {
	this.download(this.url, function(data) {
		if (data) {
			var $ = cheerio.load(data);

			console.log("retrieved data successfully");

			var text = [];

			// grab all product data from page into array
			text[0] = $("#prod-description").find("h1").text();
			text[1] = $("#prod-description").find("h2").text();
			text[2] = $("#prod-description").find("p").text();
			text[3] = $(".prod-item").find(".item").text() + " " + $(".prod-item").find(".dimensions").text();
			text[4] = $(".prod-type").find(".type").text();
			text[5] = $(".prod-msrp").find(".msrp").text();
			text[6] = $("tbody").find(".prod-price").text();

			//console.log(text);
			callback(text);
		} else callback(null);
	});
};