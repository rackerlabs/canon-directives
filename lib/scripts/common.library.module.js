(function() {
  'use strict';
  angular
    .module('common.library',
    [
      "table.data.service",
      "table.storage.service",
      'httpInterceptor.factory',
      "facets",
      'facet.section',
      "data.table"
    ]);

  angular
    .module('common.library')
    .config(function($httpProvider) {
      $httpProvider.interceptors.push("httpInterceptor");
    });

  angular
    .module('common.library')
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
