(function() {
  'use strict';
  angular
    .module('httpInterceptor.factory')
    .factory('httpInterceptor', httpInterceptor);

    httpInterceptor.$inject = ['$q']

    function httpInterceptor($q) {
      var requests = 0;
      var delayInMilliseconds = 2000;

      var service = {
        request: request,
        requestError: requestError,
        response: response,
        responseError: responseError,
        getRequestCount: getRequestCount
      };

      return service;

      function request(config) {
        requests += 1;
        return $q.when(config);
      }

      function requestError(config) {
        requests -= 1;
        return $q.reject(response);
      }

      function response(response) {
        var deferred = $q.defer();
        requests -= 1;
        return $q.when(response);
      }

      function responseError(error) {
        var deferred = $q.defer();
        requests -= 1;
        return $q.reject(response);
      }

      function getRequestCount(argument) {
        return requests;
      }
    }
}());
