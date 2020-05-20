"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewsLoadingPrompt = void 0;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var NewsLoadingPrompt = function NewsLoadingPrompt() {
  return _react.default.createElement(_eui.EuiEmptyPrompt, {
    title: _react.default.createElement(_eui.EuiLoadingKibana, {
      size: "xl"
    }),
    body: _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "newsfeed.loadingPrompt.gettingNewsText",
      defaultMessage: "Getting the latest news..."
    }))
  });
};

exports.NewsLoadingPrompt = NewsLoadingPrompt;