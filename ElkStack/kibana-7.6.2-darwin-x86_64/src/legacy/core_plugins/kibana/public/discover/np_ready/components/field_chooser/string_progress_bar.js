"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStringFieldProgressBarDirective = createStringFieldProgressBarDirective;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _kibana_services = require("../../../kibana_services");

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
function StringFieldProgressBar(props) {
  return _react.default.createElement(_eui.EuiToolTip, {
    anchorClassName: "dscProgressBarTooltip__anchor",
    content: props.count,
    delay: "regular",
    position: "right"
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiProgress, {
    value: props.percent,
    max: 100,
    color: "secondary",
    "aria-labelledby": "CanvasAssetManagerLabel",
    size: "l"
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiText, {
    size: "xs"
  }, props.percent, "%"))));
}

function createStringFieldProgressBarDirective(reactDirective) {
  return reactDirective((0, _kibana_services.wrapInI18nContext)(StringFieldProgressBar));
}