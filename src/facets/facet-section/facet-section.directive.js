(function() {
  'use strict';

  angular
  .module('canon.facet.section')
  .directive("canonFacetSection", canonFacetSection)

  canonFacetSection.$inject = ['storageService', 'ICONS'];

  function canonFacetSection(storageService, ICONS) {
    return {
      restrict: 'E',
      scope: {},
      require: 'canonFacetSection',
      templateUrl: 'templates/facet-sublist.tpl.html',
      controller: 'facetSectionController',
      controllerAs: 'vm',
      link: function(scope, element, attrs, controller) {
        console.log(controller);
        scope.ICONS = ICONS;
        scope.facet = angular.fromJson(attrs.facet);
        scope.$watch(function() { //refresh sublists when current items change
          return storageService.getCurrentItems();
        }, function() {
          scope.sublist = controller.getFacetSublist(scope.facet);
        });
      },
    };
  }

}());
