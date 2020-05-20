"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppNotFound = void 0;

var _eui = require("@elastic/eui");

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
var AppNotFound = function AppNotFound() {
  return _react.default.createElement(_eui.EuiPage, {
    style: {
      minHeight: '100%'
    }
  }, _react.default.createElement(_eui.EuiPageBody, null, _react.default.createElement(_eui.EuiPageContent, {
    verticalPosition: "center",
    horizontalPosition: "center"
  }, _react.default.createElement(_eui.EuiEmptyPrompt, {
    iconType: "alert",
    iconColor: "danger",
    title: _react.default.createElement("h2", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "core.application.appNotFound.title",
      defaultMessage: "Application Not Found"
    })),
    body: _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "core.application.appNotFound.pageDescription",
      defaultMessage: "No application was found at this URL. Try going back or choosing an app from the menu."
    }))
  }))));
};

exports.AppNotFound = AppNotFound;