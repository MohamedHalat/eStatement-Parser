"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VegaPlugin = void 0;

var _services = require("./services");

var _vega_fn = require("./vega_fn");

var _vega_type = require("./vega_type");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @internal */
var VegaPlugin =
/*#__PURE__*/
function () {
  function VegaPlugin(initializerContext) {
    _classCallCheck(this, VegaPlugin);

    _defineProperty(this, "initializerContext", void 0);

    this.initializerContext = initializerContext;
  }

  _createClass(VegaPlugin, [{
    key: "setup",
    value: function setup(core, _ref) {
      var data, expressions, visualizations, __LEGACY, visualizationDependencies;

      return regeneratorRuntime.async(function setup$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              data = _ref.data, expressions = _ref.expressions, visualizations = _ref.visualizations, __LEGACY = _ref.__LEGACY;
              _context.t0 = _objectSpread;
              _context.t1 = {
                core: core,
                plugins: {
                  data: data
                }
              };
              _context.next = 5;
              return regeneratorRuntime.awrap(__LEGACY.setup());

            case 5:
              _context.t2 = _context.sent;
              visualizationDependencies = (0, _context.t0)(_context.t1, _context.t2);
              expressions.registerFunction(function () {
                return (0, _vega_fn.createVegaFn)(visualizationDependencies);
              });
              visualizations.types.createBaseVisualization((0, _vega_type.createVegaTypeDefinition)(visualizationDependencies));

            case 9:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }, {
    key: "start",
    value: function start(core, _ref2) {
      var data = _ref2.data;
      (0, _services.setNotifications)(core.notifications);
      (0, _services.setSavedObjects)(core.savedObjects);
      (0, _services.setData)(data);
    }
  }]);

  return VegaPlugin;
}();

exports.VegaPlugin = VegaPlugin;