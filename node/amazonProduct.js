var util = require('util'),
	OperationHelper = require('apac').OperationHelper;

module.exports = AmazonProduct;

/* Constructor
 */
function AmazonProduct() {
	// get credentials from command line arguments
	this.opHelper = new OperationHelper({
		awsId: process.argv[2],
		awsSecret: process.argv[3],
		assocId: process.argv[4]
	});
}

// execute(operation, params, callback, onError)
// operation: select from http://docs.aws.amazon.com/AWSECommerceService/latest/DG/SummaryofA2SOperations.html
// params: parameters for operation (optional)
// callback(parsed, raw): callback function handling results. parsed = xml2js parsed response. raw = raw xml response
// onError: function handling errors, otherwise all error messages are printed with console.log()

AmazonProduct.prototype.execute = function(callback) {
	this.opHelper.execute('ItemSearch', {
		'SearchIndex': 'All',
		'Keywords': 'Cigar',
		'ResponseGroup': 'Images,ItemAttributes,Offers'
	}, function(results) {
		var arry = [{
				'Title': results.ItemSearchResponse.Items[0].Item[0].ItemAttributes[0].Title + "",
				'Price':  results.ItemSearchResponse.Items[0].Item[0].ItemAttributes[0].ListPrice[0].FormattedPrice + " (" + results.ItemSearchResponse.Items[0].Item[0].ItemAttributes[0].ListPrice[0].CurrencyCode + ")",
				'DetailPageURL': results.ItemSearchResponse.Items[0].Item[0].DetailPageURL + "",
				'MediumImage': results.ItemSearchResponse.Items[0].Item[0].MediumImage[0].URL + ""
			},
			{
				'Title': results.ItemSearchResponse.Items[0].Item[1].ItemAttributes[0].Title + "",
				'Price':  results.ItemSearchResponse.Items[0].Item[1].ItemAttributes[0].ListPrice[0].FormattedPrice + " (" + results.ItemSearchResponse.Items[0].Item[0].ItemAttributes[0].ListPrice[0].CurrencyCode + ")",
				'DetailPageURL': results.ItemSearchResponse.Items[0].Item[1].DetailPageURL + "",
				'MediumImage': results.ItemSearchResponse.Items[0].Item[1].MediumImage[0].URL + ""
			}
			,
			{
				'Title': results.ItemSearchResponse.Items[0].Item[2].ItemAttributes[0].Title + "",
				'Price':  results.ItemSearchResponse.Items[0].Item[2].ItemAttributes[0].ListPrice[0].FormattedPrice + " (" + results.ItemSearchResponse.Items[0].Item[0].ItemAttributes[0].ListPrice[0].CurrencyCode + ")",
				'DetailPageURL': results.ItemSearchResponse.Items[0].Item[2].DetailPageURL + "",
				'MediumImage': results.ItemSearchResponse.Items[0].Item[2].MediumImage[0].URL + ""
			}
		];
		console.log("Results:\n" + util.inspect(arry) + "\n");
		callback(arry);
	});
};

// output:
// { ItemSearchResponse: 
//    { '$': { xmlns: 'http://webservices.amazon.com/AWSECommerceService/2011-08-01' },
//      OperationRequest: [ [Object] ],
//      Items: [ [Object] ] } }