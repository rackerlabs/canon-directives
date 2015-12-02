(function() {
  'use strict';

  angular
  .module('canon.facet.section')
  .controller('facetSectionController', facetSectionController);

  facetSectionController.$inject = ['storageService'];

  function facetSectionController(storageService) {
    var vm = this;
    vm.groupedFacets = null;
    // functions
    vm.getFacetSublist = getFacetSublist;
    vm.clickFacet = clickFacet;
    vm.facetGroupChecked = facetGroupChecked;
    vm.resetFacetCheckboxes = resetFacetCheckboxes;

    function getFacetSublist(facet) {
      var sublist = null;
      if (facet.property!=='all') {
          var items = storageService.getCurrentItems();
          vm.groupedFacets = _.groupBy(items, facet.property);
          sublist   = _.keys( vm.groupedFacets );
          sublist = _.sortBy(sublist, sortCriteria);
      }
      return sublist;
    }

    function clickFacet(property, key, bChecked) {
      buildFilter(property, key, bChecked);
      applyFilter();
      if (_.isEmpty(storageService.filterCriteria)) {
        storageService.allchecked = true;
      } else {
        storageService.allchecked = false;
      }
    }

    function facetGroupChecked(property, key) {
      return (vm[property] && vm[property+'key']!=key);
    }

    function resetFacetCheckboxes(facets) {
      _.each(facets, function(obj, index, list) {
        vm[obj.property] = false;
        console.log('obj: ', obj, ' property: ', obj.property);
      });
    }

    function sortCriteria(key, index, list) {
      return -(vm.groupedFacets[key].length);
    }

    function buildFilter(property, key, bChecked) {
      if (bChecked) {
        storageService.filterCriteria[property] = key;
      } else {
        storageService.filterCriteria = _.omit(storageService.filterCriteria, property);
      }
    }

    function applyFilter() {
      storageService.setCurrentItems(_.where(storageService.getMasterData().items, storageService.filterCriteria));
    }
  }
}());
