"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineOptions = LineOptions;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _common = require("../../common");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
function LineOptions(_ref) {
  var chart = _ref.chart,
      vis = _ref.vis,
      setChart = _ref.setChart;
  var setLineWidth = (0, _react.useCallback)(function (paramName, value) {
    setChart(paramName, value === '' ? undefined : value);
  }, [setChart]);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_common.SwitchOption, {
    label: _i18n.i18n.translate('kbnVislibVisTypes.controls.pointSeries.series.showLineLabel', {
      defaultMessage: 'Show line'
    }),
    paramName: "drawLinesBetweenPoints",
    value: chart.drawLinesBetweenPoints,
    setValue: setChart
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "s"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_common.SelectOption, {
    disabled: !chart.drawLinesBetweenPoints,
    label: _i18n.i18n.translate('kbnVislibVisTypes.controls.pointSeries.series.lineModeLabel', {
      defaultMessage: 'Line mode'
    }),
    options: vis.type.editorConfig.collections.interpolationModes,
    paramName: "interpolate",
    value: chart.interpolate,
    setValue: setChart
  })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_common.NumberInputOption, {
    disabled: !chart.drawLinesBetweenPoints,
    label: _i18n.i18n.translate('kbnVislibVisTypes.controls.pointSeries.series.lineWidthLabel', {
      defaultMessage: 'Line width'
    }),
    paramName: "lineWidth",
    step: 0.5,
    min: 0,
    value: chart.lineWidth,
    setValue: setLineWidth
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_common.SwitchOption, {
    label: _i18n.i18n.translate('kbnVislibVisTypes.controls.pointSeries.series.showDotsLabel', {
      defaultMessage: 'Show dots'
    }),
    paramName: "showCircles",
    value: chart.showCircles,
    setValue: setChart
  }));
}