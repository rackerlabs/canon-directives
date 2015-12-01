(function() {
  'use strict';

  angular
  .module('canon.facet.section')
  .directive("canonFacetSection", canonFacetSection)

  canonFacetSection.$inject = ['storageService'];

  function canonFacetSection(storageService) {
    return {
      restrict: 'E',
      require: ['canonFacetSection','^canonFacets'],
      templateUrl: '../lib/templates/rs.facets.sublist.html',
      link: function(scope, element, attrs, controller) {
          scope.facet = angular.fromJson(attrs.facet);
          scope.$watch(function() { //refresh sublists when current items change
            return storageService.getCurrentItems();
          }, function() {
            scope.sublist = controller[0].getFacetSublist(scope.facet);

          });
      },
      controller: 'facetSectionController',
      controllerAs: 'vm'
    };
  }

}());
