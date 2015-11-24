(function() {
  'use strict';
  angular
    .module('httpInterceptor.factory')
    .factory('httpInterceptor', httpInterceptor);

    httpInterceptor.$inject = ['$q', '$timeout']

    function httpInterceptor($q, $timeout) {
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
        $timeout(
        function() {
          deferred.resolve(response); //simulate a delay
          requests -= 1;
        },
        delayInMilliseconds,
        false //no need to trigger a $digest, the $q service does that when request resolves
      );
      return (deferred.promise);
      //--------End Simulated Delay-------//
        requests -= 1;
        return $q.when(response);
      }

      function responseError(error) {
        var deferred = $q.defer();
        $timeout(
        function() {
          deferred.resolve(response); //simulate a delay
          requests -= 1;
        },
        delayInMilliseconds,
        false //no need to trigger a $digest, the $q service does that when request resolves
      );
      return (deferred.promise);
      //--------End Simulated Delay-------//
        requests -= 1;
        return $q.reject(response);
      }

      function getRequestCount(argument) {
        return requests;
      }
    }
}());
