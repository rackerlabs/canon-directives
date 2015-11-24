(function() {
	'use strict';

	var app = angular.module("rs.pagination", ["ui.bootstrap"]);
  	var appmodule = angular.module("rs.pagination");

	/****** Data Grid Directive ******/
	var rsPagination = function(storageService, VIEWBY) {
		return {
		  restrict: 'E',
		  templateUrl: '../lib/templates/rs.pagination.html',
		  scope: {
		  	itemsPerPage: '=',
		  	currentPage: '='
		  },
		  link: function(scope, element, attrs, controller) {
		  	scope.maxSize = 10; //max buttons to show
		    scope.$watch(function() {
		      return storageService.rsDataSet.getCurrentItems();
		    }, function() {
		      scope.totalItems = storageService.rsDataSet.getCurrentItems().length;
		    });
			scope.viewby = VIEWBY;
		  }
		};
	};

	appmodule.directive("rsPagination", rsPagination);
  /****** End Data Grid Directive ******/

 }());