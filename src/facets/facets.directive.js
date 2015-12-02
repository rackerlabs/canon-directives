(function() {
  'use strict';

  angular
    .module("canon.facets")
    .directive("canonFacets", canonFacets);

    canonFacets.$inject = ['storageService'];

  function canonFacets(storageService) {
    return {
      restrict: 'E',
      scope: {},
      require: 'canonFacets',
      templateUrl: 'templates/facets.tpl.html',
      controller: 'canonFacetsController',
      controllerAs: 'vm',
      link: function(scope, element, attrs, controller) {
        scope.allchecked = true;
        scope.$watch(function() {
          return storageService.getFacets();
        }, function() {
          scope.facets = storageService.getFacets();
        });
        scope.$watch(function() {
          return storageService.allchecked;
        }, function() {
          controller.allchecked = storageService.allchecked;
        });
      },

    };
  }
}());
