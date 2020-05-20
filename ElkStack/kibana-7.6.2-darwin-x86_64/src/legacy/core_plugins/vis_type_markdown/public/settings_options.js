"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SettingsOptions = SettingsOptions;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _components = require("../../kbn_vislib_vis_types/public/components");

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
function SettingsOptions(_ref) {
  var stateParams = _ref.stateParams,
      setValue = _ref.setValue;
  return _react.default.createElement(_eui.EuiPanel, {
    paddingSize: "s"
  }, _react.default.createElement(_components.RangeOption, {
    label: _i18n.i18n.translate('visTypeMarkdown.params.fontSizeLabel', {
      defaultMessage: 'Base font size in points'
    }),
    max: 36,
    min: 8,
    paramName: "fontSize",
    showInput: true,
    value: stateParams.fontSize,
    setValue: setValue
  }), _react.default.createElement(_components.SwitchOption, {
    label: _i18n.i18n.translate('visTypeMarkdown.params.openLinksLabel', {
      defaultMessage: 'Open links in new tab'
    }),
    paramName: "openLinksInNewTab",
    value: stateParams.openLinksInNewTab,
    setValue: setValue
  }));
}