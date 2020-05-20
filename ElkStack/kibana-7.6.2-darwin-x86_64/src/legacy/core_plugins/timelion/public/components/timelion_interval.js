"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimelionInterval = TimelionInterval;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _agg_utils = require("ui/vis/editors/default/controls/agg_utils");

var _common = require("../../../../core_plugins/data/common");

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
var intervalOptions = [{
  label: _i18n.i18n.translate('timelion.vis.interval.auto', {
    defaultMessage: 'Auto'
  }),
  value: 'auto'
}, {
  label: _i18n.i18n.translate('timelion.vis.interval.second', {
    defaultMessage: '1 second'
  }),
  value: '1s'
}, {
  label: _i18n.i18n.translate('timelion.vis.interval.minute', {
    defaultMessage: '1 minute'
  }),
  value: '1m'
}, {
  label: _i18n.i18n.translate('timelion.vis.interval.hour', {
    defaultMessage: '1 hour'
  }),
  value: '1h'
}, {
  label: _i18n.i18n.translate('timelion.vis.interval.day', {
    defaultMessage: '1 day'
  }),
  value: '1d'
}, {
  label: _i18n.i18n.translate('timelion.vis.interval.week', {
    defaultMessage: '1 week'
  }),
  value: '1w'
}, {
  label: _i18n.i18n.translate('timelion.vis.interval.month', {
    defaultMessage: '1 month'
  }),
  value: '1M'
}, {
  label: _i18n.i18n.translate('timelion.vis.interval.year', {
    defaultMessage: '1 year'
  }),
  value: '1y'
}];

function TimelionInterval(_ref) {
  var value = _ref.value,
      setValue = _ref.setValue,
      setValidity = _ref.setValidity;
  var onCustomInterval = (0, _react.useCallback)(function (customValue) {
    setValue(customValue.trim());
  }, [setValue]);
  var onChange = (0, _react.useCallback)(function (opts) {
    setValue(opts[0] && opts[0].value || '');
  }, [setValue]);
  var selectedOptions = (0, _react.useMemo)(function () {
    return [intervalOptions.find(function (op) {
      return op.value === value;
    }) || {
      label: value,
      value: value
    }];
  }, [value]);
  var isValid = intervalOptions.some(function (int) {
    return int.value === value;
  }) || (0, _common.isValidEsInterval)(value);
  (0, _agg_utils.useValidation)(setValidity, isValid);
  return _react.default.createElement(_eui.EuiFormRow, {
    compressed: true,
    fullWidth: true,
    helpText: _i18n.i18n.translate('timelion.vis.selectIntervalHelpText', {
      defaultMessage: 'Select an option or create a custom value. Examples: 30s, 20m, 24h, 2d, 1w, 1M'
    }),
    isInvalid: !isValid,
    error: !isValid && _i18n.i18n.translate('timelion.vis.invalidIntervalErrorMessage', {
      defaultMessage: 'Invalid interval format.'
    }),
    label: _i18n.i18n.translate('timelion.vis.intervalLabel', {
      defaultMessage: 'Interval'
    })
  }, _react.default.createElement(_eui.EuiComboBox, {
    compressed: true,
    fullWidth: true,
    isInvalid: !isValid,
    onChange: onChange,
    onCreateOption: onCustomInterval,
    options: intervalOptions,
    selectedOptions: selectedOptions,
    singleSelection: {
      asPlainText: true
    },
    placeholder: _i18n.i18n.translate('timelion.vis.selectIntervalPlaceholder', {
      defaultMessage: 'Select an interval'
    })
  }));
}