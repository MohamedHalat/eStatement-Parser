"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractReferences = extractReferences;
exports.injectReferences = injectReferences;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
function extractReferences(_ref) {
  var attributes = _ref.attributes,
      _ref$references = _ref.references,
      references = _ref$references === void 0 ? [] : _ref$references;
  var panelReferences = [];
  var panels = JSON.parse(String(attributes.panelsJSON));
  panels.forEach(function (panel, i) {
    if (!panel.type) {
      throw new Error("\"type\" attribute is missing from panel \"".concat(i, "\""));
    }

    if (!panel.id) {
      // Embeddables are not required to be backed off a saved object.
      return;
    }

    panel.panelRefName = "panel_".concat(i);
    panelReferences.push({
      name: "panel_".concat(i),
      type: panel.type,
      id: panel.id
    });
    delete panel.type;
    delete panel.id;
  });
  return {
    references: [].concat(_toConsumableArray(references), panelReferences),
    attributes: _objectSpread({}, attributes, {
      panelsJSON: JSON.stringify(panels)
    })
  };
}

function injectReferences(savedObject, references) {
  // Skip if panelsJSON is missing otherwise this will cause saved object import to fail when
  // importing objects without panelsJSON. At development time of this, there is no guarantee each saved
  // object has panelsJSON in all previous versions of kibana.
  if (typeof savedObject.panelsJSON !== 'string') {
    return;
  }

  var panels = JSON.parse(savedObject.panelsJSON); // Same here, prevent failing saved object import if ever panels aren't an array.

  if (!Array.isArray(panels)) {
    return;
  }

  panels.forEach(function (panel) {
    if (!panel.panelRefName) {
      return;
    }

    var reference = references.find(function (ref) {
      return ref.name === panel.panelRefName;
    });

    if (!reference) {
      // Throw an error since "panelRefName" means the reference exists within
      // "references" and in this scenario we have bad data.
      throw new Error("Could not find reference \"".concat(panel.panelRefName, "\""));
    }

    panel.id = reference.id;
    panel.type = reference.type;
    delete panel.panelRefName;
  });
  savedObject.panelsJSON = JSON.stringify(panels);
}