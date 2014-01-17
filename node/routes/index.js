/*
 * GET home page.
 */

exports.index = function(req, res) {
	res.render('index', {
		// TODO: Figure out how to return results from basicScraping function within res.render to display in template
		title: 'Look at us.com',
    prodDescription: 'basicScraping.getData()'
	});
};