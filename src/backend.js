/**
 * Fake HTTP backend implementation suitable for end-to-end testing
 * or backend-less development of applications that use the $http service.
 */
angular.module('backend', ['ngMockE2E'])
  .run(function($httpBackend) {
    $httpBackend.whenGET('/otters').respond(function(method, url, data, headers) {
      return [200, ['First otter', 'Second otter']];
    });
  });
