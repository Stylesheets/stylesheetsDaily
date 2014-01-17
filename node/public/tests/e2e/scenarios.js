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