(function() {
  'use strict';
  angular
    .module("canon.table")
    .directive("canonTable", canonTable);

    canonTable.$inject = ['storageService', '$http', 'ICONS', '$sce'];

  function canonTable(storageService, $http, ICONS, $sce) {
    return {
      restrict: 'E',
      templateUrl: 'templates/table.tpl.html',
      scope: {},
      controllerAs: 'vm',
      controller: function($sce, storageService) {
        this.orderByField = ''; //specify initial sort order
        this.reverseSort = false;
        this.trustAsHtml = $sce.trustAsHtml; //allows html markup in data table
      },
      link: function(scope, element, attrs, controller) {
        scope.ICONS = ICONS;
        scope.itemsPerPage = 50;
        scope.currentPage = 1;
        $http.get("../data/" + attrs.url).success(function(){console.log("greatsuccess")});
        scope.$watch(function() {
          return storageService.getObject('currentItems');
        }, function() {
          scope.currentItems = storageService.getObject('currentItems');
        });
        scope.$watch(function() {
          return storageService.getObject('facets');
        }, function() {
          scope.facets = storageService.getObject('facets');
        });
      }
    };
  }
}());
