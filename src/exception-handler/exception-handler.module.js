(function() {
  'use strict';

  angular.module("canon.exception.handler", []);
  angular
  .module("canon.exception.handler")
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
        //console.log(exception);
      }
    });
  });
})();
