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

/* Callback receives results from specific site passed via url
 */
BasicScraping.prototype.getData = function(name, url, dealType, callback) {
	//var that = this;
	this.download(url, function(data) {
		if (data) {
			var $ = cheerio.load(data);

			console.log("retrieved " + name + " data successfully");

			var obj = {
				// Save Site name & Url
				"name": name,
				"url": url,
				"dealType": dealType,
				"img": $("#prod-display").find("img").attr("src"),
				"desc1": $("#prod-description").find("h1").text().trim(),
				"desc2": $("#prod-description").find("h2").text().trim(),
				"desc3": $("#prod-description").find("p").text().trim(),
				"item": $(".prod-item").find(".item").text().trim() + " " + $(".prod-item").find(".dimensions").text().trim(),
				"type": $(".prod-type").find(".type").text().trim(),
				"msrp": $(".prod-msrp").find(".msrp").text().trim(),
				"price": $("tbody").find(".prod-price").text().trim()
			};

			//console.log(text);
			callback(obj);
		} else callback(null);
	});
};

/* Callback receives results from specific site passed via url
 */
BasicScraping.prototype.getWineData = function(name, url, dealType, callback) {
	this.download(url, function(data) {
		if (data) {
			var $ = cheerio.load(data);

			console.log("retrieved " + name + " data successfully");

			var obj = {
				// Save Site name & Url
				"name": name,
				"url": url,
				"dealType": dealType,
				"img": $("img.photo").attr("src"),
				"desc1": $("h2.fn").text().trim(),
				"desc2": $("#prod-description").find("h2").text().trim(),
				"desc3": $("#prod-description").find("p").text().trim(),
				"item": $(".prod-item").find(".item").text().trim() + " " + $(".prod-item").find(".dimensions").text().trim(),
				"type": $(".prod-type").find(".type").text().trim(),
				"msrp": $("div#summary").find("span.list-price").text().trim(),
				"price": $("div#summary").find("span.price").text().trim()
			};

			callback(obj);
		} else callback(null);
	});
};