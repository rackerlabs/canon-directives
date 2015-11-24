(function() {
  'use strict';

  angular
  .module('facet.section')
  .directive("facetSection", facetSection)

  facetSection.$inject = ['storageService'];

  function facetSection(storageService) {
    return {
      restrict: 'E',
      require: ['facetSection','^facets'],
      templateUrl: '../lib/templates/rs.facets.sublist.html',
      link: function(scope, element, attrs, controller) {
        console.log(scope);
          scope.facet = angular.fromJson(attrs.facet);
          scope.$watch(function() { //refresh sublists when current items change
            return storageService.getCurrentItems();
          }, function() {
            scope.sublist = controller[0].getFacetSublist(scope.facet);
            console.log(scope.sublist);

          });
      },
      controller: 'facetSectionController',
      controllerAs: 'vm'
    };
  }

}());
