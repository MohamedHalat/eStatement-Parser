"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LegacyDependenciesPlugin = void 0;

var _chrome = _interopRequireDefault(require("ui/chrome"));

require("ui/vis/map/service_settings");

require("ui/es");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LegacyDependenciesPlugin =
/*#__PURE__*/
function () {
  function LegacyDependenciesPlugin() {
    _classCallCheck(this, LegacyDependenciesPlugin);
  }

  _createClass(LegacyDependenciesPlugin, [{
    key: "setup",
    value: function setup() {
      var $injector;
      return regeneratorRuntime.async(function setup$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(_chrome.default.dangerouslyGetActiveInjector());

            case 2:
              $injector = _context.sent;
              return _context.abrupt("return", {
                // Client of Elastic Search.
                es: $injector.get('es'),
                // Settings for EMSClient.
                // EMSClient, which currently lives in the tile_map vis,
                //  will probably end up being exposed from the future vis_type_maps plugin,
                //  which would register both the tile_map and the region_map vis plugins.
                serviceSettings: $injector.get('serviceSettings')
              });

            case 4:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }, {
    key: "start",
    value: function start(core) {// nothing to do here yet
    }
  }]);

  return LegacyDependenciesPlugin;
}();

exports.LegacyDependenciesPlugin = LegacyDependenciesPlugin;