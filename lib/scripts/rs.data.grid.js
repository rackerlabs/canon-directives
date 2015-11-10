(function() {
  'use strict';

  var app = angular.module("rs.data.grid", ["common.library", "rs.facets", "rs.facets.sublist"]);
  var appmodule = angular.module("rs.data.grid");



  /****** Data Grid Directive ******/
  var rsDataGrid = function(gridDataService) {
    return {
      restrict: 'E',
      require: 'rsDataGrid',
      templateUrl: 'rs.data.grid.html',
      link: function(scope, element, attrs, controller) {
          controller.getGridData(); 
      },
      bindToController: true,
      controllerAs: 'vm',
      controller: rsDataGridController
    };
  };
  appmodule.directive("rsDataGrid", rsDataGrid);
  /****** End Data Grid Directive ******/
  


/****** Data Grid Controller (Public API) ******/
  appmodule.controller('rsDataGridController', rsDataGridController);
  rsDataGridController.$inject = ['gridDataService'];

  function rsDataGridController(gridDataService) {
    var vm = this;
    vm.masterData = null;
    vm.currentItems = null;
    vm.facets = null;
    vm.gridService = gridDataService;

    vm.getGridData = function(bRequestNew) {
      gridDataService.getMasterData(bRequestNew).then(function(data) {
        vm.masterData = data;
        vm.currentItems = data.items;
        //vm.currentItems = _.where(data.items, criteria);
        vm.facets = data.facets;
        //gridService.masterData = data;
      });
    }
  }
/****** End Data Grid Controller (Public API) ******/



  /****** Grid Data Service ******/
  appmodule.factory("gridDataService", gridDataService);
  gridDataService.$inject = ['$http', '$q', 'alerting'];

  function gridDataService($http, $q, alerting) {
    var URLS = {ITEMS: "api.devices.items.json", COGS: "api.devices.cogs.json", FACETS: "api.devices.facets.json"};
    //var URLs = {ITEMS: "api.tickets.items.json", COGS: "", FACETS: "api.tickets.facets.json"};
    var masterData = null;
    var currentItems = null;

    return {
      getMasterData : getMasterData,
      currentItems: currentItems
    };

    function gridGetData(url) {
      return $http.get(url)
        .then(function(response){ return response.data })
        .catch(alerting.errorHandler('Failed to load data for rsDataGrid, endpoint: ' + url)); //catches javascript errors
    }
    function getMasterData(bRequestNew) {
      if (bRequestNew) return syncDataRequests();
      return (masterData) ? $q.when(masterData) : syncDataRequests();
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

    function syncDataRequests() {
      return $q.all([gridGetItems(), gridGetCogs(), gridGetFacets()]).then(function(resultArray) { //wait for all requests to complete
        masterData = mergeData(resultArray);
        currentItems = masterData.items;
        return masterData;
      });
    }

    function mergeData(resultArray) {
      var tempItems = resultArray[0]; //before cogs are added to masterData
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