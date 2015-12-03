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

    function getFacetSublist(facet) {
      var sublist = null;
      if (facet.property!=='all') {
          var items = storageService.getObject('currentItems');
          vm.groupedFacets = _.groupBy(items, facet.property);
          sublist   = _.keys( vm.groupedFacets );
          sublist = _.sortBy(sublist, sortCriteria);
      }
      return sublist;
    }

    function clickFacet(property, key, bChecked) {
      buildFilter(property, key, bChecked);
      applyFilter();
      if (_.isEmpty(storageService.getObject('filterCriteria'))) {
        storageService.setObject('allchecked', true);
      } else {
        storageService.setObject('allchecked', false);
      }
    }

    function facetGroupChecked(property, key) {
      return (vm[property] && vm[property+'key']!=key);
    }

    function sortCriteria(key, index, list) {
      return -(vm.groupedFacets[key].length);
    }

    function buildFilter(property, key, bChecked) {
      var tempObj = storageService.getObject('filterCriteria');
      if (bChecked) {
        tempObj[property] = key;
        storageService.setObject('filterCriteria', tempObj);
      } else {
        tempObj = _.omit(tempObj, property);
        storageService.setObject('filterCriteria', tempObj);
      }
    }

    function applyFilter() {
      storageService.setObject('currentItems', _.where(storageService.getObject('masterData').items, storageService.getObject('filterCriteria')));
    }
  }
}());
