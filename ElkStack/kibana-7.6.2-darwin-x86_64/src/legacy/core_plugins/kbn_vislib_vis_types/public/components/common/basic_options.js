"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BasicOptions = BasicOptions;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _switch = require("./switch");

var _select = require("./select");

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
function BasicOptions(_ref) {
  var stateParams = _ref.stateParams,
      setValue = _ref.setValue,
      vis = _ref.vis;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_select.SelectOption, {
    label: _i18n.i18n.translate('kbnVislibVisTypes.controls.vislibBasicOptions.legendPositionLabel', {
      defaultMessage: 'Legend position'
    }),
    options: vis.type.editorConfig.collections.legendPositions,
    paramName: "legendPosition",
    value: stateParams.legendPosition,
    setValue: setValue
  }), _react.default.createElement(_switch.SwitchOption, {
    label: _i18n.i18n.translate('kbnVislibVisTypes.controls.vislibBasicOptions.showTooltipLabel', {
      defaultMessage: 'Show tooltip'
    }),
    paramName: "addTooltip",
    value: stateParams.addTooltip,
    setValue: setValue
  }));
}