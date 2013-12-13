var http = require("http");
var cheerio = require("cheerio");

// output message to log when server starts
console.log("Server started!");

// Utility function that downloads a URL and invokes
// callback with the data.
function download(url, callback) {
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
}

var url = "http://www.cigarsinternational.com/joecigar/";


var server = http.createServer(function(req, response) {
	response.writeHead(200);
	download(url, function(data) {
		if (data) {
			console.log("retrieved data successfully");

			response.write("<h1>Joe Cigar test page</h1>");

			var $ = cheerio.load(data);

			var myData = "Product name:" + $("#prod-description").find("h1").text();
			myData += "<br/><br/>";
			myData += "Product quantity:  " + $("#prod-description").find("h2").text();
			myData += "<br/><br/>";
			myData += "Product description:  " + $("#prod-description").find("p");
			myData += "<br/><br/>";

			myData += "<table border=1>";
			myData += "<tr><td>Name</td><td>Quantity</td><td>MSRP</td><td>Price</td></tr>";
			$("#prod-form").find("tbody>tr").each(function(i, e) {

				var startRow = $(e).find(".prod-item");
				if (startRow.length > 0) {
					myData += "<tr>";
					myData += "<td>" + $(e).find(".prod-item").text() + "</td>";
					myData += "<td>" + $(e).find(".prod-type").text() + "</td>";
					myData += "<td>" + $(e).find(".prod-msrp").text() + "</td>";
					myData += "<td>" + $(e).find(".prod-price").text() + "</td>";
					myData += "</tr>";
				}
			});
			myData += "</table>";

			response.write(myData);

			response.end();
		} else console.log("error");
	});

});
server.listen(8080);