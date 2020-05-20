"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RowsOrColumnsControl = RowsOrColumnsControl;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
var PARAMS = {
  NAME: 'row',
  ROWS: 'visEditorSplitBy__true',
  COLUMNS: 'visEditorSplitBy__false'
};

function RowsOrColumnsControl(_ref) {
  var aggParams = _ref.aggParams,
      setValue = _ref.setValue;
  var idSelected = "visEditorSplitBy__".concat(aggParams.row);
  var options = [{
    id: PARAMS.ROWS,
    label: _i18n.i18n.translate('common.ui.vis.defaultEditor.controls.rowsLabel', {
      defaultMessage: 'Rows'
    })
  }, {
    id: PARAMS.COLUMNS,
    label: _i18n.i18n.translate('common.ui.vis.defaultEditor.controls.columnsLabel', {
      defaultMessage: 'Columns'
    })
  }];
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiFormRow, {
    compressed: true,
    fullWidth: true
  }, _react.default.createElement(_eui.EuiButtonGroup, {
    "data-test-subj": "visEditorSplitBy",
    legend: _i18n.i18n.translate('common.ui.vis.defaultEditor.controls.splitByLegend', {
      defaultMessage: 'Split chart by rows or columns.'
    }),
    options: options,
    isFullWidth: true,
    idSelected: idSelected,
    onChange: function onChange(optionId) {
      return setValue(aggParams, PARAMS.NAME, optionId === PARAMS.ROWS);
    }
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }));
}