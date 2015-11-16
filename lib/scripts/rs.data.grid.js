(function() {
  'use strict';

  var app = angular.module("rs.data.grid", ["common.library", "rs.facets", "rs.facets.sublist"]);
  var appmodule = angular.module("rs.data.grid");



  /****** Data Grid Directive ******/
  var rsDataGrid = function(storageService) {
    return {
      restrict: 'E',
      templateUrl: 'rs.data.grid.html',
      scope: {},
      controller: function( $scope, storageService ) {
        //$scope.currentItems = storageService.rsDataSet.getCurrentItems();
        //$scope.facets = storageService.rsDataSet.getMasterData().facets;
      },
      link: function(scope, element, attrs, controller) {
        scope.$watch(function() {
          return storageService.rsDataSet.getCurrentItems();
        }, function() {
          scope.currentItems = storageService.rsDataSet.getCurrentItems();
        });
        scope.$watch(function() {
          return storageService.rsDataSet.getFacets();
        }, function() {
          scope.facets = storageService.rsDataSet.getFacets();
        });
      }
    };
  };
  appmodule.directive("rsDataGrid", rsDataGrid);
  /****** End Data Grid Directive ******/



/****** Data Storage Service ******/
appmodule.factory('storageService', function(gridDataService, $q){
  return {
    rsDataSet: new rsDataSet(gridDataService, $q) //Calls constructor that initializes data
  }
});
function rsDataSet(gridDataService, $q) {
  var obj = this;
    obj.masterData = null;
    obj.currentItems = null;
    obj.facets = null;
    obj.filterCriteria = {};

    obj.requestData = function(bRequestNew) { //when bRequestNew=false it checks to see if data is already cached otherwise sends request
      if (bRequestNew) return gridDataService.syncDataRequests();
      return (obj.masterData) ? $q.when(obj.masterData) : gridDataService.syncDataRequests();
    }
    obj.getMasterData = function() {
      return obj.masterData;
    }
    obj.setMasterData = function(pData) {
      obj.masterData = pData;
    }
    obj.getCurrentItems = function() {
      return obj.currentItems;
    }
    obj.setCurrentItems = function(pItems) {
      obj.currentItems = pItems;
    }
    obj.getFacets = function() {
      return obj.facets;
    }
    obj.setFacets = function(pItems) {
      obj.facets = pItems;
    }
    //Initialize data
    obj.requestData(true).then(function(data) {
      obj.setMasterData(data);
      obj.setCurrentItems(data.items);
      obj.setFacets(data.facets);
    });
}
/****** End Data Storage Service ******/



  /****** Grid Data Service ******/
  appmodule.factory("gridDataService", gridDataService);
  gridDataService.$inject = ['$http', '$q', 'alerting'];

  function gridDataService($http, $q, alerting) {
    var URLS = {ITEMS: "api.devices.items.json", COGS: "api.devices.cogs.json", FACETS: "api.devices.facets.json"};
    //var URLs = {ITEMS: "api.tickets.items.json", COGS: "", FACETS: "api.tickets.facets.json"};

    return {
      syncDataRequests: syncDataRequests
    };

    function gridGetData(url) {
      return $http.get(url)
        .then(function(response){ return response.data })
        .catch(alerting.errorHandler('Failed to load data for rsDataGrid, endpoint: ' + url)); //catches javascript errors
    }
    function gridGetItems() {
      return gridGetData(URLS.ITEMS);
    }

    function gridGetCogs() {
      return gridGetData(URLS.COGS);
    }

    function gridGetFacets() {
      return gridGetData(URLS.FACETS);
    }

    function gridDataFailed(url) {
      //alerting.errorHandler("Failed to load data for rsDataGrid");
      console.log('Failed to load data for rsDataGrid,' + url);
      throw new Error('Failed to load data for rsDataGrid, endpoint: ' + url); //captured by $exceptionHandler decorator
    }

    /*Because the table uses the facets data to build the dynamic column headers, the facets request must be sync here as well*/
    function syncDataRequests() { 
      return $q.all([gridGetItems(), gridGetCogs(), gridGetFacets()]).then(function(resultArray) { //wait for all requests to complete
        return mergeData(resultArray);
      });
    }

    function mergeData(resultArray) { //merges items, cogs, and facets into one object
      var tempItems = resultArray[0]; 
      var tempCogs = resultArray[1]; 
      var tempFacets = resultArray[2];
      _.map(tempItems, function(item, index, list) {
        try {
          item.cogitems = tempCogs[item.id].cogitems; //adds cogitems to item
        } catch (e) {
          item.cogitems = null;
        }
      });
      tempItems = _.shuffle(tempItems); //simulated random data, remove shuffle for production
      return {"facets": tempFacets, "items": tempItems};
    }

  }
  /****** End Grid Data Service ******/
}());