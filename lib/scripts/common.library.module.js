(function() {
  'use strict';
  angular.module('app.common.library',[]);

  angular
    .module('app.common.library')
    .config(function($httpProvider) {
      $httpProvider.interceptors.push("httpInterceptor");
    });

  angular
    .module('app.common.library')
    .config(function($provide) {
      $provide.decorator("$exceptionHandler", function($delegate) {
        return function(exception, cause) {
          $delegate(exception, cause);
          var airbrake = new airbrakeJs.Client({
            projectId: 115430,
            projectKey: "e6a55ac2734fa6b4cb19816164f752d2"
          });
          exception.params = {
            cause: cause
          };
          airbrake.notify(exception);
        }
      });
    });

}());
