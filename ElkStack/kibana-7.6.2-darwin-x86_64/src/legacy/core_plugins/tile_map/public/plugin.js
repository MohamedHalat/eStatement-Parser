"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TileMapPlugin = void 0;

var _tile_map_fn = require("./tile_map_fn");

var _tile_map_type = require("./tile_map_type");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @internal */
var TileMapPlugin =
/*#__PURE__*/
function () {
  function TileMapPlugin(initializerContext) {
    _classCallCheck(this, TileMapPlugin);

    _defineProperty(this, "initializerContext", void 0);

    this.initializerContext = initializerContext;
  }

  _createClass(TileMapPlugin, [{
    key: "setup",
    value: function setup(core, _ref) {
      var expressions, visualizations, __LEGACY, visualizationDependencies;

      return regeneratorRuntime.async(function setup$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              expressions = _ref.expressions, visualizations = _ref.visualizations, __LEGACY = _ref.__LEGACY;
              _context.t0 = _objectSpread;
              _context.t1 = {
                uiSettings: core.uiSettings
              };
              _context.next = 5;
              return regeneratorRuntime.awrap(__LEGACY.setup());

            case 5:
              _context.t2 = _context.sent;
              visualizationDependencies = (0, _context.t0)(_context.t1, _context.t2);
              expressions.registerFunction(function () {
                return (0, _tile_map_fn.createTileMapFn)(visualizationDependencies);
              });
              visualizations.types.createBaseVisualization((0, _tile_map_type.createTileMapTypeDefinition)(visualizationDependencies));

            case 9:
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

  return TileMapPlugin;
}();

exports.TileMapPlugin = TileMapPlugin;