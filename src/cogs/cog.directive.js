(function() {
  'use strict';
  angular
    .module("canon.cogs")
    .directive("canonCog", canonCog);

  /****** Cogs Menu Directive ******/
  function canonCog() {
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
}());
