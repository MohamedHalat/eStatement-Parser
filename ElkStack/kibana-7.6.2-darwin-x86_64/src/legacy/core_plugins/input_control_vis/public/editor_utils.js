"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTitle = exports.newControl = exports.getDefaultOptions = exports.removeControl = exports.moveControl = exports.addControl = exports.setControl = exports.CONTROL_TYPES = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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
var CONTROL_TYPES = {
  LIST: 'list',
  RANGE: 'range'
};
exports.CONTROL_TYPES = CONTROL_TYPES;

var setControl = function setControl(controls, controlIndex, control) {
  return [].concat(_toConsumableArray(controls.slice(0, controlIndex)), [control], _toConsumableArray(controls.slice(controlIndex + 1)));
};

exports.setControl = setControl;

var addControl = function addControl(controls, control) {
  return [].concat(_toConsumableArray(controls), [control]);
};

exports.addControl = addControl;

var moveControl = function moveControl(controls, controlIndex, direction) {
  var newIndex;

  if (direction >= 0) {
    newIndex = controlIndex + 1;
  } else {
    newIndex = controlIndex - 1;
  }

  if (newIndex < 0) {
    // Move first item to last
    return [].concat(_toConsumableArray(controls.slice(1)), [controls[0]]);
  } else if (newIndex >= controls.length) {
    var lastItemIndex = controls.length - 1; // Move last item to first

    return [controls[lastItemIndex]].concat(_toConsumableArray(controls.slice(0, lastItemIndex)));
  } else {
    var swapped = controls.slice();
    var temp = swapped[newIndex];
    swapped[newIndex] = swapped[controlIndex];
    swapped[controlIndex] = temp;
    return swapped;
  }
};

exports.moveControl = moveControl;

var removeControl = function removeControl(controls, controlIndex) {
  return [].concat(_toConsumableArray(controls.slice(0, controlIndex)), _toConsumableArray(controls.slice(controlIndex + 1)));
};

exports.removeControl = removeControl;

var getDefaultOptions = function getDefaultOptions(type) {
  var defaultOptions = {};

  switch (type) {
    case CONTROL_TYPES.RANGE:
      defaultOptions.decimalPlaces = 0;
      defaultOptions.step = 1;
      break;

    case CONTROL_TYPES.LIST:
      defaultOptions.type = 'terms';
      defaultOptions.multiselect = true;
      defaultOptions.dynamicOptions = true;
      defaultOptions.size = 5;
      defaultOptions.order = 'desc';
      break;
  }

  return defaultOptions;
};

exports.getDefaultOptions = getDefaultOptions;

var newControl = function newControl(type) {
  return {
    id: new Date().getTime().toString(),
    indexPattern: '',
    fieldName: '',
    parent: '',
    label: '',
    type: type,
    options: getDefaultOptions(type)
  };
};

exports.newControl = newControl;

var getTitle = function getTitle(controlParams, controlIndex) {
  var title = "".concat(controlParams.type, ": ").concat(controlIndex);

  if (controlParams.label) {
    title = "".concat(controlParams.label);
  } else if (controlParams.fieldName) {
    title = "".concat(controlParams.fieldName);
  }

  return title;
};

exports.getTitle = getTitle;