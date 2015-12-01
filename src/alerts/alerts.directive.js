(function() {
  'use strict';

  angular
    .module("canon.alerts")
    .directive("alerts", alerts);

    alerts.$inject = ['alertingFactory']

  /****** Alerting Directive ******/
  function alerts(alertingFactory) {
    return {
      restrict: "AE",
      template: '<div ng-repeat="alert in currentAlerts" class="alert alert-{{alert.type}}">{{alert.message}}<div class="close" ng-click="removeAlert(alert)"><span class="glyphicon glyphicon-remove"></span></div></div>',
      //scope: true,
      controller: function($scope) {
        $scope.removeAlert = function(alert) {
          alertingFactory.removeAlert(alert);
        }
      },
      link: function(scope) {
        scope.currentAlerts = alertingFactory.currentAlerts;
      }
    }
  }
  /****** End Alerting Directive ******/
}());
