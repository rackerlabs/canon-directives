(function() {
  'use strict';

  angular
    .module("canon.facets")
    .controller("canonFacetsController", canonFacetsController);

    canonFacetsController.$inject = ['storageService']

function canonFacetsController(storageService) {
  var vm = this;
    vm.allchecked = storageService.allchecked;
    vm.clickAll = function(bChecked) {
    storageService.allchecked = bChecked;
    //storageService.rsDataSet.setCurrentItems(storageService.rsDataSet.getMasterData().items);
    //$('input.checkedFacet').prop( "checked", false );
    $('input.checkedFacet').click(); //not as efficient as setCurrentItems above, but can't get checkboxes unchecked without problems
  }
}

}());
