"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomExtentsOptions = CustomExtentsOptions;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _common = require("../../common");

var _y_extents = require("./y_extents");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function CustomExtentsOptions(_ref) {
  var axis = _ref.axis,
      setMultipleValidity = _ref.setMultipleValidity,
      setValueAxis = _ref.setValueAxis,
      setValueAxisScale = _ref.setValueAxisScale;

  var invalidBoundsMarginMessage = _i18n.i18n.translate('kbnVislibVisTypes.controls.pointSeries.valueAxes.scaleToDataBounds.minNeededBoundsMargin', {
    defaultMessage: 'Bounds margin must be greater than or equal to 0.'
  });

  var isBoundsMarginValid = !axis.scale.defaultYExtents || !axis.scale.boundsMargin || axis.scale.boundsMargin >= 0;
  var setBoundsMargin = (0, _react.useCallback)(function (paramName, value) {
    return setValueAxisScale(paramName, value === '' ? undefined : value);
  }, [setValueAxisScale]);
  var onDefaultYExtentsChange = (0, _react.useCallback)(function (paramName, value) {
    var scale = _objectSpread({}, axis.scale, _defineProperty({}, paramName, value));

    if (!scale.defaultYExtents) {
      delete scale.boundsMargin;
    }

    setValueAxis('scale', scale);
  }, [setValueAxis, axis.scale]);
  var onSetYExtentsChange = (0, _react.useCallback)(function (paramName, value) {
    var scale = _objectSpread({}, axis.scale, _defineProperty({}, paramName, value));

    if (!scale.setYExtents) {
      delete scale.min;
      delete scale.max;
    }

    setValueAxis('scale', scale);
  }, [setValueAxis, axis.scale]);
  (0, _react.useEffect)(function () {
    setMultipleValidity('boundsMargin', isBoundsMarginValid);
    return function () {
      return setMultipleValidity('boundsMargin', true);
    };
  }, [isBoundsMarginValid, setMultipleValidity]);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_common.SwitchOption, {
    label: _i18n.i18n.translate('kbnVislibVisTypes.controls.pointSeries.valueAxes.scaleToDataBoundsLabel', {
      defaultMessage: 'Scale to data bounds'
    }),
    paramName: "defaultYExtents",
    value: axis.scale.defaultYExtents,
    setValue: onDefaultYExtentsChange
  }), axis.scale.defaultYExtents && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_common.NumberInputOption, {
    error: !isBoundsMarginValid && invalidBoundsMarginMessage,
    isInvalid: !isBoundsMarginValid,
    label: _i18n.i18n.translate('kbnVislibVisTypes.controls.pointSeries.valueAxes.scaleToDataBounds.boundsMargin', {
      defaultMessage: 'Bounds margin'
    }),
    step: 0.1,
    min: 0,
    paramName: "boundsMargin",
    value: axis.scale.boundsMargin,
    setValue: setBoundsMargin
  })), _react.default.createElement(_common.SwitchOption, {
    "data-test-subj": "yAxisSetYExtents",
    label: _i18n.i18n.translate('kbnVislibVisTypes.controls.pointSeries.valueAxes.setAxisExtentsLabel', {
      defaultMessage: 'Set axis extents'
    }),
    paramName: "setYExtents",
    value: axis.scale.setYExtents,
    setValue: onSetYExtentsChange
  }), axis.scale.setYExtents && _react.default.createElement(_y_extents.YExtents, {
    scale: axis.scale,
    setScale: setValueAxisScale,
    setMultipleValidity: setMultipleValidity
  }));
}