(function() {
  'use strict';

  var app = angular.module("rs.facets", ["rs.facets.sublist"]);
  var appmodule = angular.module("rs.facets");

  /****** Facets Directive ******/
  var rsFacets = function(storageService) {
    return {
      restrict: 'E',
      scope: {},
      require: 'rsFacets',
      templateUrl: '../lib/templates/rs.facets.html',
      link: function(scope, element, attrs, controller) {
        scope.$watch(function() {
          return storageService.rsDataSet.getFacets();
        }, function() {
          scope.facets = storageService.rsDataSet.getFacets();
        });
        scope.$watch(function() {
          return storageService.rsDataSet.allchecked;
        }, function() {
          controller.allchecked = storageService.rsDataSet.allchecked;
        });
      },
      controller: 'rsFacetsController',
      controllerAs: 'vm'
    };
  };
  appmodule.directive("rsFacets", rsFacets);
  /****** End Facets Directive ******/

  appmodule.controller('rsFacetsController', rsFacetsController);
  rsFacetsController.$inject = ['storageService'];

  function rsFacetsController(storageService) {
    var vm = this;
    vm.allchecked = storageService.rsDataSet.allchecked;
    vm.clickAll = function(bChecked) {
      storageService.rsDataSet.allchecked = bChecked;
      //storageService.rsDataSet.setCurrentItems(storageService.rsDataSet.getMasterData().items);
      //$('input.checkedFacet').prop( "checked", false );
      $('input.checkedFacet').click(); //not as efficient as setCurrentItems above, but can't get checkboxes unchecked without problems
    }
  }

}());