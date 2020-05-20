"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExitFullScreenButton = void 0;

var _i18n = require("@kbn/i18n");

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

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

var ExitFullScreenButtonUi =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(ExitFullScreenButtonUi, _PureComponent);

  function ExitFullScreenButtonUi() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ExitFullScreenButtonUi);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ExitFullScreenButtonUi)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (e) {
      if (e.keyCode === _eui.keyCodes.ESCAPE) {
        _this.props.onExitFullScreenMode();
      }
    });

    return _this;
  }

  _createClass(ExitFullScreenButtonUi, [{
    key: "UNSAFE_componentWillMount",
    value: function UNSAFE_componentWillMount() {
      document.addEventListener('keydown', this.onKeyDown, false);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('keydown', this.onKeyDown, false);
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement("div", null, _react.default.createElement(_eui.EuiScreenReaderOnly, null, _react.default.createElement("p", {
        "aria-live": "polite"
      }, _i18n.i18n.translate('kibana-react.exitFullScreenButton.fullScreenModeDescription', {
        defaultMessage: 'In full screen mode, press ESC to exit.'
      }))), _react.default.createElement("div", null, _react.default.createElement("button", {
        "aria-label": _i18n.i18n.translate('kibana-react.exitFullScreenButton.exitFullScreenModeButtonAriaLabel', {
          defaultMessage: 'Exit full screen mode'
        }),
        className: "dshExitFullScreenButton",
        onClick: this.props.onExitFullScreenMode
      }, _react.default.createElement("span", {
        className: "dshExitFullScreenButton__logo",
        "data-test-subj": "exitFullScreenModeLogo"
      }), _react.default.createElement("span", {
        className: "dshExitFullScreenButton__text",
        "data-test-subj": "exitFullScreenModeText"
      }, _i18n.i18n.translate('kibana-react.exitFullScreenButton.exitFullScreenModeButtonLabel', {
        defaultMessage: 'Exit full screen'
      }), _react.default.createElement(_eui.EuiIcon, {
        type: "arrowLeft",
        size: "s"
      })))));
    }
  }]);

  return ExitFullScreenButtonUi;
}(_react.PureComponent);

var ExitFullScreenButton = ExitFullScreenButtonUi;
exports.ExitFullScreenButton = ExitFullScreenButton;