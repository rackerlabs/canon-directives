(function() {
  'use strict';

  angular
    .module("table.storage.service")
    .factory('storageService', storageService)

    storageService.$inject = ['$q', 'tableDataService']

    function storageService($q, tableDataService) {
      var masterData = null,
          currentItems = null,
          facets = null,
          filterCriteria = {};

      var service = {
        requestData: requestData,
        getMasterData: getMasterData,
        setMasterData: setMasterData,
        getCurrentItems: getCurrentItems,
        setCurrentItems: setCurrentItems,
      };

      return service;

      function requestData(bRequestNew) {
        if (bRequestNew) return tableDataService.syncDataRequests();
        return (masterData) ? $q.when(masterData) : tableDataService.syncDataRequests();
      }

      function getMasterData(argument) {
        return masterData;
      }

      function setMasterData(pData) {
        masterData = pData;
      }

      function getCurrentItems(argument) {
        return currentItems;
      }

      function setCurrentItems(pItems) {
        currentItems = pItems;
      }

      function getFacets() {
        return facets;
      }

      function setFacets(pItems) {
        facets = pItems;
      }
    }
}());