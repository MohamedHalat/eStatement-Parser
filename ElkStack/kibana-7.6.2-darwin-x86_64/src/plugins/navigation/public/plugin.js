"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationPublicPlugin = void 0;

var _top_nav_menu = require("./top_nav_menu");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var NavigationPublicPlugin =
/*#__PURE__*/
function () {
  function NavigationPublicPlugin(initializerContext) {
    _classCallCheck(this, NavigationPublicPlugin);

    _defineProperty(this, "topNavMenuExtensionsRegistry", new _top_nav_menu.TopNavMenuExtensionsRegistry());
  }

  _createClass(NavigationPublicPlugin, [{
    key: "setup",
    value: function setup(core) {
      return {
        registerMenuItem: this.topNavMenuExtensionsRegistry.register.bind(this.topNavMenuExtensionsRegistry)
      };
    }
  }, {
    key: "start",
    value: function start(core, _ref) {
      var data = _ref.data;
      var extensions = this.topNavMenuExtensionsRegistry.getAll();
      return {
        ui: {
          TopNavMenu: (0, _top_nav_menu.createTopNav)(data, extensions)
        }
      };
    }
  }, {
    key: "stop",
    value: function stop() {}
  }]);

  return NavigationPublicPlugin;
}();

exports.NavigationPublicPlugin = NavigationPublicPlugin;