"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TableVisPlugin = void 0;

var _table_vis_fn = require("./table_vis_fn");

var _table_vis_type = require("./table_vis_type");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @internal */
var TableVisPlugin =
/*#__PURE__*/
function () {
  function TableVisPlugin(initializerContext) {
    _classCallCheck(this, TableVisPlugin);

    _defineProperty(this, "initializerContext", void 0);

    this.initializerContext = initializerContext;
  }

  _createClass(TableVisPlugin, [{
    key: "setup",
    value: function setup(core, _ref) {
      var expressions, visualizations;
      return regeneratorRuntime.async(function setup$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              expressions = _ref.expressions, visualizations = _ref.visualizations;
              expressions.registerFunction(_table_vis_fn.createTableVisFn);
              visualizations.types.createBaseVisualization(_table_vis_type.tableVisTypeDefinition);

            case 3:
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

  return TableVisPlugin;
}();

exports.TableVisPlugin = TableVisPlugin;