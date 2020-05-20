"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UseMultiFields = void 0;

var _react = _interopRequireDefault(require("react"));

var _use_field = require("./use_field");

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
const UseMultiFields = ({
  fields,
  children
}) => {
  const fieldsArray = Object.entries(fields).reduce((acc, [fieldId, field]) => [...acc, {
    id: fieldId,
    ...field
  }], []);
  const hookFields = {};

  const renderField = index => {
    const {
      id
    } = fieldsArray[index];
    return _react.default.createElement(_use_field.UseField, fields[id], field => {
      hookFields[id] = field;
      return index === fieldsArray.length - 1 ? children(hookFields) : renderField(index + 1);
    });
  };

  if (!Boolean(fieldsArray.length)) {
    return null;
  }

  return renderField(0);
};

exports.UseMultiFields = UseMultiFields;