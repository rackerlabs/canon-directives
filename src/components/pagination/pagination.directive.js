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
  		      return storageService.getObject('currentItems');
  		    }, function() {
  		      scope.totalItems = storageService.getObject('currentItems').length;
  		    });
  			scope.viewby = VIEWBY;
  		  }
		  };
    }

}());
