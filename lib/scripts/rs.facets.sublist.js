(function() {
  'use strict';

  var app = angular.module("rs.facets.sublist", []);
  var appmodule = angular.module("rs.facets.sublist");



  /****** FacetsSublist Directive ******/
  var rsFacetsSublist = function(storageService, ICONS) {
    return {
      scope: {},
      restrict: 'E',
      require: 'rsFacetsSublist',
      templateUrl: '../lib/templates/rs.facets.sublist.html',
      link: function(scope, element, attrs, controller) {
          scope.ICONS = ICONS;
          scope.facet = angular.fromJson(attrs.facet);
          scope.$watch(function() { //refresh sublists when current items change
            return storageService.rsDataSet.getCurrentItems();
          }, function() {
            scope.sublist = controller.getFacetSublist(scope.facet);
          });
      },
      controller: 'rsFacetsSublistController',
      controllerAs: 'vm'
    };
  };
  appmodule.directive("rsFacetsSublist", rsFacetsSublist);
  /****** End FacetsSublist Directive ******/



  /****** Controller (Public API) ******/
  appmodule.controller('rsFacetsSublistController', rsFacetsSublistController);
  rsFacetsSublistController.$inject = ['storageService'];

  function rsFacetsSublistController(storageService) {
    var vm = this;
    vm.groupedFacets = null;

    vm.getFacetSublist = function(facet) {
      var sublist = null;
      if (facet.property!=='all') {
          var items = storageService.rsDataSet.getCurrentItems();
          vm.groupedFacets = _.groupBy(items, facet.property);
          sublist   = _.keys( vm.groupedFacets );
          sublist = _.sortBy(sublist, sortCriteria);
      }
      return sublist;
    }
    vm.clickFacet = function(property, key, bChecked) {
      buildFilter(property, key, bChecked);
      applyFilter();
      if (_.isEmpty(storageService.rsDataSet.filterCriteria)) {
        storageService.rsDataSet.allchecked = true;
      } else {
        storageService.rsDataSet.allchecked = false;
      }
    }
    var sortCriteria = function(key, index, list) {
      return -(vm.groupedFacets[key].length);
    }
    var buildFilter = function(property, key, bChecked) {
      if (bChecked) {
        storageService.rsDataSet.filterCriteria[property] = key;
      } else {
        storageService.rsDataSet.filterCriteria = _.omit(storageService.rsDataSet.filterCriteria, property);
      }
    }
    var applyFilter = function() {
      storageService.rsDataSet.setCurrentItems(_.where(storageService.rsDataSet.getMasterData().items, storageService.rsDataSet.filterCriteria));
    }
  }
/****** End Controller (Public API) ******/



}());