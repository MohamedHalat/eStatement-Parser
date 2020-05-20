"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DiscoverIndexPatternTitle = DiscoverIndexPatternTitle;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

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

/**
 * Component displaying the title of the current selected index pattern
 * and if changeable is true, a link is provided to change the index pattern
 */
function DiscoverIndexPatternTitle(_ref) {
  var isChangeable = _ref.isChangeable,
      onChange = _ref.onChange,
      title = _ref.title;
  return _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "none",
    responsive: false,
    className: "index-pattern-selection"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    className: "eui-textTruncate"
  }, _react.default.createElement(_eui.EuiToolTip, {
    content: title
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "xxs",
    className: "eui-textTruncate"
  }, _react.default.createElement("h2", {
    title: title
  }, title)))), isChangeable && _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiToolTip, {
    content: _react.default.createElement(_react2.FormattedMessage, {
      id: "kbn.discover.fieldChooser.indexPattern.changeLinkTooltip",
      defaultMessage: "Change current index pattern"
    })
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    "aria-label": _i18n.i18n.translate('kbn.discover.fieldChooser.indexPattern.changeLinkAriaLabel', {
      defaultMessage: 'Change current index pattern'
    }),
    "data-test-subj": "indexPattern-switch-link",
    size: "xs",
    onClick: function onClick() {
      return onChange();
    },
    iconSide: "right",
    iconType: "arrowDown",
    color: "text"
  }))));
}