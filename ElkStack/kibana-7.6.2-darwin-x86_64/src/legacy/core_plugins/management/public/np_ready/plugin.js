"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ManagementPlugin = void 0;

var _services = require("./services");

var _saved_objects_management = require("./services/saved_objects_management");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ManagementPlugin =
/*#__PURE__*/
function () {
  function ManagementPlugin(initializerContext) {
    _classCallCheck(this, ManagementPlugin);

    _defineProperty(this, "indexPattern", new _services.IndexPatternManagementService());

    _defineProperty(this, "savedObjects", new _saved_objects_management.SavedObjectsManagementService());
  }

  _createClass(ManagementPlugin, [{
    key: "setup",
    value: function setup(core, deps) {
      return {
        indexPattern: this.indexPattern.setup({
          httpClient: core.http
        }),
        savedObjects: this.savedObjects.setup()
      };
    }
  }, {
    key: "start",
    value: function start(core, plugins) {
      return {};
    }
  }, {
    key: "stop",
    value: function stop() {
      this.indexPattern.stop();
    }
  }]);

  return ManagementPlugin;
}();

exports.ManagementPlugin = ManagementPlugin;