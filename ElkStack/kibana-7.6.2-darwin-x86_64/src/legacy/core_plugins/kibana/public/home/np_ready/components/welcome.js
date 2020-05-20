"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Welcome = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _kibana_services = require("../../kibana_services");

var _sample_data = require("./sample_data");

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
 * Shows a full-screen welcome page that gives helpful quick links to beginners.
 */
var Welcome =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Welcome, _React$Component);

  function Welcome() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Welcome);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Welcome)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "services", (0, _kibana_services.getServices)());

    _defineProperty(_assertThisInitialized(_this), "hideOnEsc", function (e) {
      if (e.key === 'Escape') {
        _this.props.onSkip();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onSampleDataDecline", function () {
      _this.services.trackUiMetric(_this.services.METRIC_TYPE.CLICK, 'sampleDataDecline');

      _this.props.onSkip();
    });

    _defineProperty(_assertThisInitialized(_this), "onSampleDataConfirm", function () {
      _this.services.trackUiMetric(_this.services.METRIC_TYPE.CLICK, 'sampleDataConfirm');

      _this.redirecToSampleData();
    });

    _defineProperty(_assertThisInitialized(_this), "renderTelemetryEnabledOrDisabledText", function () {
      if (_this.props.currentOptInStatus) {
        return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_react2.FormattedMessage, {
          id: "kbn.home.dataManagementDisableCollection",
          defaultMessage: "To stop collection, "
        }), _react.default.createElement(_eui.EuiLink, {
          href: "#/management/kibana/settings"
        }, _react.default.createElement(_react2.FormattedMessage, {
          id: "kbn.home.dataManagementDisableCollectionLink",
          defaultMessage: "disable usage data here."
        })));
      } else {
        return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_react2.FormattedMessage, {
          id: "kbn.home.dataManagementEnableCollection",
          defaultMessage: " To start collection, "
        }), _react.default.createElement(_eui.EuiLink, {
          href: "#/management/kibana/settings"
        }, _react.default.createElement(_react2.FormattedMessage, {
          id: "kbn.home.dataManagementEnableCollectionLink",
          defaultMessage: "enable usage data here."
        })));
      }
    });

    return _this;
  }

  _createClass(Welcome, [{
    key: "redirecToSampleData",
    value: function redirecToSampleData() {
      var path = this.services.addBasePath('#/home/tutorial_directory/sampleData');
      window.location.href = path;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.services.trackUiMetric(this.services.METRIC_TYPE.LOADED, 'welcomeScreenMount');
      this.props.onOptInSeen();
      document.addEventListener('keydown', this.hideOnEsc);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('keydown', this.hideOnEsc);
    }
  }, {
    key: "render",
    value: function render() {
      var urlBasePath = this.props.urlBasePath;
      return _react.default.createElement(_eui.EuiPortal, null, _react.default.createElement("div", {
        className: "homWelcome"
      }, _react.default.createElement("header", {
        className: "homWelcome__header"
      }, _react.default.createElement("div", {
        className: "homWelcome__content eui-textCenter"
      }, _react.default.createElement(_eui.EuiSpacer, {
        size: "xl"
      }), _react.default.createElement("span", {
        className: "homWelcome__logo"
      }, _react.default.createElement(_eui.EuiIcon, {
        type: "logoKibana",
        size: "xxl"
      })), _react.default.createElement(_eui.EuiTitle, {
        size: "l",
        className: "homWelcome__title"
      }, _react.default.createElement("h1", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "kbn.home.welcomeTitle",
        defaultMessage: "Welcome to Kibana"
      }))), _react.default.createElement(_eui.EuiText, {
        size: "s",
        color: "subdued",
        className: "homWelcome__subtitle"
      }, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "kbn.home.welcomeDescription",
        defaultMessage: "Your window into the Elastic Stack"
      }))), _react.default.createElement(_eui.EuiSpacer, {
        size: "m"
      }))), _react.default.createElement("div", {
        className: "homWelcome__content homWelcome-body"
      }, _react.default.createElement(_eui.EuiFlexGroup, {
        gutterSize: "l"
      }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_sample_data.SampleDataCard, {
        urlBasePath: urlBasePath,
        onConfirm: this.onSampleDataConfirm,
        onDecline: this.onSampleDataDecline
      }), _react.default.createElement(_eui.EuiSpacer, {
        size: "s"
      }), _react.default.createElement(_eui.EuiTextColor, {
        className: "euiText--small",
        color: "subdued"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "kbn.home.dataManagementDisclaimerPrivacy",
        defaultMessage: "To learn about how usage data helps us manage and improve our products and services, see our "
      }), _react.default.createElement(_eui.EuiLink, {
        href: "https://www.elastic.co/legal/privacy-statement",
        target: "_blank",
        rel: "noopener"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "kbn.home.dataManagementDisclaimerPrivacyLink",
        defaultMessage: "Privacy Statement."
      })), this.renderTelemetryEnabledOrDisabledText()), _react.default.createElement(_eui.EuiSpacer, {
        size: "xs"
      }))))));
    }
  }]);

  return Welcome;
}(_react.default.Component);

exports.Welcome = Welcome;