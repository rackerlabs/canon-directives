(function() {
  'use strict';

  angular
    .module("facets")
    .directive("facets", facets);

    facets.$inject = ['storageService'];

  function facets(storageService) {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: '../lib/templates/rs.facets.html',
      link: function(scope, element, attrs, controller) {
        scope.allchecked = true;
        scope.$watch(function() {
          return storageService.getFacets();
        }, function() {
          scope.facets = storageService.getFacets();
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
