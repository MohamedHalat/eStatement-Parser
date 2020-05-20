"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DocViewTableRowBtnCollapse = DocViewTableRowBtnCollapse;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

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
function DocViewTableRowBtnCollapse(_ref) {
  var _onClick = _ref.onClick,
      isCollapsed = _ref.isCollapsed;

  var label = _i18n.i18n.translate('kbn.discover.docViews.table.toggleFieldDetails', {
    defaultMessage: 'Toggle field details'
  });

  return _react.default.createElement(_eui.EuiToolTip, {
    content: label
  }, _react.default.createElement(_eui.EuiButtonIcon, {
    "aria-expanded": !isCollapsed,
    "aria-label": label,
    "data-test-subj": "collapseBtn",
    onClick: function onClick() {
      return _onClick();
    },
    iconType: isCollapsed ? 'arrowRight' : 'arrowDown',
    iconSize: 's'
  }));
}