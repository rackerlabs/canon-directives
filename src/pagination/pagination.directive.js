(function() {
  'use strict';

  angular
    .module("canon.pagination")
    .directive("canonPagination", canonPagination);

    canonPagination.$inject = ['storageService', 'VIEWBY']

    function canonPagination(storageService, VIEWBY) {
      return {
  		  restrict: 'E',
  		  templateUrl: 'templates/pagination.tpl.html',
  		  scope: {
  		  	itemsPerPage: '=',
  		  	currentPage: '='
  		  },
  		  link: function(scope, element, attrs, controller) {
  		  	scope.maxSize = 10; //max buttons to show
  		    scope.$watch(function() {
  		      return storageService.getCurrentItems();
  		    }, function() {
  		      scope.totalItems = storageService.getCurrentItems().length;
  		    });
  			scope.viewby = VIEWBY;
  		  }
		  };
    }

}());
