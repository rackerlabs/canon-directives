(function() {
  'use strict';
  angular.module('canon.utilities.requestCount',[]);

  angular
  .module('canon.utilities.requestCount')
  .config(function($httpProvider) {
    $httpProvider.interceptors.push("requestCountfactory");
  });

}());
