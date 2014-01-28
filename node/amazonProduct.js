var util = require('util'),
	OperationHelper = require('apac').OperationHelper;

module.exports = AmazonProduct;

/* Constructor
 */
function AmazonProduct() {
	// always initialize all instance properties
	this.opHelper = new OperationHelper({
		awsId: '[YOUR AWS ID HERE]',
		awsSecret: '[YOUR AWS SECRET HERE]',
		assocId: '[YOUR ASSOCIATE TAG HERE]'
	});
}

// execute(operation, params, callback, onError)
// operation: select from http://docs.aws.amazon.com/AWSECommerceService/latest/DG/SummaryofA2SOperations.html
// params: parameters for operation (optional)
// callback(parsed, raw): callback function handling results. parsed = xml2js parsed response. raw = raw xml response
// onError: function handling errors, otherwise all error messages are printed with console.log()

AmazonProduct.prototype.execute = function() {
	this.opHelper.execute('ItemSearch', {
		'SearchIndex': 'Books',
		'Keywords': 'harry potter',
		'ResponseGroup': 'ItemAttributes,Offers'
	}, function(results) { // you can add a second parameter here to examine the raw xml response
		console.log("these are the results: " + results);
	});
};

// output:
// { ItemSearchResponse: 
//    { '$': { xmlns: 'http://webservices.amazon.com/AWSECommerceService/2011-08-01' },
//      OperationRequest: [ [Object] ],
//      Items: [ [Object] ] } }