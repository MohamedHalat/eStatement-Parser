"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColorSchemaOptions = ColorSchemaOptions;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _select = require("./select");

var _switch = require("./switch");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ColorSchemaOptions(_ref) {
  var disabled = _ref.disabled,
      colorSchema = _ref.colorSchema,
      colorSchemas = _ref.colorSchemas,
      invertColors = _ref.invertColors,
      uiState = _ref.uiState,
      setValue = _ref.setValue,
      _ref$showHelpText = _ref.showHelpText,
      showHelpText = _ref$showHelpText === void 0 ? true : _ref$showHelpText;

  var _useState = (0, _react.useState)(function () {
    return !!uiState.get('vis.colors');
  }),
      _useState2 = _slicedToArray(_useState, 2),
      isCustomColors = _useState2[0],
      setIsCustomColors = _useState2[1];

  (0, _react.useEffect)(function () {
    uiState.on('colorChanged', function () {
      setIsCustomColors(true);
    });
  }, [uiState]);

  var resetColorsButton = _react.default.createElement(_eui.EuiText, {
    size: "xs"
  }, _react.default.createElement(_eui.EuiLink, {
    onClick: function onClick() {
      uiState.set('vis.colors', null);
      setIsCustomColors(false);
    }
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "kbnVislibVisTypes.controls.colorSchema.resetColorsButtonLabel",
    defaultMessage: "Reset colors"
  })));

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_select.SelectOption, {
    disabled: disabled,
    helpText: showHelpText && _i18n.i18n.translate('kbnVislibVisTypes.controls.colorSchema.howToChangeColorsDescription', {
      defaultMessage: 'Individual colors can be changed in the legend.'
    }),
    label: _i18n.i18n.translate('kbnVislibVisTypes.controls.colorSchema.colorSchemaLabel', {
      defaultMessage: 'Color schema'
    }),
    labelAppend: isCustomColors && resetColorsButton,
    options: colorSchemas,
    paramName: "colorSchema",
    value: colorSchema,
    setValue: setValue
  }), _react.default.createElement(_switch.SwitchOption, {
    disabled: disabled,
    label: _i18n.i18n.translate('kbnVislibVisTypes.controls.colorSchema.reverseColorSchemaLabel', {
      defaultMessage: 'Reverse schema'
    }),
    paramName: "invertColors",
    value: invertColors,
    setValue: setValue
  }));
}