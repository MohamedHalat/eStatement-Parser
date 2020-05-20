"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionBarWarning = ActionBarWarning;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@kbn/i18n/react");

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
function ActionBarWarning(_ref) {
  var docCount = _ref.docCount,
      type = _ref.type;

  if (type === 'predecessors') {
    return _react.default.createElement(_eui.EuiCallOut, {
      color: "warning",
      "data-test-subj": "predecessorsWarningMsg",
      iconType: "bolt",
      title: docCount === 0 ? _react.default.createElement(_react2.FormattedMessage, {
        id: "kbn.context.newerDocumentsWarningZero",
        defaultMessage: "No documents newer than the anchor could be found."
      }) : _react.default.createElement(_react2.FormattedMessage, {
        id: "kbn.context.newerDocumentsWarning",
        defaultMessage: "Only {docCount} documents newer than the anchor could be found.",
        values: {
          docCount: docCount
        }
      }),
      size: "s"
    });
  }

  return _react.default.createElement(_eui.EuiCallOut, {
    color: "warning",
    "data-test-subj": "successorsWarningMsg",
    iconType: "bolt",
    title: docCount === 0 ? _react.default.createElement(_react2.FormattedMessage, {
      id: "kbn.context.olderDocumentsWarningZero",
      defaultMessage: "No documents older than the anchor could be found."
    }) : _react.default.createElement(_react2.FormattedMessage, {
      id: "kbn.context.olderDocumentsWarning",
      defaultMessage: "Only {docCount} documents older than the anchor could be found.",
      values: {
        docCount: docCount
      }
    }),
    size: "s"
  });
}