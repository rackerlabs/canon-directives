(function() {
  'use strict';

  var app = angular.module("rs.facets", []);
  var appmodule = angular.module("rs.facets");



  /****** Facets Directive ******/
  var rsFacets = function(gridDataService) {
    return {
      restrict: 'E',
      templateUrl: 'rs.facets.html',
      link: function(scope, element, attrs, controller) {
        //controller.initializeFacets();
      },
      bindToController: true,
      controllerAs: 'vm',
      controller: rsFacetsController
    };
  };
  appmodule.directive("rsFacets", rsFacets);
  /****** End Facets Directive ******/




/****** Controller (Public API) ******/
  appmodule.controller('rsFacetsController', rsFacetsController);
  rsFacetsController.$inject = ['gridDataService'];

  function rsFacetsController(gridDataService) {
    var vm = this;

  }
/****** End Controller (Public API) ******/

}());