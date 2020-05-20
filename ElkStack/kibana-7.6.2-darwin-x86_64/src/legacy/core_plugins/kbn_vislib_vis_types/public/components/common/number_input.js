"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NumberInputOption = NumberInputOption;

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

/**
 * Do not use this component anymore.
 * Please, use NumberInputOption in 'required_number_input.tsx'.
 * It is required for compatibility with TS 3.7.0
 * This should be removed in the future
 */
function NumberInputOption(_ref) {
  var disabled = _ref.disabled,
      error = _ref.error,
      isInvalid = _ref.isInvalid,
      label = _ref.label,
      max = _ref.max,
      min = _ref.min,
      paramName = _ref.paramName,
      step = _ref.step,
      _ref$value = _ref.value,
      value = _ref$value === void 0 ? '' : _ref$value,
      setValue = _ref.setValue,
      dataTestSubj = _ref['data-test-subj'];
  return _react.default.createElement(_eui.EuiFormRow, {
    label: label,
    error: error,
    isInvalid: isInvalid,
    fullWidth: true,
    compressed: true
  }, _react.default.createElement(_eui.EuiFieldNumber, {
    "data-test-subj": dataTestSubj,
    disabled: disabled,
    compressed: true,
    fullWidth: true,
    isInvalid: isInvalid,
    step: step,
    max: max,
    min: min,
    value: value,
    onChange: function onChange(ev) {
      return setValue(paramName, isNaN(ev.target.valueAsNumber) ? '' : ev.target.valueAsNumber);
    }
  }));
}