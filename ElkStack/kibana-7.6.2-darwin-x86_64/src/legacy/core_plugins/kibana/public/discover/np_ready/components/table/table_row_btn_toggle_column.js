"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DocViewTableRowBtnToggleColumn = DocViewTableRowBtnToggleColumn;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@kbn/i18n/react");

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
function DocViewTableRowBtnToggleColumn(_ref) {
  var onClick = _ref.onClick,
      active = _ref.active,
      _ref$disabled = _ref.disabled,
      disabled = _ref$disabled === void 0 ? false : _ref$disabled;

  if (disabled) {
    return _react.default.createElement(_eui.EuiButtonIcon, {
      "aria-label": _i18n.i18n.translate('kbn.discover.docViews.table.toggleColumnInTableButtonAriaLabel', {
        defaultMessage: 'Toggle column in table'
      }),
      className: "kbnDocViewer__actionButton",
      "data-test-subj": "toggleColumnButton",
      disabled: true,
      iconType: 'tableOfContents',
      iconSize: 's'
    });
  }

  return _react.default.createElement(_eui.EuiToolTip, {
    content: _react.default.createElement(_react2.FormattedMessage, {
      id: "kbn.discover.docViews.table.toggleColumnInTableButtonTooltip",
      defaultMessage: "Toggle column in table"
    })
  }, _react.default.createElement(_eui.EuiButtonIcon, {
    "aria-label": _i18n.i18n.translate('kbn.discover.docViews.table.toggleColumnInTableButtonAriaLabel', {
      defaultMessage: 'Toggle column in table'
    }),
    "aria-pressed": active,
    onClick: onClick,
    className: "kbnDocViewer__actionButton",
    "data-test-subj": "toggleColumnButton",
    iconType: 'tableOfContents',
    iconSize: 's'
  }));
}