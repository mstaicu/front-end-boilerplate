describe('Test component suite', function() {
	var testComponentService = null;

	/**
	 * Inject the main module and the service before each spec
	 */
	beforeEach(function() {
		module('test-component');

		/**
		 * Inject the service
		 */
		inject(function(_TestComponentService_) {
			testComponentService = _TestComponentService_;
		});
	});

	it('Service loaded', function() {
		expect(testComponentService).not.toBe(null);
	});

	it('Say hello', function() {
		expect(testComponentService.sayHello()).toEqual('Hello World');
	});
});
