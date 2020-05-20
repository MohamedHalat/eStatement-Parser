"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SeriesPanel = SeriesPanel;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _chart_options = require("./chart_options");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function SeriesPanel(props) {
  var stateParams = props.stateParams;
  return _react.default.createElement(_eui.EuiPanel, {
    paddingSize: "s"
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "xs"
  }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "kbnVislibVisTypes.controls.pointSeries.series.metricsTitle",
    defaultMessage: "Metrics"
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), stateParams.seriesParams.map(function (chart, index) {
    return _react.default.createElement(_eui.EuiAccordion, {
      id: "visEditorSeriesAccordion".concat(chart.data.id),
      key: index,
      className: "visEditorSidebar__section visEditorSidebar__collapsible",
      initialIsOpen: index === 0,
      buttonContent: chart.data.label,
      buttonContentClassName: "visEditorSidebar__aggGroupAccordionButtonContent eui-textTruncate",
      "aria-label": _i18n.i18n.translate('kbnVislibVisTypes.controls.pointSeries.seriesAccordionAriaLabel', {
        defaultMessage: 'Toggle {agg} options',
        values: {
          agg: chart.data.label
        }
      })
    }, _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
      size: "m"
    }), _react.default.createElement(_chart_options.ChartOptions, _extends({
      index: index,
      chart: chart
    }, props))));
  }));
}