(function() {
  'use strict';
  angular
    .module("data.table")
    .directive("dataTable", dataTable);

    dataTable.$inject = ['storageService'];

  function dataTable(storageService) {
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
  }
}());
