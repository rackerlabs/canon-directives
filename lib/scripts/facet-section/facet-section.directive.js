(function() {
  'use strict';

  angular
  .module('facet.section')
  .directive("facetSection", facetSection)

  var rsFacetsSublist = function(storageService) {
    return {
      restrict: 'E',
      require: ['rsFacetsSublist','^rsFacets'],
      templateUrl: '../lib/templates/rs.facets.sublist.html',
      link: function(scope, element, attrs, controller) {
          scope.facet = angular.fromJson(attrs.facet);
          scope.$watch(function() { //refresh sublists when current items change
            return storageService.rsDataSet.getCurrentItems();
          }, function() {
            scope.sublist = controller[0].getFacetSublist(scope.facet);
          });
      },
      controller: 'rsFacetsSublistController',
      controllerAs: 'vm'
    };
  };

}());
