'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Display RichBiz Main Page', function() {
	beforeEach(function() {
		browser().navigateTo('/');
	});

	it("should display main page layout", function() {
		expect(element('div.main-content').count()).toBe(1);
		expect(element('div.widget').count()).toBe(2);
	});
});

describe('Display Deals API', function() {
	beforeEach(function() {
		sleep(10);
		browser().navigateTo('/api/deals');
	});

	it("should display deals api via get in JSON format", function() {
		expect(element('pre').val()).not().toEqual('');
	});
});