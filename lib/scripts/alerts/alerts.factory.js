(function() {
  'use strict';

  angular
    .module("alerts")
    .factory("alertingFactory", alertingFactory);

    alertingFactory.$inject = ['$timeout'];
  /****** Alerting Service ******/
  function alertingFactory($timeout) {
    var currentAlerts = [];
    var service = {
      addAlert : addAlert,
      removeAlert: removeAlert,
      currentAlerts: currentAlerts,
      errorHandler: errorHandler
    };

    return service;

    function addAlert(type, message) {
      var alert = { type: type, message: message };
      currentAlerts.push(alert);
      $timeout(function() {
        removeAlert(alert);
      }, 5000);
      throw new Error(message); //any error thrown or real is auto-sent to Airbrake.io
    }

    function removeAlert(alert){
      return _.pull(currentAlerts, alert);
    }

    function errorHandler(desc) {
      return function() {
        addAlert('danger', desc);
      }
    }
  }

  /****** End Alerting Service ******/
}());
