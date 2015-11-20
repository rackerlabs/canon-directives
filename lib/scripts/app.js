(function() {
  //This is how a third-party app would inject this resuable devices component
  //and would also need to reference the scripts in index.html

  var app = angular.module("app.thirdparty", ["rs.data.grid"]);
  var appmodule = angular.module("app.thirdparty");

  //appmodule.constant("URLS", {ITEMS: "../test/api.devices.items.json", COGS: "../test/api.devices.cogs.json", FACETS: "../test/api.devices.facets.json"});
  //appmodule.constant("URLS", {ITEMS: "../test/api.tickets.items.json", COGS: "", FACETS: "../test/api.tickets.facets.json"});
  appmodule.constant("URLS", {ITEMS: "../test/api.devices.items2.json", COGS: "../test/api.devices.cogs2.json", FACETS: "../test/api.devices.facets.json"});

  appmodule.constant("ICONS", 
    [
    "",
    "https://fcc17225003f0eaba333-c0b791c59f5f0d6af7118a3e3fb610ed.ssl.cf2.rackcdn.com/images/common/devices/firewall.png",
    "https://fcc17225003f0eaba333-c0b791c59f5f0d6af7118a3e3fb610ed.ssl.cf2.rackcdn.com/images/common/devices/switch.png",
    "https://fcc17225003f0eaba333-c0b791c59f5f0d6af7118a3e3fb610ed.ssl.cf2.rackcdn.com/images/common/devices/virtual-machine.png",
    "https://fcc17225003f0eaba333-c0b791c59f5f0d6af7118a3e3fb610ed.ssl.cf2.rackcdn.com/images/common/devices/san.png",
    "https://fcc17225003f0eaba333-c0b791c59f5f0d6af7118a3e3fb610ed.ssl.cf2.rackcdn.com/images/common/devices/server.png",
    "https://0ffddf3700fca63d7eee-f2158e9965ca1e4dc7433839c207ae5c.ssl.cf1.rackcdn.com/site_media/images/distros/windows-20x20.png",
    "https://0ffddf3700fca63d7eee-f2158e9965ca1e4dc7433839c207ae5c.ssl.cf1.rackcdn.com/site_media/images/distros/ubuntu-20x20.png",
    "https://2d46363d269c5ff40282-30ef65f206ad6f5abce6be149b3a1169.ssl.cf2.rackcdn.com/images/common/devices/hypervisor.png",
    "https://2d46363d269c5ff40282-30ef65f206ad6f5abce6be149b3a1169.ssl.cf2.rackcdn.com/images/common/devices/hypervisor.png"
    ]
  );

  //Sample controller in parent app shows how to programmatically create an alert.
  var parentAppController = function(alerting) { //demo parent controller, alerting service from myrs.core.js
    var model = this;
    model.createAlert = function(type, message) {
      alerting.addAlert(type, message);
    }
  }
  appmodule.controller("parentAppController", parentAppController);

}());