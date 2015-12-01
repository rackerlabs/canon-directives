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
      templateUrl: 'templates/rs.facets.html',
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
