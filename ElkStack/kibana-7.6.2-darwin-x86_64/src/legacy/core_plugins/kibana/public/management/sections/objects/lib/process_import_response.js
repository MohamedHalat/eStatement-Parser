"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processImportResponse = processImportResponse;

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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
function processImportResponse(response) {
  // Go through the failures and split between unmatchedReferences and failedImports
  var failedImports = [];
  var unmatchedReferences = new Map();
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (response.errors || [])[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _step.value,
          error = _step$value.error,
          obj = _objectWithoutProperties(_step$value, ["error"]);

      failedImports.push({
        obj: obj,
        error: error
      });

      if (error.type !== 'missing_references') {
        continue;
      } // Currently only supports resolving references on index patterns


      var indexPatternRefs = error.references.filter(function (ref) {
        return ref.type === 'index-pattern';
      });
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = indexPatternRefs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var missingReference = _step2.value;
          var conflict = unmatchedReferences.get("".concat(missingReference.type, ":").concat(missingReference.id)) || {
            existingIndexPatternId: missingReference.id,
            list: [],
            newIndexPatternId: undefined
          };
          conflict.list.push(obj);
          unmatchedReferences.set("".concat(missingReference.type, ":").concat(missingReference.id), conflict);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return {
    failedImports: failedImports,
    unmatchedReferences: Array.from(unmatchedReferences.values()),
    // Import won't be successful in the scenario unmatched references exist, import API returned errors of type unknown or import API
    // returned errors of type missing_references.
    status: unmatchedReferences.size === 0 && !failedImports.some(function (issue) {
      return issue.error.type === 'conflict';
    }) ? 'success' : 'idle',
    importCount: response.successCount,
    conflictedSavedObjectsLinkedToSavedSearches: undefined,
    conflictedSearchDocs: undefined
  };
}