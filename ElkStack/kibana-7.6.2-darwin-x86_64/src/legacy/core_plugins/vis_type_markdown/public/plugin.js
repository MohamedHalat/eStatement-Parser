"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkdownPlugin = void 0;

var _markdown_vis = require("./markdown_vis");

var _markdown_fn = require("./markdown_fn");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @internal */
var MarkdownPlugin =
/*#__PURE__*/
function () {
  function MarkdownPlugin(initializerContext) {
    _classCallCheck(this, MarkdownPlugin);

    _defineProperty(this, "initializerContext", void 0);

    this.initializerContext = initializerContext;
  }

  _createClass(MarkdownPlugin, [{
    key: "setup",
    value: function setup(core, _ref) {
      var expressions = _ref.expressions,
          visualizations = _ref.visualizations;
      visualizations.types.createReactVisualization(_markdown_vis.markdownVisDefinition);
      expressions.registerFunction(_markdown_fn.createMarkdownVisFn);
    }
  }, {
    key: "start",
    value: function start(core) {// nothing to do here yet
    }
  }]);

  return MarkdownPlugin;
}();

exports.MarkdownPlugin = MarkdownPlugin;