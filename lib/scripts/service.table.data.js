(function() {
  'use strict';

  var app = angular.module("service.table.data", ["service.table.storage"]);
  
  angular.module("service.table.data").factory("gridDataService", gridDataService);
  gridDataService.$inject = ['$http', '$q', 'alerting'];

  function gridDataService($http, $q, alerting) {
    var URLS = {ITEMS: "../test/api.devices.items.json", COGS: "../test/api.devices.cogs.json", FACETS: "../test/api.devices.facets.json"};
    //var URLS = {ITEMS: "../test/api.tickets.items.json", COGS: "", FACETS: "../test/api.tickets.facets.json"};

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
}());