"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkdownOptions = MarkdownOptions;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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
function MarkdownOptions(_ref) {
  var stateParams = _ref.stateParams,
      setValue = _ref.setValue;
  var onMarkdownUpdate = (0, _react.useCallback)(function (value) {
    return setValue('markdown', value);
  }, [setValue]);
  return _react.default.createElement(_eui.EuiPanel, {
    paddingSize: "s"
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    direction: "column",
    gutterSize: "m",
    className: "mkdEditor"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "none",
    justifyContent: "spaceBetween",
    alignItems: "baseline"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "xs"
  }, _react.default.createElement("h2", null, _react.default.createElement("label", {
    htmlFor: "markdownVisInput"
  }, "Markdown")))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiText, {
    size: "xs"
  }, _react.default.createElement(_eui.EuiLink, {
    href: "https://help.github.com/articles/github-flavored-markdown/",
    target: "_blank"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "visTypeMarkdown.params.helpLinkLabel",
    defaultMessage: "Help"
  }), ' ', _react.default.createElement(_eui.EuiIcon, {
    type: "popout",
    size: "s"
  })))))), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiTextArea, {
    id: "markdownVisInput",
    className: "visEditor--markdown__textarea",
    value: stateParams.markdown,
    onChange: function onChange(_ref2) {
      var value = _ref2.target.value;
      return onMarkdownUpdate(value);
    },
    fullWidth: true,
    "data-test-subj": "markdownTextarea",
    resize: "none"
  }))));
}