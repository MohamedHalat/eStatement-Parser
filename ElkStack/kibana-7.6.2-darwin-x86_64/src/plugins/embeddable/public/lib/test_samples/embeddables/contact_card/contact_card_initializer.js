"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContactCardInitializer = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ContactCardInitializer =
/*#__PURE__*/
function (_Component) {
  _inherits(ContactCardInitializer, _Component);

  function ContactCardInitializer(props) {
    var _this;

    _classCallCheck(this, ContactCardInitializer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ContactCardInitializer).call(this, props));
    _this.state = {};
    return _this;
  }

  _createClass(ContactCardInitializer, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react.default.createElement("div", null, _react.default.createElement(_eui.EuiModalHeader, null, _react.default.createElement(_eui.EuiModalHeaderTitle, null, "Create a new greeting card")), _react.default.createElement(_eui.EuiModalBody, null, _react.default.createElement(_eui.EuiForm, null, _react.default.createElement(_eui.EuiFormRow, {
        label: "First name"
      }, _react.default.createElement(_eui.EuiFieldText, {
        name: "popfirst",
        value: this.state.firstName,
        onChange: function onChange(e) {
          return _this2.setState({
            firstName: e.target.value
          });
        }
      })), _react.default.createElement(_eui.EuiFormRow, {
        label: "Last name"
      }, _react.default.createElement(_eui.EuiFieldText, {
        name: "popfirst",
        value: this.state.lastName,
        placeholder: "optional",
        onChange: function onChange(e) {
          return _this2.setState({
            lastName: e.target.value
          });
        }
      })))), _react.default.createElement(_eui.EuiModalFooter, null, _react.default.createElement(_eui.EuiButtonEmpty, {
        onClick: this.props.onCancel
      }, "Cancel"), _react.default.createElement(_eui.EuiButton, {
        isDisabled: !this.state.firstName,
        onClick: function onClick() {
          if (_this2.state.firstName) {
            _this2.props.onCreate(_objectSpread({
              firstName: _this2.state.firstName
            }, _this2.state.lastName ? {
              lastName: _this2.state.lastName
            } : {}));
          }
        },
        fill: true
      }, "Create")));
    }
  }]);

  return ContactCardInitializer;
}(_react.Component);

exports.ContactCardInitializer = ContactCardInitializer;