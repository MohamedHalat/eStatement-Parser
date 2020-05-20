"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputControlVisPlugin = void 0;

var _input_control_fn = require("./input_control_fn");

var _input_control_vis_type = require("./input_control_vis_type");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/** @internal */
var InputControlVisPlugin =
/*#__PURE__*/
function () {
  function InputControlVisPlugin(initializerContext) {
    _classCallCheck(this, InputControlVisPlugin);

    this.initializerContext = initializerContext;
  }

  _createClass(InputControlVisPlugin, [{
    key: "setup",
    value: function setup(core, _ref) {
      var expressions, visualizations, data, visualizationDependencies;
      return regeneratorRuntime.async(function setup$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              expressions = _ref.expressions, visualizations = _ref.visualizations, data = _ref.data;
              visualizationDependencies = {
                core: core,
                data: data
              };
              expressions.registerFunction(_input_control_fn.createInputControlVisFn);
              visualizations.types.createBaseVisualization((0, _input_control_vis_type.createInputControlVisTypeDefinition)(visualizationDependencies));

            case 4:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }, {
    key: "start",
    value: function start(core, deps) {// nothing to do here
    }
  }]);

  return InputControlVisPlugin;
}();

exports.InputControlVisPlugin = InputControlVisPlugin;