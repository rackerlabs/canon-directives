(function() {
  'use strict';

  var app = angular.module("rs.facets.sublist", []);
  var appmodule = angular.module("rs.facets.sublist");



  /****** FacetsSublist Directive ******/
  var rsFacetsSublist = function(gridDataService) {
    return {
      restrict: 'E',
      //require: 'rsDataGrid',
      templateUrl: 'rs.facets.sublist.html',
      link: function(scope, element, attrs, controller) {
          var facet = angular.fromJson(attrs.facet);
          controller.initializeFacets(facet);
      },
      bindToController: true,
      controllerAs: 'vm',
      controller: rsFacetsSublistController
    };
  };
  appmodule.directive("rsFacetsSublist", rsFacetsSublist);
  /****** End FacetsSublist Directive ******/



  /****** Controller (Public API) ******/
  appmodule.controller('rsFacetsSublistController', rsFacetsSublistController);
  rsFacetsSublistController.$inject = ['gridDataService'];

  function rsFacetsSublistController(gridDataService) {
    var vm = this;
    vm.keys = [];
    vm.groupedFacets = [];
    vm.masterData = null;
    vm.currentItems = null;
    vm.facets = null;
    vm.gridService = gridDataService;

    vm.changeData = function() {
      console.log('changeData: ');
      //vm.currentItems = _.where(gridService.masterData.items, {'status':'offline'});
      //gridService.currentItems = vm.currentItems;
    }
    vm.initializeFacets = function(facet) {
      gridDataService.getMasterData().then(function(data) {
        if (facet.property!=='all') {
          vm.groupedFacets = _.groupBy(data.items, facet.property);
          vm.keys   = _.keys( vm.groupedFacets );
          vm.keys = _.sortBy(vm.keys, sortCriteria);
          //console.log('vm.keys: ', vm.keys);
        }
      });
    }
    vm.change = function(property, key, bChecked) {
      console.log('property: ',property,' key: ', key, ' bChecked: ', bChecked);
      vm[property] = bChecked;
      vm[property+'key'] = key;
      vm.currentItems = null;
      //var filterCriteria = build
      //scope.allchecked = !bChecked;
      //filterItems(property, key, bChecked);
      //vm.changeData();
      //vm.getGridData();
      //vm.changeTheItems();
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
    var filterItems = function(property, key, bChecked) {
      if (bChecked) {
        //gridService.filterCriteria[property] = key;
      } else {
        //gridService.filterCriteria = _.omit(gridService.filterCriteria, property);
      }
      
    }
  }
/****** End Controller (Public API) ******/



}());