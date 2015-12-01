(function() {
  'use strict';

  angular
    .module("canon.button.group")
    .directive("canonButtonGroup", canonButtonGroup);

    canonButtonGroup.$inject = ['httpInterceptor'];

  /****** Loading Buttons Directive ******/
  function canonButtonGroup(httpInterceptor) {
    return {
      restrict: "E",
      transclude: true,
      scope: {},
      template: '<div class="canon-button-group"><ng-transclude></ng-transclude><i class="rs-processing-indicator" style="display:none"></i></div>',
      link: function(scope, element) {
        scope.requestCount = 0;
        scope.$watch(function() {
          return httpInterceptor.getRequestCount();
        }, function(requestCount) {
          scope.requestCount = requestCount;
          if (requestCount > 0) { //outstanding request present
            disableElements(scope, element[0]); //de-reference to unwrap jQLite object
          } else {
            enableElements(scope, element[0]);
          }
        });
      }
    };
  }

  var disableElements = function(scope, element) {
    $(element).find('a.rs-btn').not('.rs-btn-link').addClass('disabled').attr('disabled', 'disabled');
    $(element).find('a.rs-btn-link').hide();
    $(element).find('.rs-processing-indicator').show();
  }
  var enableElements = function(scope, element) {
    $(element).find('a.rs-btn').removeClass('disabled').removeAttr('disabled');
    $(element).find('a.rs-btn-link').show();
    $(element).find('.rs-processing-indicator').hide();
  }

  /****** End Loading Buttons Directive ******/
  }());
