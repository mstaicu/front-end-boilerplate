angular.module('test-component')
	.service('TestComponentService', function() {
		this.sayHello = function() {
			return 'Hello World';
		}
	});
