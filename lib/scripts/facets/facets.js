(function() {
  'use strict';

  angular
    .module("facets")
    .directive("facets", facets);

  function facets(storageService) {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: '../lib/templates/rs.facets.html',
      link: function(scope, element, attrs, controller) {
        scope.allchecked = true;
        scope.$watch(function() {
          return storageService.rsDataSet.getFacets();
        }, function() {
          scope.facets = storageService.rsDataSet.getFacets();
        });
        scope.clickAll = function(bShow) {
          if (bShow) {

          }
          console.log('bShow: ',bShow);
        }
      },
      controller: function() {
        var vm = this;
        vm.clickAll = function(bShow) {
          console.log('bShow2: ',bShow);
        }
      },
      controllerAs: 'vm'
    };
  }
}());
