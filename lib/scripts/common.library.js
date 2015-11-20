(function() {
  'use strict';

  var app = angular.module("common.library", []);
  var appmodule = angular.module("common.library");
  

  /****** HTTP Interceptor ******/
  var httpInterceptor = function($q, $timeout) {
    var requests = 0;
    var delayInMilliseconds = 2000;

    var request = function(config) {
      requests += 1;
      return $q.when(config);
    }
    var requestError = function(error) {
      requests -= 1;
      return $q.reject(response);
    }
    var response = function(response) {

      //--------Simulated Delay-------//
      var deferred = $q.defer();
      /*$timeout(
        function() {
          deferred.resolve(response); //simulate a delay
          requests -= 1;
        },
        delayInMilliseconds,
        false //no need to trigger a $digest, the $q service does that when request resolves
      );
      return (deferred.promise);*/
      //--------End Simulated Delay-------//

      //For producrtion: remove above delay and uncomment next lines
      requests -= 1;
      return $q.when(response);
    }
    var responseError = function(error) {

      //--------Simulated Delay-------//
      var deferred = $q.defer();
      /*$timeout(
        function() {
          deferred.reject(response); //rejected bad response //simulate a delay
          requests -= 1;
        },
        delayInMilliseconds,
        false //no need to trigger a $digest, the $q service does that when request resolves
      );
      return (deferred.promise);*/
      //--------End Simulated Delay-------//

      //For producrtion: remove above delay and uncomment next lines
      requests -= 1;
      return $q.reject(response);
    }
    var getRequestCount = function() {
      return requests;
    }

    return {
      request: request,
      response: response,
      requestError: requestError,
      responseError: responseError,
      getRequestCount: getRequestCount
    }
  }

  appmodule.factory("httpInterceptor", httpInterceptor);
  appmodule.config(function($httpProvider) {
    $httpProvider.interceptors.push("httpInterceptor");
  });
  /****** End HTTP Interceptor ******/



  /****** Exception Handler Decorator ******/
  appmodule.config(function($provide) {
    $provide.decorator("$exceptionHandler", function($delegate) {
      return function(exception, cause) {
        $delegate(exception, cause);
        var airbrake = new airbrakeJs.Client({
          projectId: 115430,
          projectKey: "e6a55ac2734fa6b4cb19816164f752d2"
        });
        exception.params = {
          cause: cause
        };
        airbrake.notify(exception);
      }
    });
  });
  /****** End Exception Handler Decorator ******/



  /****** Loading Table Directive ******/
  var loadingTable = function(httpInterceptor) {
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
  };

  appmodule.directive("loadingTable", loadingTable);
  /****** End Loading Table Directive ******/



  /****** Loading Buttons Directive ******/
  var myrsButtongroup = function(httpInterceptor) {
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
  };

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

  appmodule.directive("myrsButtongroup", myrsButtongroup);
  /****** End Loading Buttons Directive ******/



  /****** Cogs Menu Directive ******/
  var rsCog = function() {
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
  };
  var initCogs = function() {
    $('.rs-dropdown').each(function(i, element) {
      var menu = new canon.Menu();
      menu.attach(element);
    });
  }

  appmodule.directive("rsCog", rsCog);
  /****** End Cogs Menu Directive ******/



  /****** Alerting Service ******/
  var alerting = function($timeout) {
    var currentAlerts = [];

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
    
    return {
      addAlert : addAlert,
      removeAlert: removeAlert,
      currentAlerts: currentAlerts,
      errorHandler: errorHandler
    };
  }

  appmodule.factory("alerting", alerting);
  /****** End Alerting Service ******/
  
  
  
  /****** Alerting Directive ******/
  var alerts = function(alerting) {
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
  };
  
  appmodule.directive("alerts", alerts);
  /****** End Alerting Directive ******/

}());