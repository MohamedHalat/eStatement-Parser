"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MetricVisPlugin = void 0;

var _metric_vis_fn = require("./metric_vis_fn");

var _metric_vis_type = require("./metric_vis_type");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @internal */
var MetricVisPlugin =
/*#__PURE__*/
function () {
  function MetricVisPlugin(initializerContext) {
    _classCallCheck(this, MetricVisPlugin);

    _defineProperty(this, "initializerContext", void 0);

    this.initializerContext = initializerContext;
  }

  _createClass(MetricVisPlugin, [{
    key: "setup",
    value: function setup(core, _ref) {
      var expressions = _ref.expressions,
          visualizations = _ref.visualizations;
      expressions.registerFunction(_metric_vis_fn.createMetricVisFn);
      visualizations.types.createReactVisualization(_metric_vis_type.metricVisDefinition);
    }
  }, {
    key: "start",
    value: function start(core) {// nothing to do here yet
    }
  }]);

  return MetricVisPlugin;
}();

exports.MetricVisPlugin = MetricVisPlugin;