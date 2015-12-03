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
        storageService.setObject('allchecked', true);
        storageService.setObject('filterCriteria', {});
        scope.$watch(function() {
          return storageService.getObject('facets');
        }, function() {
          scope.facets = storageService.getObject('facets');
        });
        scope.$watch(function() {
          return storageService.getObject('allchecked');
        }, function() {
          controller.allchecked = storageService.getObject('allchecked');
        });
      },

    };
  }
}());
