"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TagCloudPlugin = void 0;

var _tag_cloud_fn = require("./tag_cloud_fn");

var _tag_cloud_type = require("./tag_cloud_type");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @internal */
var TagCloudPlugin =
/*#__PURE__*/
function () {
  function TagCloudPlugin(initializerContext) {
    _classCallCheck(this, TagCloudPlugin);

    _defineProperty(this, "initializerContext", void 0);

    this.initializerContext = initializerContext;
  }

  _createClass(TagCloudPlugin, [{
    key: "setup",
    value: function setup(core, _ref) {
      var expressions = _ref.expressions,
          visualizations = _ref.visualizations;
      expressions.registerFunction(_tag_cloud_fn.createTagCloudFn);
      visualizations.types.createBaseVisualization(_tag_cloud_type.tagcloudVisDefinition);
    }
  }, {
    key: "start",
    value: function start(core) {// nothing to do here yet
    }
  }]);

  return TagCloudPlugin;
}();

exports.TagCloudPlugin = TagCloudPlugin;