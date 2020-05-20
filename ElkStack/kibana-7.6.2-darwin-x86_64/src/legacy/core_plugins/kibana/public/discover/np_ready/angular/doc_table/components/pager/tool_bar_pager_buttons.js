"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToolBarPagerButtons = ToolBarPagerButtons;

var _react = _interopRequireDefault(require("react"));

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
function ToolBarPagerButtons(props) {
  return _react.default.createElement("div", {
    className: "kuiButtonGroup"
  }, _react.default.createElement("button", {
    className: "kuiButton kuiButton--basic kuiButton--icon",
    onClick: function onClick() {
      return props.onPagePrevious();
    },
    disabled: !props.hasPreviousPage,
    "data-test-subj": "btnPrevPage"
  }, _react.default.createElement("span", {
    className: "kuiButton__icon kuiIcon fa-chevron-left"
  })), _react.default.createElement("button", {
    className: "kuiButton kuiButton--basic kuiButton--icon",
    onClick: function onClick() {
      return props.onPageNext();
    },
    disabled: !props.hasNextPage,
    "data-test-subj": "btnNextPage"
  }, _react.default.createElement("span", {
    className: "kuiButton__icon kuiIcon fa-chevron-right"
  })));
}