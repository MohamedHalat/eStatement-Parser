"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiActionsPlugin = void 0;

var _api = require("./api");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var UiActionsPlugin =
/*#__PURE__*/
function () {
  function UiActionsPlugin(initializerContext) {
    _classCallCheck(this, UiActionsPlugin);

    _defineProperty(this, "triggers", new Map());

    _defineProperty(this, "actions", new Map());

    _defineProperty(this, "api", void 0);

    this.api = (0, _api.createApi)({
      triggers: this.triggers,
      actions: this.actions
    }).api;
  }

  _createClass(UiActionsPlugin, [{
    key: "setup",
    value: function setup(core) {
      return {
        registerTrigger: this.api.registerTrigger,
        registerAction: this.api.registerAction,
        attachAction: this.api.attachAction,
        detachAction: this.api.detachAction
      };
    }
  }, {
    key: "start",
    value: function start(core) {
      return this.api;
    }
  }, {
    key: "stop",
    value: function stop() {
      this.actions.clear();
      this.triggers.clear();
    }
  }]);

  return UiActionsPlugin;
}();

exports.UiActionsPlugin = UiActionsPlugin;