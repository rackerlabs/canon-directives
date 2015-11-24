(function() {
  //This is how a third-party app would inject this resuable devices component
  //and would also need to reference the scripts in index.html

  angular.module("app.thirdparty", ['common.library']);
  angular
    .module("app.thirdparty")
    .controller("parentAppController", parentAppController);

  //Sample controller in parent app shows how to programmatically create an alert.
  function parentAppController(alertingFactory, storageService) { //demo parent controller, alerting service from myrs.core.js
    var model = this;
    model.createAlert = function(type, message) {
      alertingFactory.addAlert(type, message);
    }
    storageService.requestData(true).then(function(data) {
      storageService.setMasterData(data);
      storageService.setCurrentItems(data.items);
      storageService.setFacets(data.facets);
    });

  }

}());
