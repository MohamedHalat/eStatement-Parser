"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TagCloudOptions = TagCloudOptions;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _validated_range = require("ui/validated_range");

var _components = require("../../../kbn_vislib_vis_types/public/components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function TagCloudOptions(_ref) {
  var stateParams = _ref.stateParams,
      setValue = _ref.setValue,
      vis = _ref.vis;

  var handleFontSizeChange = function handleFontSizeChange(_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        minFontSize = _ref3[0],
        maxFontSize = _ref3[1];

    setValue('minFontSize', Number(minFontSize));
    setValue('maxFontSize', Number(maxFontSize));
  };

  var fontSizeRangeLabel = _i18n.i18n.translate('visTypeTagCloud.visParams.fontSizeLabel', {
    defaultMessage: 'Font size range in pixels'
  });

  return _react.default.createElement(_eui.EuiPanel, {
    paddingSize: "s"
  }, _react.default.createElement(_components.SelectOption, {
    label: _i18n.i18n.translate('visTypeTagCloud.visParams.textScaleLabel', {
      defaultMessage: 'Text scale'
    }),
    options: vis.type.editorConfig.collections.scales,
    paramName: "scale",
    value: stateParams.scale,
    setValue: setValue
  }), _react.default.createElement(_components.SelectOption, {
    label: _i18n.i18n.translate('visTypeTagCloud.visParams.orientationsLabel', {
      defaultMessage: 'Orientations'
    }),
    options: vis.type.editorConfig.collections.orientations,
    paramName: "orientation",
    value: stateParams.orientation,
    setValue: setValue
  }), _react.default.createElement(_validated_range.ValidatedDualRange, {
    allowEmptyRange: false,
    "aria-label": fontSizeRangeLabel,
    compressed: true,
    fullWidth: true,
    label: fontSizeRangeLabel,
    max: 100,
    min: 1,
    value: [stateParams.minFontSize, stateParams.maxFontSize],
    onChange: handleFontSizeChange,
    showInput: true
  }), _react.default.createElement(_components.SwitchOption, {
    label: _i18n.i18n.translate('visTypeTagCloud.visParams.showLabelToggleLabel', {
      defaultMessage: 'Show label'
    }),
    paramName: "showLabel",
    value: stateParams.showLabel,
    setValue: setValue
  }));
}