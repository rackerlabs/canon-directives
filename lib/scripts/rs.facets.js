(function() {
  'use strict';

  var app = angular.module("rs.facets", ["rs.facets.sublist"]);
  var appmodule = angular.module("rs.facets");

  /****** Facets Directive ******/
  var rsFacets = function(storageService) {
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
  };
  appmodule.directive("rsFacets", rsFacets);
  /****** End Facets Directive ******/

}());