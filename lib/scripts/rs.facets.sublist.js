(function() {
  'use strict';

  var app = angular.module("rs.facets.sublist", []);
  var appmodule = angular.module("rs.facets.sublist");



  /****** FacetsSublist Directive ******/
  var rsFacetsSublist = function(storageService) {
    return {
      restrict: 'E',
      require: ['rsFacetsSublist','^rsFacets'],
      templateUrl: '../lib/templates/rs.facets.sublist.html',
      link: function(scope, element, attrs, controller) {
          scope.facet = angular.fromJson(attrs.facet);
          scope.sublist = controller[0].getFacetSublist(scope.facet);
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
      vm[property] = bChecked;
      vm[property+'key'] = key;
      buildFilterCriteria(property, key, bChecked);
    }
    vm.facetGroupChecked = function(property, key) {
      return (vm[property] && vm[property+'key']!=key);
    }
    vm.resetFacetCheckboxes = function(facets) {
      _.each(facets, function(obj, index, list) {
        vm[obj.property] = false;
        console.log('obj: ', obj, ' property: ', obj.property);
      });
    }
    var sortCriteria = function(key, index, list) {
      return -(vm.groupedFacets[key].length);
    }
    var buildFilterCriteria = function(property, key, bChecked) {
      if (bChecked) {
        storageService.rsDataSet.filterCriteria[property] = key;
      } else {
        storageService.rsDataSet.filterCriteria = _.omit(storageService.rsDataSet.filterCriteria, property);
      }
      applyFilter(storageService.rsDataSet.filterCriteria);
    }
    var applyFilter = function(pFilter) {
      storageService.rsDataSet.setCurrentItems(_.where(storageService.rsDataSet.getMasterData().items,pFilter));
    }
  }
/****** End Controller (Public API) ******/



}());