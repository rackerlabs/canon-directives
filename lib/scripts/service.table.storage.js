(function() {
  'use strict';

  var app = angular.module("service.table.storage", []);
  
  angular.module("service.table.storage").factory('storageService', function(gridDataService, $q){
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

}());