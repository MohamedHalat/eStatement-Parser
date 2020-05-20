"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapFormFields = exports.flattenObject = exports.unflattenObject = void 0;

var _lodash = require("lodash");

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
const unflattenObject = object => Object.entries(object).reduce((acc, [key, value]) => {
  (0, _lodash.set)(acc, key, value);
  return acc;
}, {});

exports.unflattenObject = unflattenObject;

const flattenObject = (object, to = {}, paths = []) => Object.entries(object).reduce((acc, [key, value]) => {
  const updatedPaths = [...paths, key];

  if (value !== null && !Array.isArray(value) && typeof value === 'object') {
    return flattenObject(value, to, updatedPaths);
  }

  acc[updatedPaths.join('.')] = value;
  return acc;
}, to);
/**
 * Helper to map the object of fields to any of its value
 *
 * @param formFields key value pair of path and form Fields
 * @param fn Iterator function to execute on the field
 */


exports.flattenObject = flattenObject;

const mapFormFields = (formFields, fn) => Object.entries(formFields).reduce((acc, [key, field]) => {
  acc[key] = fn(field);
  return acc;
}, {});

exports.mapFormFields = mapFormFields;