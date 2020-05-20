"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LabelOptions = LabelOptions;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _common = require("../../common");

var _collections = require("../../../utils/collections");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function LabelOptions(_ref) {
  var stateParams = _ref.stateParams,
      setValue = _ref.setValue,
      axis = _ref.axis,
      axesName = _ref.axesName,
      index = _ref.index;
  var setAxisLabel = (0, _react.useCallback)(function (paramName, value) {
    var axes = _toConsumableArray(stateParams[axesName]);

    axes[index] = _objectSpread({}, axes[index], {
      labels: _objectSpread({}, axes[index].labels, _defineProperty({}, paramName, value))
    });
    setValue(axesName, axes);
  }, [axesName, index, setValue, stateParams]);
  var setAxisLabelRotate = (0, _react.useCallback)(function (paramName, value) {
    setAxisLabel(paramName, Number(value));
  }, [setAxisLabel]);
  var rotateOptions = (0, _react.useMemo)(_collections.getRotateOptions, []);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiTitle, {
    size: "xxs"
  }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "kbnVislibVisTypes.controls.pointSeries.categoryAxis.labelsTitle",
    defaultMessage: "Labels"
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_common.SwitchOption, {
    label: _i18n.i18n.translate('kbnVislibVisTypes.controls.pointSeries.categoryAxis.showLabelsLabel', {
      defaultMessage: 'Show labels'
    }),
    paramName: "show",
    value: axis.labels.show,
    setValue: setAxisLabel
  }), _react.default.createElement(_common.SwitchOption, {
    "data-test-subj": "".concat(axesName === 'valueAxes' ? 'y' : 'x', "AxisFilterLabelsCheckbox-").concat(axis.id),
    disabled: !axis.labels.show,
    label: _i18n.i18n.translate('kbnVislibVisTypes.controls.pointSeries.categoryAxis.filterLabelsLabel', {
      defaultMessage: 'Filter labels'
    }),
    paramName: "filter",
    value: axis.labels.filter,
    setValue: setAxisLabel
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "s"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_common.SelectOption, {
    disabled: !axis.labels.show,
    label: _i18n.i18n.translate('kbnVislibVisTypes.controls.pointSeries.categoryAxis.alignLabel', {
      defaultMessage: 'Align'
    }),
    options: rotateOptions,
    paramName: "rotate",
    value: axis.labels.rotate,
    setValue: setAxisLabelRotate
  })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_common.TruncateLabelsOption, {
    disabled: !axis.labels.show,
    value: axis.labels.truncate,
    setValue: setAxisLabel
  }))));
}