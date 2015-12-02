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
      templateUrl: 'templates/facets.tpl.html',
      link: function(scope, element, attrs, controller) {
        scope.$watch(function() {
          return storageService.getFacets();
        }, function() {
          scope.facets = storageService.getFacets();
        });
        scope.$watch(function() {
          return storageService.allchecked;
        }, function() {
          controller.allchecked = storageService.allchecked;
          controller.allchecked = storageService.allchecked;
        });
      },
      controller: 'canonFacetsController',
      controllerAs: 'vm'
    };
  }
}());
