"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JsonCodeBlock = JsonCodeBlock;

var _react = _interopRequireDefault(require("react"));

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
function JsonCodeBlock(_ref) {
  var hit = _ref.hit;

  var label = _i18n.i18n.translate('kbn.discover.docViews.json.codeEditorAriaLabel', {
    defaultMessage: 'Read only JSON view of an elasticsearch document'
  });

  return _react.default.createElement(_eui.EuiCodeBlock, {
    "aria-label": label,
    language: "json",
    isCopyable: true,
    paddingSize: "s"
  }, JSON.stringify(hit, null, 2));
}