"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisualizationsPlugin = void 0;

var _types = require("./types");

var _services = require("./services");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Visualizations Plugin - public
 *
 * This plugin's stateful contracts are returned from the `setup` and `start` methods
 * below. The interfaces for these contracts are provided above.
 *
 * @internal
 */
var VisualizationsPlugin =
/*#__PURE__*/
function () {
  function VisualizationsPlugin(initializerContext) {
    _classCallCheck(this, VisualizationsPlugin);

    _defineProperty(this, "types", new _types.TypesService());
  }

  _createClass(VisualizationsPlugin, [{
    key: "setup",
    value: function setup(core) {
      (0, _services.setUISettings)(core.uiSettings);
      return {
        types: this.types.setup()
      };
    }
  }, {
    key: "start",
    value: function start(core) {
      (0, _services.setI18n)(core.i18n);
      var types = this.types.start();
      (0, _services.setTypes)(types);
      return {
        types: types
      };
    }
  }, {
    key: "stop",
    value: function stop() {
      this.types.stop();
    }
  }]);

  return VisualizationsPlugin;
}();

exports.VisualizationsPlugin = VisualizationsPlugin;