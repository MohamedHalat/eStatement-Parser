"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SwitchOption = SwitchOption;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

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
function SwitchOption(_ref) {
  var dataTestSubj = _ref['data-test-subj'],
      tooltip = _ref.tooltip,
      label = _ref.label,
      disabled = _ref.disabled,
      paramName = _ref.paramName,
      _ref$value = _ref.value,
      value = _ref$value === void 0 ? false : _ref$value,
      setValue = _ref.setValue;
  return _react.default.createElement(_eui.EuiFormRow, {
    fullWidth: true,
    compressed: true
  }, _react.default.createElement(_eui.EuiToolTip, {
    content: tooltip,
    delay: "long",
    position: "right"
  }, _react.default.createElement(_eui.EuiSwitch, {
    compressed: true,
    label: label,
    checked: value,
    disabled: disabled,
    "data-test-subj": dataTestSubj,
    onChange: function onChange(ev) {
      return setValue(paramName, ev.target.checked);
    }
  })));
}