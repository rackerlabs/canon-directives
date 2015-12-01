(function() {
  'use strict';
  angular
    .module("canon.table")
    .directive("canonTable", canonTable);

    canonTable.$inject = ['storageService'];

  function canonTable(storageService) {
    return {
      restrict: 'E',
      templateUrl: '../lib/templates/rs.data.grid.html',
      scope: {},
      controller: function( $scope, storageService ) {
        // $scope.currentItems = storageService.getCurrentItems();
        // $scope.facets = storageService.getMasterData().facets;
      },
      link: function(scope, element, attrs, controller) {
        console.log("fire");
        scope.$watch(function() {
          return storageService.getCurrentItems();
        }, function() {
          scope.currentItems = storageService.getCurrentItems();
        });
        scope.$watch(function() {
          return storageService.getFacets();
        }, function() {
          scope.facets = storageService.getFacets();
        });
      }
    };
  }
}());
