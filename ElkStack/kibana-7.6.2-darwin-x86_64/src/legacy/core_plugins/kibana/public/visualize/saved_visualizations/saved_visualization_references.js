"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractReferences = extractReferences;
exports.injectReferences = injectReferences;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

  var updatedAttributes = _objectSpread({}, attributes);

  var updatedReferences = _toConsumableArray(references); // Extract saved search


  if (updatedAttributes.savedSearchId) {
    updatedReferences.push({
      name: 'search_0',
      type: 'search',
      id: String(updatedAttributes.savedSearchId)
    });
    delete updatedAttributes.savedSearchId;
    updatedAttributes.savedSearchRefName = 'search_0';
  } // Extract index patterns from controls


  if (updatedAttributes.visState) {
    var visState = JSON.parse(String(updatedAttributes.visState));
    var controls = visState.params && visState.params.controls || [];
    controls.forEach(function (control, i) {
      if (!control.indexPattern) {
        return;
      }

      control.indexPatternRefName = "control_".concat(i, "_index_pattern");
      updatedReferences.push({
        name: control.indexPatternRefName,
        type: 'index-pattern',
        id: control.indexPattern
      });
      delete control.indexPattern;
    });
    updatedAttributes.visState = JSON.stringify(visState);
  }

  return {
    references: updatedReferences,
    attributes: updatedAttributes
  };
}

function injectReferences(savedObject, references) {
  if (savedObject.savedSearchRefName) {
    var savedSearchReference = references.find(function (reference) {
      return reference.name === savedObject.savedSearchRefName;
    });

    if (!savedSearchReference) {
      throw new Error("Could not find saved search reference \"".concat(savedObject.savedSearchRefName, "\""));
    }

    savedObject.savedSearchId = savedSearchReference.id;
    delete savedObject.savedSearchRefName;
  }

  if (savedObject.visState) {
    var controls = savedObject.visState.params && savedObject.visState.params.controls || [];
    controls.forEach(function (control) {
      if (!control.indexPatternRefName) {
        return;
      }

      var reference = references.find(function (ref) {
        return ref.name === control.indexPatternRefName;
      });

      if (!reference) {
        throw new Error("Could not find index pattern reference \"".concat(control.indexPatternRefName, "\""));
      }

      control.indexPattern = reference.id;
      delete control.indexPatternRefName;
    });
  }
}