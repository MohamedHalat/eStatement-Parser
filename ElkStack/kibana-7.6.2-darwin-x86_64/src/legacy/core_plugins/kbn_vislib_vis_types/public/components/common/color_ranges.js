"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColorRanges = ColorRanges;

var _react = _interopRequireWildcard(require("react"));

var _lodash = require("lodash");

var _i18n = require("@kbn/i18n");

var _ranges = require("ui/vis/editors/default/controls/ranges");

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
function ColorRanges(_ref) {
  var dataTestSubj = _ref['data-test-subj'],
      colorsRange = _ref.colorsRange,
      setValue = _ref.setValue,
      setValidity = _ref.setValidity,
      setTouched = _ref.setTouched;
  var addRangeValues = (0, _react.useCallback)(function () {
    var previousRange = (0, _lodash.last)(colorsRange) || {};
    var from = previousRange.to ? previousRange.to : 0;
    var to = previousRange.to ? from + (previousRange.to - (previousRange.from || 0)) : 100;
    return {
      from: from,
      to: to
    };
  }, [colorsRange]);
  var validateRange = (0, _react.useCallback)(function (_ref2, index) {
    var from = _ref2.from,
        to = _ref2.to;

    if (!colorsRange[index]) {
      return [false, false];
    }

    var leftBound = index === 0 ? -Infinity : colorsRange[index - 1].to || 0;
    var isFromValid = from >= leftBound;
    var isToValid = to >= from;
    return [isFromValid, isToValid];
  }, [colorsRange]);
  var setColorRanges = (0, _react.useCallback)(function (value) {
    return setValue('colorsRange', value);
  }, [setValue]);
  return _react.default.createElement(_ranges.RangesParamEditor, {
    "data-test-subj": dataTestSubj,
    error: _i18n.i18n.translate('kbnVislibVisTypes.controls.colorRanges.errorText', {
      defaultMessage: 'Each range should be greater than previous.'
    }),
    hidePlaceholders: true,
    value: colorsRange,
    setValue: setColorRanges,
    setValidity: setValidity,
    setTouched: setTouched,
    addRangeValues: addRangeValues,
    validateRange: validateRange
  });
}