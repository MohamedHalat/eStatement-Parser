"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Field = void 0;

var _react = _interopRequireDefault(require("react"));

var _hook_form_lib = require("../hook_form_lib");

var _fields = require("./fields");

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
const mapTypeToFieldComponent = {
  [_hook_form_lib.FIELD_TYPES.TEXT]: _fields.TextField,
  [_hook_form_lib.FIELD_TYPES.TEXTAREA]: _fields.TextAreaField,
  [_hook_form_lib.FIELD_TYPES.NUMBER]: _fields.NumericField,
  [_hook_form_lib.FIELD_TYPES.CHECKBOX]: _fields.CheckBoxField,
  [_hook_form_lib.FIELD_TYPES.COMBO_BOX]: _fields.ComboBoxField,
  [_hook_form_lib.FIELD_TYPES.MULTI_SELECT]: _fields.MultiSelectField,
  [_hook_form_lib.FIELD_TYPES.RADIO_GROUP]: _fields.RadioGroupField,
  [_hook_form_lib.FIELD_TYPES.RANGE]: _fields.RangeField,
  [_hook_form_lib.FIELD_TYPES.SELECT]: _fields.SelectField,
  [_hook_form_lib.FIELD_TYPES.SUPER_SELECT]: _fields.SuperSelectField,
  [_hook_form_lib.FIELD_TYPES.TOGGLE]: _fields.ToggleField
};

const Field = props => {
  const FieldComponent = mapTypeToFieldComponent[props.field.type] || _fields.TextField;
  return _react.default.createElement(FieldComponent, props);
};

exports.Field = Field;