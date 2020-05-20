"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimelionPlugin = void 0;

var _timelion_vis_fn = require("./timelion_vis_fn");

var _vis = require("./vis");

var _timechart = require("./panels/timechart/timechart");

var _plugin_services = require("./services/plugin_services");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @internal */
var TimelionPlugin =
/*#__PURE__*/
function () {
  function TimelionPlugin(initializerContext) {
    _classCallCheck(this, TimelionPlugin);

    _defineProperty(this, "initializerContext", void 0);

    this.initializerContext = initializerContext;
  }

  _createClass(TimelionPlugin, [{
    key: "setup",
    value: function setup(core, _ref) {
      var __LEGACY, expressions, visualizations, data, timelionPanels, dependencies;

      return regeneratorRuntime.async(function setup$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              __LEGACY = _ref.__LEGACY, expressions = _ref.expressions, visualizations = _ref.visualizations, data = _ref.data;
              timelionPanels = new Map();
              _context.t0 = _objectSpread;
              _context.t1 = {
                uiSettings: core.uiSettings,
                http: core.http,
                timelionPanels: timelionPanels,
                timefilter: data.query.timefilter.timefilter
              };
              _context.next = 6;
              return regeneratorRuntime.awrap(__LEGACY.setup(core, timelionPanels));

            case 6:
              _context.t2 = _context.sent;
              dependencies = (0, _context.t0)(_context.t1, _context.t2);
              this.registerPanels(dependencies);
              expressions.registerFunction(function () {
                return (0, _timelion_vis_fn.getTimelionVisualizationConfig)(dependencies);
              });
              visualizations.types.createBaseVisualization((0, _vis.getTimelionVisualization)(dependencies));

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "registerPanels",
    value: function registerPanels(dependencies) {
      var timeChartPanel = (0, _timechart.getTimeChart)(dependencies);
      dependencies.timelionPanels.set(timeChartPanel.name, timeChartPanel);
    }
  }, {
    key: "start",
    value: function start(core, plugins) {
      var timelionUiEnabled = core.injectedMetadata.getInjectedVar('timelionUiEnabled');

      if (timelionUiEnabled === false) {
        core.chrome.navLinks.update('timelion', {
          hidden: true
        });
      }

      (0, _plugin_services.setIndexPatterns)(plugins.data.indexPatterns);
      (0, _plugin_services.setSavedObjectsClient)(core.savedObjects.client);
    }
  }, {
    key: "stop",
    value: function stop() {}
  }]);

  return TimelionPlugin;
}();

exports.TimelionPlugin = TimelionPlugin;