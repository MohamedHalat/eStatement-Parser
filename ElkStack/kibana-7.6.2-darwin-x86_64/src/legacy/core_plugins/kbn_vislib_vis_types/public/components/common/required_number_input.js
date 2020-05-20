"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NumberInputOption = NumberInputOption;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _utils = require("./utils");

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

/**
 * Use only this component instead of NumberInputOption in 'number_input.tsx'.
 * It is required for compatibility with TS 3.7.0
 *
 * @param {number} props.value Should be numeric only
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
      value = _ref.value,
      setValue = _ref.setValue,
      setValidity = _ref.setValidity,
      dataTestSubj = _ref['data-test-subj'];
  var isValid = value !== null;
  (0, _utils.useValidation)(setValidity, paramName, isValid);
  var onChange = (0, _react.useCallback)(function (ev) {
    return setValue(paramName, isNaN(ev.target.valueAsNumber) ? null : ev.target.valueAsNumber);
  }, [setValue, paramName]);
  return _react.default.createElement(_eui.EuiFormRow, {
    label: label,
    error: error,
    isInvalid: isInvalid,
    fullWidth: true,
    compressed: true
  }, _react.default.createElement(_eui.EuiFieldNumber, {
    compressed: true,
    fullWidth: true,
    required: true,
    "data-test-subj": dataTestSubj,
    disabled: disabled,
    isInvalid: !isValid,
    step: step,
    max: max,
    min: min,
    value: value === null ? '' : value,
    onChange: onChange
  }));
}