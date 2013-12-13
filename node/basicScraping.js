
var http = require("http");
var cheerio = require("cheerio");

// Utility function that downloads a URL and invokes
// callback with the data.
function download(url, callback) {
  http.get(url, function(res) {
    var data = "";
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on("end", function() {
      callback(data);
    });
  }).on("error", function() {
    callback(null);
  });
}

var url = "http://www.cigarsinternational.com/joecigar/"


var server = http.createServer(function(req, response) {
	response.writeHead(200);
	download(url, function(data) {
	  if (data) {
		  console.log("retrieved data successfully");
		  
		  response.write("<h1>Joe Cigar test page</h1>")
		  
		  var $ = cheerio.load(data);
		
		  var myData ="Product name:"+ $("#prod-description").find("h1").text();
		  myData+="<br/><br/>";
		  myData +="Product quantity:  "+$("#prod-description").find("h2").text();
		  myData+="<br/><br/>";
		  myData +="Product description:  "+$("#prod-description").find("p").text();
		  myData+="<br/><br/>";

		  response.write(myData)
		  
		  response.end();
	  }
	  else console.log("error");  
	});

});
server.listen(8080);