(function() {
  'use strict';

  var app = angular.module("rs.data.grid", ["common.library", "rs.facets", "service.table.storage", "rs.pagination"]);
  var appmodule = angular.module("rs.data.grid");



  /****** Data Grid Directive ******/
  var rsDataGrid = function(storageService, ICONS, $sce) {
    return {
      restrict: 'E',
      templateUrl: '../lib/templates/rs.data.grid.html',
      scope: {},
      controllerAs: 'vm',
      controller: function( storageService, $sce ) {
        this.requestNewData = function() { storageService.rsDataSet.requestNewData() };
        this.orderByField = ''; //specify initial sort order
        this.reverseSort = false;
        this.trustAsHtml = $sce.trustAsHtml; //allows html markup in data table 
      },
      link: function(scope, element, attrs, controller) {
        scope.ICONS = ICONS;
        scope.itemsPerPage = 50;
        scope.currentPage = 1;

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