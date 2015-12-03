(function() {
  'use strict';

  angular
    .module("canon.facets")
    .controller("canonFacetsController", canonFacetsController);

    canonFacetsController.$inject = ['storageService']

function canonFacetsController(storageService) {
  var vm = this;
    vm.allchecked = storageService.getObject('allchecked');
    vm.clickAll = function(bChecked) {
      storageService.setObject('allchecked', bChecked);
      //storageService.rsDataSet.setObject('currentItems', storageService.rsDataSet.getObject('masterData').items);
      //$('input.checkedFacet').prop( "checked", false );
      $('input.checkedFacet').click(); //not as efficient as set currentItems above, but can't get checkboxes unchecked without problems
  }
}

}());
