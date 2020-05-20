"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YExtents = YExtents;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _collections = require("../../../utils/collections");

var _common = require("../../common");

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
var rangeError = _i18n.i18n.translate('kbnVislibVisTypes.controls.pointSeries.valueAxes.minErrorMessage', {
  defaultMessage: 'Min should be less than Max.'
});

var minError = _i18n.i18n.translate('kbnVislibVisTypes.controls.pointSeries.valueAxes.minNeededScaleText', {
  defaultMessage: 'Min must exceed 0 when a log scale is selected.'
});

function areExtentsValid() {
  var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (min === null || max === null) {
    return true;
  }

  return max > min;
}

function isNullOrUndefined(value) {
  return value === null || value === undefined;
}

function YExtents(_ref) {
  var scale = _ref.scale,
      setScale = _ref.setScale,
      setMultipleValidity = _ref.setMultipleValidity;
  var min = scale.min,
      max = scale.max,
      type = scale.type;
  var errors = [];

  if (!areExtentsValid(min, max)) {
    errors.push(rangeError);
  }

  if (type === _collections.ScaleTypes.LOG && (isNullOrUndefined(min) || min <= 0)) {
    errors.push(minError);
  }

  var isValid = !errors.length;
  var setExtents = (0, _react.useCallback)(function (paramName, value) {
    setScale(paramName, value === '' ? null : value);
  }, [setScale]);
  (0, _react.useEffect)(function () {
    setMultipleValidity('yExtents', isValid);
    return function () {
      return setMultipleValidity('yExtents', true);
    };
  }, [isValid, setMultipleValidity]);
  return _react.default.createElement(_eui.EuiFormRow, {
    error: errors,
    isInvalid: !!errors.length,
    fullWidth: true,
    compressed: true
  }, _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "s"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_common.NumberInputOption, {
    "data-test-subj": "yAxisYExtentsMin",
    isInvalid: !!errors.length,
    label: _i18n.i18n.translate('kbnVislibVisTypes.controls.pointSeries.valueAxes.minLabel', {
      defaultMessage: 'Min'
    }),
    step: 0.1,
    paramName: "min",
    value: isNullOrUndefined(min) ? '' : min,
    setValue: setExtents
  })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_common.NumberInputOption, {
    "data-test-subj": "yAxisYExtentsMax",
    label: _i18n.i18n.translate('kbnVislibVisTypes.controls.pointSeries.valueAxes.maxLabel', {
      defaultMessage: 'Max'
    }),
    step: 0.1,
    paramName: "max",
    value: isNullOrUndefined(max) ? '' : max,
    setValue: setExtents
  })))));
}