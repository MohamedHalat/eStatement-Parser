"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RenderingService = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _react2 = require("@kbn/i18n/react");

var _app_containers = require("./app_containers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Renders all Core UI in a single React tree.
 *
 * @internalRemarks Currently this only renders Chrome UI. Notifications and
 * Overlays UI should be moved here as well.
 *
 * @returns a DOM element for the legacy platform to render into.
 *
 * @internal
 */
var RenderingService =
/*#__PURE__*/
function () {
  function RenderingService() {
    _classCallCheck(this, RenderingService);
  }

  _createClass(RenderingService, [{
    key: "start",
    value: function start(_ref) {
      var application = _ref.application,
          chrome = _ref.chrome,
          injectedMetadata = _ref.injectedMetadata,
          overlays = _ref.overlays,
          targetDomElement = _ref.targetDomElement;
      var chromeUi = chrome.getHeaderComponent();
      var appUi = application.getComponent();
      var bannerUi = overlays.banners.getComponent();
      var legacyMode = injectedMetadata.getLegacyMode();
      var legacyRef = legacyMode ? _react.default.createRef() : null;

      _reactDom.default.render(_react.default.createElement(_react2.I18nProvider, null, _react.default.createElement("div", {
        className: "content",
        "data-test-subj": "kibanaChrome"
      }, chromeUi, !legacyMode && _react.default.createElement(_app_containers.AppWrapper, {
        chromeVisible$: chrome.getIsVisible$()
      }, _react.default.createElement("div", {
        className: "app-wrapper-panel"
      }, _react.default.createElement("div", {
        id: "globalBannerList"
      }, bannerUi), _react.default.createElement(_app_containers.AppContainer, {
        classes$: chrome.getApplicationClasses$()
      }, appUi))), legacyMode && _react.default.createElement("div", {
        ref: legacyRef
      }))), targetDomElement);

      return {
        // When in legacy mode, return legacy div, otherwise undefined.
        legacyTargetDomElement: legacyRef ? legacyRef.current : undefined
      };
    }
  }]);

  return RenderingService;
}();
/** @internal */


exports.RenderingService = RenderingService;