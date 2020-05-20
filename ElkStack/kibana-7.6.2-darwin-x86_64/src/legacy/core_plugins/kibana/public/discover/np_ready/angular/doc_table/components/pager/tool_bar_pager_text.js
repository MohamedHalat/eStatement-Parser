"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToolBarPagerText = ToolBarPagerText;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@kbn/i18n/react");

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
function ToolBarPagerText(_ref) {
  var startItem = _ref.startItem,
      endItem = _ref.endItem,
      totalItems = _ref.totalItems;
  return _react.default.createElement("div", {
    className: "kuiToolBarText",
    "data-test-subj": "toolBarPagerText"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "kbn.docTable.pagerControl.pagesCountLabel",
    defaultMessage: "{startItem}\u2013{endItem} of {totalItems}",
    values: {
      startItem: startItem,
      endItem: endItem,
      totalItems: totalItems
    }
  }));
}