"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WelcomePanel = WelcomePanel;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _editor_example = require("./editor_example");

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
// @ts-ignore
function WelcomePanel(props) {
  return _react.default.createElement(_eui.EuiFlyout, {
    onClose: props.onDismiss,
    "data-test-subj": "welcomePanel",
    size: "s"
  }, _react.default.createElement(_eui.EuiFlyoutHeader, {
    hasBorder: true
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "m"
  }, _react.default.createElement("h2", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "console.welcomePage.pageTitle",
    defaultMessage: "Welcome to Console"
  })))), _react.default.createElement(_eui.EuiFlyoutBody, null, _react.default.createElement(_eui.EuiText, null, _react.default.createElement("h4", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "console.welcomePage.quickIntroTitle",
    defaultMessage: "Quick intro to the UI"
  })), _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "console.welcomePage.quickIntroDescription",
    defaultMessage: "The Console UI is split into two panes: an editor pane (left) and a response pane (right). Use the editor to type requests and submit them to Elasticsearch. The results will be displayed in the response pane on the right side."
  })), _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "console.welcomePage.supportedRequestFormatTitle",
    defaultMessage: "Console understands requests in a compact format, similar to cURL:"
  })), _react.default.createElement(_editor_example.EditorExample, {
    panel: "welcome"
  }), _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "console.welcomePage.supportedRequestFormatDescription",
    defaultMessage: "While typing a request, Console will make suggestions which you can then accept by hitting Enter/Tab. These suggestions are made based on the request structure as well as your indices and types."
  })), _react.default.createElement("h4", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "console.welcomePage.quickTipsTitle",
    defaultMessage: "A few quick tips, while I have your attention"
  })), _react.default.createElement("ul", null, _react.default.createElement("li", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "console.welcomePage.quickTips.submitRequestDescription",
    defaultMessage: "Submit requests to ES using the green triangle button."
  })), _react.default.createElement("li", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "console.welcomePage.quickTips.useWrenchMenuDescription",
    defaultMessage: "Use the wrench menu for other useful things."
  })), _react.default.createElement("li", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "console.welcomePage.quickTips.cUrlFormatForRequestsDescription",
    defaultMessage: "You can paste requests in cURL format and they will be translated to the Console syntax."
  })), _react.default.createElement("li", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "console.welcomePage.quickTips.resizeEditorDescription",
    defaultMessage: "You can resize the editor and output panes by dragging the separator between them."
  })), _react.default.createElement("li", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "console.welcomePage.quickTips.keyboardShortcutsDescription",
    defaultMessage: "Study the keyboard shortcuts under the Help button. Good stuff in there!"
  }))))), _react.default.createElement(_eui.EuiFlyoutFooter, null, _react.default.createElement(_eui.EuiButton, {
    fill: true,
    fullWidth: false,
    "data-test-subj": "help-close-button",
    onClick: props.onDismiss
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "console.welcomePage.closeButtonLabel",
    defaultMessage: "Dismiss"
  }))));
}