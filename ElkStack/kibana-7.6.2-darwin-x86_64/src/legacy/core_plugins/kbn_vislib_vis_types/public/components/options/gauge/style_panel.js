"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StylePanel = StylePanel;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _default = require("ui/vis/editors/default");

var _common = require("../../common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
function StylePanel(_ref) {
  var aggs = _ref.aggs,
      setGaugeValue = _ref.setGaugeValue,
      stateParams = _ref.stateParams,
      vis = _ref.vis;
  var diasableAlignment = aggs.bySchemaGroup(_default.AggGroupNames.Metrics).length === 1 && !aggs.bySchemaGroup(_default.AggGroupNames.Buckets);
  return _react.default.createElement(_eui.EuiPanel, {
    paddingSize: "s"
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "xs"
  }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "kbnVislibVisTypes.controls.gaugeOptions.styleTitle",
    defaultMessage: "Style"
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_common.SelectOption, {
    label: _i18n.i18n.translate('kbnVislibVisTypes.controls.gaugeOptions.gaugeTypeLabel', {
      defaultMessage: 'Gauge type'
    }),
    options: vis.type.editorConfig.collections.gaugeTypes,
    paramName: "gaugeType",
    value: stateParams.gauge.gaugeType,
    setValue: setGaugeValue
  }), _react.default.createElement(_common.SelectOption, {
    disabled: diasableAlignment,
    label: _i18n.i18n.translate('kbnVislibVisTypes.controls.gaugeOptions.alignmentLabel', {
      defaultMessage: 'Alignment'
    }),
    options: vis.type.editorConfig.collections.alignments,
    paramName: "alignment",
    value: stateParams.gauge.alignment,
    setValue: setGaugeValue
  }));
}