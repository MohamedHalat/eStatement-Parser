"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DocViewTableRow = DocViewTableRow;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _kibana_services = require("../../../kibana_services");

var _table_row_btn_filter_add = require("./table_row_btn_filter_add");

var _table_row_btn_filter_remove = require("./table_row_btn_filter_remove");

var _table_row_btn_toggle_column = require("./table_row_btn_toggle_column");

var _table_row_btn_collapse = require("./table_row_btn_collapse");

var _table_row_btn_filter_exists = require("./table_row_btn_filter_exists");

var _table_row_icon_no_mapping = require("./table_row_icon_no_mapping");

var _table_row_icon_underscore = require("./table_row_icon_underscore");

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
function DocViewTableRow(_ref) {
  var field = _ref.field,
      fieldMapping = _ref.fieldMapping,
      fieldType = _ref.fieldType,
      displayNoMappingWarning = _ref.displayNoMappingWarning,
      displayUnderscoreWarning = _ref.displayUnderscoreWarning,
      isCollapsible = _ref.isCollapsible,
      isCollapsed = _ref.isCollapsed,
      isColumnActive = _ref.isColumnActive,
      onFilter = _ref.onFilter,
      onToggleCollapse = _ref.onToggleCollapse,
      onToggleColumn = _ref.onToggleColumn,
      value = _ref.value,
      valueRaw = _ref.valueRaw;
  var valueClassName = (0, _classnames.default)({
    kbnDocViewer__value: true,
    'truncate-by-height': isCollapsible && isCollapsed
  });
  return _react.default.createElement("tr", {
    key: field,
    "data-test-subj": "tableDocViewRow-".concat(field)
  }, typeof onFilter === 'function' && _react.default.createElement("td", {
    className: "kbnDocViewer__buttons"
  }, _react.default.createElement(_table_row_btn_filter_add.DocViewTableRowBtnFilterAdd, {
    disabled: !fieldMapping || !fieldMapping.filterable,
    onClick: function onClick() {
      return onFilter(fieldMapping, valueRaw, '+');
    }
  }), _react.default.createElement(_table_row_btn_filter_remove.DocViewTableRowBtnFilterRemove, {
    disabled: !fieldMapping || !fieldMapping.filterable,
    onClick: function onClick() {
      return onFilter(fieldMapping, valueRaw, '-');
    }
  }), typeof onToggleColumn === 'function' && _react.default.createElement(_table_row_btn_toggle_column.DocViewTableRowBtnToggleColumn, {
    active: isColumnActive,
    onClick: onToggleColumn
  }), _react.default.createElement(_table_row_btn_filter_exists.DocViewTableRowBtnFilterExists, {
    disabled: !fieldMapping || !fieldMapping.filterable,
    onClick: function onClick() {
      return onFilter('_exists_', field, '+');
    },
    scripted: fieldMapping && fieldMapping.scripted
  })), _react.default.createElement("td", {
    className: "kbnDocViewer__field"
  }, _react.default.createElement(_kibana_services.FieldName, {
    field: fieldMapping,
    fieldName: field,
    fieldType: fieldType
  })), _react.default.createElement("td", null, isCollapsible && _react.default.createElement(_table_row_btn_collapse.DocViewTableRowBtnCollapse, {
    onClick: onToggleCollapse,
    isCollapsed: isCollapsed
  }), displayUnderscoreWarning && _react.default.createElement(_table_row_icon_underscore.DocViewTableRowIconUnderscore, null), displayNoMappingWarning && _react.default.createElement(_table_row_icon_no_mapping.DocViewTableRowIconNoMapping, null), _react.default.createElement("div", {
    className: valueClassName,
    "data-test-subj": "tableDocViewRow-".concat(field, "-value")
    /*
     * Justification for dangerouslySetInnerHTML:
     * We just use values encoded by our field formatters
     */
    // eslint-disable-next-line react/no-danger
    ,
    dangerouslySetInnerHTML: {
      __html: value
    }
  })));
}