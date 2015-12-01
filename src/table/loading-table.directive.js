(function() {
  'use strict';

  angular
    .module("canon.table")
    .directive("canonLoadingTable", canonLoadingTable);

    canonLoadingTable.$inject = ['httpInterceptor'];

  /****** Loading Table Directive ******/
  function canonLoadingTable(httpInterceptor) {
    return {
      restrict: "A",
      scope: {},
      template: '<tr><td colspan="50" style="text-align:center"><div class="rs-table-overlay rs-table-overlay-loading"><div class="rs-table-overlay-content"><div class="rs-table-overlay-message">Loading&hellip;</div></div></div></td></tr>',
      transclude: true,
      link: function(scope, element, attribrutes, controller, transcludeFn) {
        var initialTemplate = element[0].innerHTML;
        transcludeFn(function(clone, scope) {
          scope.requestCount = 0;
          scope.$watch(function() {
            return httpInterceptor.getRequestCount();
          }, function(requestCount) {
            scope.requestCount = requestCount;
            if (element) element.empty();
            if (requestCount > 0) { //outstanding request present
              element.append(initialTemplate); //show loading icon
            } else {
              element.append(clone);
            }
          });

        });
      }
    };
  }

  /****** End Loading Table Directive ******/

}());
