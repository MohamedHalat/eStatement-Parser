"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisualizationsPublicPlugin = void 0;

var _range = require("./expression_functions/range");

var _vis_dimension = require("./expression_functions/vis_dimension");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var VisualizationsPublicPlugin =
/*#__PURE__*/
function () {
  function VisualizationsPublicPlugin(initializerContext) {
    _classCallCheck(this, VisualizationsPublicPlugin);
  }

  _createClass(VisualizationsPublicPlugin, [{
    key: "setup",
    value: function setup(core, _ref) {
      var expressions = _ref.expressions;
      expressions.registerFunction(_range.range);
      expressions.registerFunction(_vis_dimension.visDimension);
      return undefined;
    }
  }, {
    key: "start",
    value: function start(core, _ref2) {
      var expressions = _ref2.expressions;
      return undefined;
    }
  }, {
    key: "stop",
    value: function stop() {}
  }]);

  return VisualizationsPublicPlugin;
}();

exports.VisualizationsPublicPlugin = VisualizationsPublicPlugin;