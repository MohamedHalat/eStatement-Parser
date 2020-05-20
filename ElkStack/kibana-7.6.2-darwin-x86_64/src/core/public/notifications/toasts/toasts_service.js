"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToastsService = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _global_toast_list = require("./global_toast_list");

var _toasts_api = require("./toasts_api");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ToastsService =
/*#__PURE__*/
function () {
  function ToastsService() {
    _classCallCheck(this, ToastsService);

    _defineProperty(this, "api", void 0);

    _defineProperty(this, "targetDomElement", void 0);
  }

  _createClass(ToastsService, [{
    key: "setup",
    value: function setup(_ref) {
      var uiSettings = _ref.uiSettings;
      this.api = new _toasts_api.ToastsApi({
        uiSettings: uiSettings
      });
      return this.api;
    }
  }, {
    key: "start",
    value: function start(_ref2) {
      var _this = this;

      var i18n = _ref2.i18n,
          overlays = _ref2.overlays,
          targetDomElement = _ref2.targetDomElement;
      this.api.start({
        overlays: overlays,
        i18n: i18n
      });
      this.targetDomElement = targetDomElement;
      (0, _reactDom.render)(_react.default.createElement(i18n.Context, null, _react.default.createElement(_global_toast_list.GlobalToastList, {
        dismissToast: function dismissToast(toastId) {
          return _this.api.remove(toastId);
        },
        toasts$: this.api.get$()
      })), targetDomElement);
      return this.api;
    }
  }, {
    key: "stop",
    value: function stop() {
      if (this.targetDomElement) {
        (0, _reactDom.unmountComponentAtNode)(this.targetDomElement);
        this.targetDomElement.textContent = '';
      }
    }
  }]);

  return ToastsService;
}();

exports.ToastsService = ToastsService;