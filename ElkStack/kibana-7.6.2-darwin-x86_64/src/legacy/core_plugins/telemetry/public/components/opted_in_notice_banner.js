"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OptedInBanner = void 0;

var React = _interopRequireWildcard(require("react"));

var _chrome = _interopRequireDefault(require("ui/chrome"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _constants = require("../../common/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * React component for displaying the Telemetry opt-in notice.
 */
var OptedInBanner =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(OptedInBanner, _React$PureComponent);

  function OptedInBanner() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, OptedInBanner);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(OptedInBanner)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onLinkClick", function () {
      _this.props.onSeenBanner();

      return;
    });

    return _this;
  }

  _createClass(OptedInBanner, [{
    key: "render",
    value: function render() {
      return React.createElement(_eui.EuiCallOut, {
        title: "Help us improve the Elastic Stack"
      }, React.createElement(_react2.FormattedMessage, {
        id: "telemetry.telemetryOptedInNoticeDescription",
        defaultMessage: "To learn about how usage data helps us manage and improve our products and services, see our {privacyStatementLink}. To stop collection, {disableLink}.",
        values: {
          privacyStatementLink: React.createElement(_eui.EuiLink, {
            onClick: this.onLinkClick,
            href: "https://www.elastic.co/legal/privacy-statement",
            target: "_blank",
            rel: "noopener"
          }, React.createElement(_react2.FormattedMessage, {
            id: "telemetry.telemetryOptedInPrivacyStatement",
            defaultMessage: "Privacy Statement"
          })),
          disableLink: React.createElement(_eui.EuiLink, {
            href: _chrome.default.addBasePath(_constants.PATH_TO_ADVANCED_SETTINGS),
            onClick: this.onLinkClick
          }, React.createElement(_react2.FormattedMessage, {
            id: "telemetry.telemetryOptedInDisableUsage",
            defaultMessage: "disable usage data here"
          }))
        }
      }), React.createElement(_eui.EuiSpacer, {
        size: "s"
      }), React.createElement(_eui.EuiButton, {
        size: "s",
        onClick: this.props.onSeenBanner
      }, React.createElement(_react2.FormattedMessage, {
        id: "telemetry.telemetryOptedInDismissMessage",
        defaultMessage: "Dismiss"
      })));
    }
  }]);

  return OptedInBanner;
}(React.PureComponent);

exports.OptedInBanner = OptedInBanner;