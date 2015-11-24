(function() {
  'use strict';

  angular
    .module("common.library")
    .directive("loadingTable", loadingTable);

    loadingTable.$inject = ['httpInterceptor'];

  /****** Loading Table Directive ******/
  function loadingTable(httpInterceptor) {
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

  angular
    .module("common.library")
    .directive("myrsButtongroup", myrsButtongroup);

    myrsButtongroup.$inject = ['httpInterceptor'];

  /****** Loading Buttons Directive ******/
  function myrsButtongroup(httpInterceptor) {
    return {
      restrict: "E",
      transclude: true,
      scope: {},
      template: '<div class="rs-btn-group"><ng-transclude></ng-transclude><i class="rs-processing-indicator" style="display:none"></i></div>',
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

  angular
    .module("common.library")
    .directive("rsCog", rsCog);

  /****** Cogs Menu Directive ******/
  function rsCog() {
    return {
      restrict: "E",
      scope: {
        cogitems: "="
      },
      template: '<div class="rs-dropdown" id="mycogmenu"><div class="rs-cog rs-dropdown-toggle"></div><ul class="rs-dropdown-menu hidden"><span  ng-repeat="cogitem in cogitems"><li><span class="rs-dropdown-category">{{cogitem.category}}</span></li><li ng-repeat="item in cogitem.items"><a href="{{item.url}}">{{item.link}}</a></li></span></ul></div>',
      link: function(scope, element, attributes, controller) {
        scope.$watch("cogitems", function(newitems) {
          initCogs();
        });
      }
    };
  }
  var initCogs = function() {
    $('.rs-dropdown').each(function(i, element) {
      var menu = new canon.Menu();
      menu.attach(element);
    });
  }

  /****** End Cogs Menu Directive ******/

  angular
    .module("common.library")
    .factory("alerting", alerting);

    alerting.$inject = ['$timeout'];
  /****** Alerting Service ******/
  function alerting($timeout) {
    var currentAlerts = [];
    var service = {
      addAlert : addAlert,
      removeAlert: removeAlert,
      currentAlerts: currentAlerts,
      errorHandler: errorHandler
    };

    return service;

    var addAlert = function(type, message) {
      var alert = { type: type, message: message };
      currentAlerts.push(alert);
      $timeout(function() {
        removeAlert(alert);
      }, 5000);
      throw new Error(message); //any error thrown or real is auto-sent to Airbrake.io
    };

    var removeAlert = function(alert){
      _.pull(currentAlerts, alert);
    }

    var errorHandler = function(desc) {
      return function() {
        addAlert('danger', desc);
      }
    }
  }

  /****** End Alerting Service ******/

  angular
    .module("common.library")
    .directive("alerts", alerts);

    alerts.$inject = ['alerting']

  /****** Alerting Directive ******/
  function alerts(alerting) {
    return {
      restrict: "AE",
      template: '<div ng-repeat="alert in currentAlerts" class="alert alert-{{alert.type}}">{{alert.message}}<div class="close" ng-click="removeAlert(alert)"><span class="glyphicon glyphicon-remove"></span></div></div>',
      //scope: true,
      controller: function($scope) {
        $scope.removeAlert = function(alert) {
          alerting.removeAlert(alert);
        }
      },
      link: function(scope) {
        scope.currentAlerts = alerting.currentAlerts;
      }
    }
  }
  /****** End Alerting Directive ******/

}());
