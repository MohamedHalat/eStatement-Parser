"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValueAxesPanel = ValueAxesPanel;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _value_axis_options = require("./value_axis_options");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ValueAxesPanel(props) {
  var stateParams = props.stateParams,
      addValueAxis = props.addValueAxis,
      removeValueAxis = props.removeValueAxis;
  var getSeries = (0, _react.useCallback)(function (axis) {
    var isFirst = stateParams.valueAxes[0].id === axis.id;
    var series = stateParams.seriesParams.filter(function (serie) {
      return serie.valueAxis === axis.id || isFirst && !serie.valueAxis;
    });
    return series.map(function (serie) {
      return serie.data.label;
    }).join(', ');
  }, [stateParams.valueAxes, stateParams.seriesParams]);
  var removeButtonTooltip = (0, _react.useMemo)(function () {
    return _i18n.i18n.translate('kbnVislibVisTypes.controls.pointSeries.valueAxes.removeButtonTooltip', {
      defaultMessage: 'Remove Y-axis'
    });
  }, []);
  var renderRemoveButton = (0, _react.useCallback)(function (axis) {
    return _react.default.createElement(_eui.EuiToolTip, {
      position: "bottom",
      content: removeButtonTooltip
    }, _react.default.createElement(_eui.EuiButtonIcon, {
      color: "danger",
      iconType: "cross",
      onClick: function onClick() {
        return removeValueAxis(axis);
      },
      "aria-label": removeButtonTooltip,
      "data-test-subj": "removeValueAxisBtn"
    }));
  }, [removeValueAxis]);
  var addButtonTooltip = (0, _react.useMemo)(function () {
    return _i18n.i18n.translate('kbnVislibVisTypes.controls.pointSeries.valueAxes.addButtonTooltip', {
      defaultMessage: 'Add Y-axis'
    });
  }, []);
  var getButtonContent = (0, _react.useCallback)(function (axis) {
    var description = getSeries(axis);
    return _react.default.createElement(_react.default.Fragment, null, axis.name, ' ', _react.default.createElement(_eui.EuiToolTip, {
      content: description
    }, _react.default.createElement(_react.default.Fragment, null, description)));
  }, [getSeries]);
  return _react.default.createElement(_eui.EuiPanel, {
    paddingSize: "s"
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "none",
    justifyContent: "spaceBetween",
    alignItems: "baseline"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "xs"
  }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "kbnVislibVisTypes.controls.pointSeries.valueAxes.yAxisTitle",
    defaultMessage: "Y-axes"
  })))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiToolTip, {
    position: "bottom",
    content: addButtonTooltip
  }, _react.default.createElement(_eui.EuiButtonIcon, {
    iconType: "plusInCircleFilled",
    onClick: addValueAxis,
    "aria-label": addButtonTooltip,
    "data-test-subj": "visualizeAddYAxisButton"
  })))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), stateParams.valueAxes.map(function (axis, index) {
    return _react.default.createElement(_eui.EuiAccordion, {
      id: "yAxisAccordion".concat(axis.id),
      key: axis.id,
      "data-test-subj": "toggleYAxisOptions-".concat(axis.id),
      className: "visEditorSidebar__section visEditorSidebar__collapsible",
      initialIsOpen: false,
      buttonContent: getButtonContent(axis),
      buttonClassName: "eui-textTruncate",
      buttonContentClassName: "visEditorSidebar__aggGroupAccordionButtonContent eui-textTruncate",
      "aria-label": _i18n.i18n.translate('kbnVislibVisTypes.controls.pointSeries.valueAxes.toggleOptionsAriaLabel', {
        defaultMessage: 'Toggle {axisName} options',
        values: {
          axisName: axis.name
        }
      }),
      extraAction: stateParams.valueAxes.length === 1 ? undefined : renderRemoveButton(axis)
    }, _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
      size: "m"
    }), _react.default.createElement(_value_axis_options.ValueAxisOptions, _extends({
      axis: axis,
      index: index
    }, props))));
  }));
}