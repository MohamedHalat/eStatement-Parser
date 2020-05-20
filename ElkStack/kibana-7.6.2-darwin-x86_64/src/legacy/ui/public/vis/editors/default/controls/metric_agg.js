"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MetricAggParamEditor = MetricAggParamEditor;
exports.aggFilter = exports.DEFAULT_OPTIONS = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _agg_utils = require("./agg_utils");

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
var aggFilter = ['!top_hits', '!percentiles', '!percentile_ranks', '!median', '!std_dev'];
exports.aggFilter = aggFilter;
var EMPTY_VALUE = 'EMPTY_VALUE';
var DEFAULT_OPTIONS = [{
  text: '',
  value: EMPTY_VALUE,
  hidden: true
}];
exports.DEFAULT_OPTIONS = DEFAULT_OPTIONS;

function MetricAggParamEditor(_ref) {
  var agg = _ref.agg,
      value = _ref.value,
      showValidation = _ref.showValidation,
      setValue = _ref.setValue,
      setValidity = _ref.setValidity,
      setTouched = _ref.setTouched,
      _ref$metricAggs = _ref.metricAggs,
      metricAggs = _ref$metricAggs === void 0 ? [] : _ref$metricAggs;

  var label = _i18n.i18n.translate('common.ui.aggTypes.metricLabel', {
    defaultMessage: 'Metric'
  });

  var isValid = !!value;
  (0, _agg_utils.useValidation)(setValidity, isValid);
  (0, _agg_utils.useFallbackMetric)(setValue, aggFilter, metricAggs, value);
  var filteredMetrics = (0, _react.useMemo)(function () {
    return metricAggs.filter(function (respAgg) {
      return respAgg.type.name !== agg.type.name;
    });
  }, [metricAggs, agg.type.name]);
  var options = (0, _agg_utils.useAvailableOptions)(aggFilter, filteredMetrics, DEFAULT_OPTIONS);
  var onChange = (0, _react.useCallback)(function (ev) {
    return setValue(ev.target.value);
  }, [setValue]);
  return _react.default.createElement(_eui.EuiFormRow, {
    label: label,
    fullWidth: true,
    isInvalid: showValidation && !isValid,
    compressed: true
  }, _react.default.createElement(_eui.EuiSelect, {
    compressed: true,
    fullWidth: true,
    options: options,
    value: value || EMPTY_VALUE,
    onChange: onChange,
    isInvalid: showValidation && !isValid,
    onBlur: setTouched,
    "data-test-subj": "visEditorSubAggMetric".concat(agg.id)
  }));
}