"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.banners = exports.Banners = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _new_platform = require("ui/new_platform");

var _react2 = require("@kbn/i18n/react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var npBanners = _new_platform.npStart.core.overlays.banners;
/** compatibility layer for new platform */

var mountForComponent = function mountForComponent(component) {
  return function (element) {
    _reactDom.default.render(_react.default.createElement(_react2.I18nProvider, null, component), element);

    return function () {
      return _reactDom.default.unmountComponentAtNode(element);
    };
  };
};
/**
 * Banners represents a prioritized list of displayed components.
 */


var Banners = function Banners() {
  _classCallCheck(this, Banners);

  _defineProperty(this, "add", function (_ref) {
    var component = _ref.component,
        priority = _ref.priority;
    return npBanners.add(mountForComponent(component), priority);
  });

  _defineProperty(this, "remove", function (id) {
    return npBanners.remove(id);
  });

  _defineProperty(this, "set", function (_ref2) {
    var component = _ref2.component,
        id = _ref2.id,
        _ref2$priority = _ref2.priority,
        priority = _ref2$priority === void 0 ? 0 : _ref2$priority;
    return npBanners.replace(id, mountForComponent(component), priority);
  });
};
/**
 * A singleton instance meant to represent all Kibana banners.
 */


exports.Banners = Banners;
var banners = new Banners();
exports.banners = banners;