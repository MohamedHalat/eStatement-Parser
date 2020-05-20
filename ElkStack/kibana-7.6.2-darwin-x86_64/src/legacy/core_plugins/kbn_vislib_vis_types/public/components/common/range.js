"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RangeOption = RangeOption;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function RangeOption(_ref) {
  var label = _ref.label,
      max = _ref.max,
      min = _ref.min,
      showInput = _ref.showInput,
      showLabels = _ref.showLabels,
      _ref$showValue = _ref.showValue,
      showValue = _ref$showValue === void 0 ? true : _ref$showValue,
      step = _ref.step,
      paramName = _ref.paramName,
      value = _ref.value,
      setValue = _ref.setValue;

  var _useState = (0, _react.useState)(value),
      _useState2 = _slicedToArray(_useState, 2),
      stateValue = _useState2[0],
      setStateValue = _useState2[1];

  var _useState3 = (0, _react.useState)(true),
      _useState4 = _slicedToArray(_useState3, 2),
      isValidState = _useState4[0],
      setIsValidState = _useState4[1];

  var error = _i18n.i18n.translate('kbnVislibVisTypes.controls.rangeErrorMessage', {
    defaultMessage: 'Values must be on or between {min} and {max}',
    values: {
      min: min,
      max: max
    }
  });

  var onChangeHandler = function onChangeHandler(event, isValid) {
    var _ref2 = event.target,
        valueAsNumber = _ref2.valueAsNumber; // since we don't show ticks on EuiRange, the target will definitely be HTMLInputElement type, so we can cast it directly.

    setStateValue(valueAsNumber);
    setIsValidState(isValid);

    if (isValid) {
      setValue(paramName, valueAsNumber);
    }
  };

  return _react.default.createElement(_eui.EuiFormRow, {
    label: label,
    fullWidth: true,
    isInvalid: !isValidState,
    error: error,
    compressed: true
  }, _react.default.createElement(_eui.EuiRange, {
    compressed: true,
    fullWidth: true,
    max: max,
    min: min,
    showInput: showInput,
    showLabels: showLabels,
    showValue: showValue,
    step: step,
    value: stateValue,
    onChange: onChangeHandler
  }));
}