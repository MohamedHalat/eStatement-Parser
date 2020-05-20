"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TopNavMenuItem = TopNavMenuItem;

var _lodash = require("lodash");

var _react = _interopRequireDefault(require("react"));

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
function TopNavMenuItem(props) {
  function isDisabled() {
    var val = (0, _lodash.isFunction)(props.disableButton) ? props.disableButton() : props.disableButton;
    return val;
  }

  function getTooltip() {
    var val = (0, _lodash.isFunction)(props.tooltip) ? props.tooltip() : props.tooltip;
    return val;
  }

  function handleClick(e) {
    if (isDisabled()) return;
    props.run(e.currentTarget);
  }

  var btn = _react.default.createElement(_eui.EuiButtonEmpty, {
    size: "xs",
    isDisabled: isDisabled(),
    onClick: handleClick,
    "data-test-subj": props.testId,
    className: props.className
  }, (0, _lodash.capitalize)(props.label || props.id));

  var tooltip = getTooltip();

  if (tooltip) {
    return _react.default.createElement(_eui.EuiToolTip, {
      content: tooltip
    }, btn);
  } else {
    return btn;
  }
}

TopNavMenuItem.defaultProps = {
  disableButton: false,
  tooltip: ''
};