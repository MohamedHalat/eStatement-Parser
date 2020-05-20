"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HomePublicPlugin = void 0;

var _services = require("./services");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var HomePublicPlugin =
/*#__PURE__*/
function () {
  function HomePublicPlugin() {
    _classCallCheck(this, HomePublicPlugin);

    _defineProperty(this, "featuresCatalogueRegistry", new _services.FeatureCatalogueRegistry());

    _defineProperty(this, "environmentService", new _services.EnvironmentService());

    _defineProperty(this, "tutorialService", new _services.TutorialService());
  }

  _createClass(HomePublicPlugin, [{
    key: "setup",
    value: function setup() {
      return regeneratorRuntime.async(function setup$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", {
                featureCatalogue: _objectSpread({}, this.featuresCatalogueRegistry.setup()),
                environment: _objectSpread({}, this.environmentService.setup()),
                tutorials: _objectSpread({}, this.tutorialService.setup())
              });

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "start",
    value: function start(core) {
      return regeneratorRuntime.async(function start$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", {
                featureCatalogue: _objectSpread({}, this.featuresCatalogueRegistry.start({
                  capabilities: core.application.capabilities
                })),
                tutorials: _objectSpread({}, this.tutorialService.start()),
                environment: _objectSpread({}, this.environmentService.start())
              });

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }]);

  return HomePublicPlugin;
}();
/** @public */


exports.HomePublicPlugin = HomePublicPlugin;