"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppContainer = exports.AppWrapper = void 0;

var _react = _interopRequireDefault(require("react"));

var _useObservable = _interopRequireDefault(require("react-use/lib/useObservable"));

var _classnames = _interopRequireDefault(require("classnames"));

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
var AppWrapper = function AppWrapper(_ref) {
  var chromeVisible$ = _ref.chromeVisible$,
      children = _ref.children;
  var visible = (0, _useObservable.default)(chromeVisible$);
  return _react.default.createElement("div", {
    className: (0, _classnames.default)('app-wrapper', {
      'hidden-chrome': !visible
    })
  }, children);
};

exports.AppWrapper = AppWrapper;

var AppContainer = function AppContainer(_ref2) {
  var classes$ = _ref2.classes$,
      children = _ref2.children;
  var classes = (0, _useObservable.default)(classes$);
  return _react.default.createElement("div", {
    className: (0, _classnames.default)('application', classes)
  }, children);
};

exports.AppContainer = AppContainer;