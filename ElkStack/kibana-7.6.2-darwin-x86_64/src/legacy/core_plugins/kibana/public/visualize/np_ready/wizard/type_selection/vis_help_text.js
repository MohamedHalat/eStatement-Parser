"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisHelpText = void 0;

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
var VisHelpText = function VisHelpText(_ref) {
  var name = _ref.name,
      title = _ref.title,
      description = _ref.description,
      highlightMsg = _ref.highlightMsg;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiTitle, {
    size: "s"
  }, _react.default.createElement("h2", null, title)), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement("div", {
    id: "visTypeDescription-".concat(name)
  }, _react.default.createElement(_eui.EuiText, null, highlightMsg && _react.default.createElement("p", null, _react.default.createElement("em", null, highlightMsg)), _react.default.createElement("p", null, description))));
};

exports.VisHelpText = VisHelpText;