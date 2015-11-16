(function() {
  'use strict';

  var app = angular.module("rs.data.grid", ["common.library", "rs.facets", "service.table.data"]);
  var appmodule = angular.module("rs.data.grid");



  /****** Data Grid Directive ******/
  var rsDataGrid = function(storageService) {
    return {
      restrict: 'E',
      templateUrl: '../lib/templates/rs.data.grid.html',
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

  
}());