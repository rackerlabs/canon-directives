(function() {
  'use strict';

  var app = angular.module("rs.data.grid", ["common.library", "rs.facets", "service.table.storage"]);
  var appmodule = angular.module("rs.data.grid");



  /****** Data Grid Directive ******/
  var rsDataGrid = function(storageService, ICONS) {
    return {
      restrict: 'E',
      templateUrl: '../lib/templates/rs.data.grid.html',
      scope: {},
      controllerAs: 'vm',
      controller: function( storageService ) {
        this.requestNewData = function() { storageService.rsDataSet.requestNewData() };
        this.orderByField = ''; //specify initial sort order
        this.reverseSort = false;
      },
      link: function(scope, element, attrs, controller) {
        scope.ICONS = ICONS;
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

  
}());