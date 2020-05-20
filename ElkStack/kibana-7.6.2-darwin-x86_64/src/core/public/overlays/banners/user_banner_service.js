"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserBannerService = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _reactMarkdown = _interopRequireDefault(require("react-markdown"));

var _operators = require("rxjs/operators");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Sets up the custom banner that can be specified in advanced settings.
 * @internal
 */
var UserBannerService =
/*#__PURE__*/
function () {
  function UserBannerService() {
    _classCallCheck(this, UserBannerService);

    _defineProperty(this, "settingsSubscription", void 0);
  }

  _createClass(UserBannerService, [{
    key: "start",
    value: function start(_ref) {
      var banners = _ref.banners,
          i18n = _ref.i18n,
          uiSettings = _ref.uiSettings;
      var id;
      var timeout;

      var dismiss = function dismiss() {
        banners.remove(id);
        clearTimeout(timeout);
      };

      var updateBanner = function updateBanner() {
        var content = uiSettings.get('notifications:banner');
        var lifetime = uiSettings.get('notifications:lifetime:banner');

        if (typeof content !== 'string' || content.length === 0 || typeof lifetime !== 'number') {
          dismiss();
          return;
        }

        id = banners.replace(id, function (el) {
          _reactDom.default.render(_react.default.createElement(i18n.Context, null, _react.default.createElement(_eui.EuiCallOut, {
            title: _react.default.createElement(_react2.FormattedMessage, {
              id: "core.ui.overlays.banner.attentionTitle",
              defaultMessage: "Attention"
            }),
            iconType: "help"
          }, _react.default.createElement(_reactMarkdown.default, {
            renderers: {
              root: _react.Fragment
            }
          }, content.trim()), _react.default.createElement(_eui.EuiButton, {
            type: "primary",
            size: "s",
            onClick: function onClick() {
              return banners.remove(id);
            }
          }, _react.default.createElement(_react2.FormattedMessage, {
            id: "core.ui.overlays.banner.closeButtonLabel",
            defaultMessage: "Close"
          })))), el);

          timeout = setTimeout(dismiss, lifetime);
          return function () {
            return _reactDom.default.unmountComponentAtNode(el);
          };
        }, 100);
      };

      updateBanner();
      this.settingsSubscription = uiSettings.getUpdate$().pipe((0, _operators.filter)(function (_ref2) {
        var key = _ref2.key;
        return key === 'notifications:banner' || key === 'notifications:lifetime:banner';
      })).subscribe(function () {
        return updateBanner();
      });
    }
  }, {
    key: "stop",
    value: function stop() {
      if (this.settingsSubscription) {
        this.settingsSubscription.unsubscribe();
        this.settingsSubscription = undefined;
      }
    }
  }]);

  return UserBannerService;
}();

exports.UserBannerService = UserBannerService;