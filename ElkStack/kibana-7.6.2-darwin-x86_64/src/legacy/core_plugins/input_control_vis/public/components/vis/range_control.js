"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ceilWithPrecision = ceilWithPrecision;
exports.floorWithPrecision = floorWithPrecision;
exports.RangeControl = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _react = _interopRequireWildcard(require("react"));

var _legacy_imports = require("../../legacy_imports");

var _form_row = require("./form_row");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

function roundWithPrecision(value, decimalPlaces, roundFunction) {
  if (decimalPlaces <= 0) {
    return roundFunction(value);
  }

  var results = value;
  results = results * Math.pow(10, decimalPlaces);
  results = roundFunction(results);
  results = results / Math.pow(10, decimalPlaces);
  return results;
}

function ceilWithPrecision(value, decimalPlaces) {
  return roundWithPrecision(value, decimalPlaces, Math.ceil);
}

function floorWithPrecision(value, decimalPlaces) {
  return roundWithPrecision(value, decimalPlaces, Math.floor);
}

var RangeControl =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(RangeControl, _PureComponent);

  function RangeControl() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, RangeControl);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(RangeControl)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {});

    _defineProperty(_assertThisInitialized(_this), "onChangeComplete", _lodash.default.debounce(function (value) {
      var controlValue = {
        min: value[0],
        max: value[1]
      };

      _this.props.stageFilter(_this.props.controlIndex, controlValue);
    }, 200));

    return _this;
  }

  _createClass(RangeControl, [{
    key: "renderControl",
    value: function renderControl() {
      if (!this.props.control.isEnabled()) {
        return _react.default.createElement(_legacy_imports.ValidatedDualRange, {
          disabled: true,
          showInput: true
        });
      }

      var decimalPlaces = _lodash.default.get(this.props, 'control.options.decimalPlaces', 0);

      var min = floorWithPrecision(this.props.control.min, decimalPlaces);
      var max = ceilWithPrecision(this.props.control.max, decimalPlaces);
      var ticks = [{
        value: min,
        label: min
      }, {
        value: max,
        label: max
      }];
      return _react.default.createElement(_legacy_imports.ValidatedDualRange, {
        id: this.props.control.id,
        min: min,
        max: max,
        value: this.state.value,
        onChange: this.onChangeComplete,
        showInput: true,
        showRange: true,
        showTicks: true,
        ticks: ticks
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement(_form_row.FormRow, {
        id: this.props.control.id,
        label: this.props.control.label,
        controlIndex: this.props.controlIndex,
        disableMsg: this.props.control.isEnabled() ? undefined : this.props.control.disabledReason
      }, this.renderControl());
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var nextValue = nextProps.control.hasValue() ? [nextProps.control.value.min, nextProps.control.value.max] : ['', ''];

      if (nextProps.control.hasValue() && nextProps.control.value.min == null) {
        nextValue[0] = '';
      }

      if (nextProps.control.hasValue() && nextProps.control.value.max == null) {
        nextValue[1] = '';
      }

      if (nextValue !== prevState.prevValue) {
        return {
          value: nextValue,
          prevValue: nextValue
        };
      }

      return null;
    }
  }]);

  return RangeControl;
}(_react.PureComponent);

exports.RangeControl = RangeControl;