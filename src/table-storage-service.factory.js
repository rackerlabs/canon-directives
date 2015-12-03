(function() {
  'use strict';

  angular
    .module("table.storage.service")
    .factory('storageService', storageService)

    storageService.$inject = ['$q', 'tableDataService']

    function storageService($q, tableDataService) {
      var ssObj = {};

      var service = {
        getObject: getObject,
        setObject: setObject,
        requestData: requestData,
        requestNewData: requestNewData
      };

      return service;

      function getObject(pName) {
          return ssObj[pName]; //returns null if non-existent
      }

      function setObject(pName, pData) {
          ssObj[pName] = pData; //creates the object if non-existent
      }

      function requestData(bRequestNew) {
        if (bRequestNew) return tableDataService.syncDataRequests();
        return (getObject('masterData')) ? $q.when(getObject('masterData')) : tableDataService.syncDataRequests();
      }

      function requestNewData() {
        requestData(true).then(function(data) {
          setObject('masterData', data);
          setObject('currentItems', data.items);
          setObject('facets', data.facets);
        });
      }
    }
}());
