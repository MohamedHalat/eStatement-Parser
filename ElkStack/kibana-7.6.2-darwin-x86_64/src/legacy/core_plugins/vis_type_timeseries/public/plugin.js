"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MetricsPlugin = void 0;

var _metrics_fn = require("./metrics_fn");

var _metrics_type = require("./metrics_type");

var _services = require("./services");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @internal */
var MetricsPlugin =
/*#__PURE__*/
function () {
  function MetricsPlugin(initializerContext) {
    _classCallCheck(this, MetricsPlugin);

    _defineProperty(this, "initializerContext", void 0);

    this.initializerContext = initializerContext;
  }

  _createClass(MetricsPlugin, [{
    key: "setup",
    value: function setup(core, _ref) {
      var expressions, visualizations;
      return regeneratorRuntime.async(function setup$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              expressions = _ref.expressions, visualizations = _ref.visualizations;
              expressions.registerFunction(_metrics_fn.createMetricsFn);
              (0, _services.setUISettings)(core.uiSettings);
              visualizations.types.createReactVisualization(_metrics_type.metricsVisDefinition);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }, {
    key: "start",
    value: function start(core) {
      // nothing to do here yet
      (0, _services.setSavedObjectsClient)(core.savedObjects);
      (0, _services.setI18n)(core.i18n);
    }
  }]);

  return MetricsPlugin;
}();

exports.MetricsPlugin = MetricsPlugin;