(function() {
  'use strict';
  angular.module('httpInterceptor.factory',[]);

  angular
  .module('httpInterceptor.factory')
  .config(function($httpProvider) {
    $httpProvider.interceptors.push("httpInterceptor");
  });

}());
