(function() {
  //This is how a third-party app would inject this resuable devices component
  //and would also need to reference the scripts in index.html

  var app = angular.module("app.thirdparty", ["rs.data.grid"]);
  var appmodule = angular.module("app.thirdparty");

  //Sample controller in parent app shows how to programmatically create an alert.
  var parentAppController = function(alerting) { //demo parent controller, alerting service from myrs.core.js
    var model = this;
    model.createAlert = function(type, message) {
      alerting.addAlert(type, message);
    }
  }
  appmodule.controller("parentAppController", parentAppController);

}());