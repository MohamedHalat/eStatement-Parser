"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NumberRow = NumberRow;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

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
function NumberRow(_ref) {
  var autoFocus = _ref.autoFocus,
      disableDelete = _ref.disableDelete,
      model = _ref.model,
      isInvalid = _ref.isInvalid,
      labelledbyId = _ref.labelledbyId,
      range = _ref.range,
      onBlur = _ref.onBlur,
      onDelete = _ref.onDelete,
      onChange = _ref.onChange;

  var deleteBtnAriaLabel = _i18n.i18n.translate('common.ui.aggTypes.numberList.removeUnitButtonAriaLabel', {
    defaultMessage: 'Remove the rank value of {value}',
    values: {
      value: model.value
    }
  });

  var onValueChanged = (0, _react.useCallback)(function (event) {
    return onChange({
      value: event.target.value,
      id: model.id
    });
  }, [onChange, model.id]);
  var onDeleteFn = (0, _react.useCallback)(function () {
    return onDelete(model.id);
  }, [onDelete, model.id]);
  return _react.default.createElement(_eui.EuiFlexGroup, {
    responsive: false,
    alignItems: "center",
    gutterSize: "s"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFieldNumber, {
    "aria-labelledby": labelledbyId,
    autoFocus: autoFocus,
    compressed: true,
    isInvalid: isInvalid,
    placeholder: _i18n.i18n.translate('common.ui.aggTypes.numberList.enterValuePlaceholder', {
      defaultMessage: 'Enter a value'
    }),
    onChange: onValueChanged,
    value: model.value,
    fullWidth: true,
    min: range.min,
    max: range.max,
    onBlur: onBlur
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonIcon, {
    "aria-label": deleteBtnAriaLabel,
    title: deleteBtnAriaLabel,
    color: "danger",
    iconType: "trash",
    onClick: onDeleteFn,
    disabled: disableDelete
  })));
}