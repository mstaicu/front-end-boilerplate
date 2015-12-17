angular.module('test-component').directive('testDirective', function() {
	return {
		restrict: 'E',
		scope: {

		},
		templateUrl: 'test-component/test.html',
		link: function($scope, $element, $attrs) {

		}
	}
});
