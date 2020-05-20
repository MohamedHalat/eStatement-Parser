"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HelpPanel = HelpPanel;

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
function HelpPanel(props) {
  return _react.default.createElement(_eui.EuiFlyout, {
    onClose: props.onClose,
    "data-test-subj": "helpFlyout",
    size: "s"
  }, _react.default.createElement(_eui.EuiFlyoutHeader, {
    hasBorder: true
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "m"
  }, _react.default.createElement("h2", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "console.helpPage.pageTitle",
    defaultMessage: "Help"
  })))), _react.default.createElement(_eui.EuiFlyoutBody, null, _react.default.createElement(_eui.EuiText, null, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
    defaultMessage: "Request format",
    id: "console.helpPage.requestFormatTitle"
  })), _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "console.helpPage.requestFormatDescription",
    defaultMessage: "You can type one or more requests in the white editor. Console understands requests in a compact format:"
  })), _react.default.createElement(_editor_example.EditorExample, {
    panel: "help"
  }), _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "console.helpPage.keyboardCommandsTitle",
    defaultMessage: "Keyboard commands"
  })), _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement("dl", null, _react.default.createElement("dt", null, "Ctrl/Cmd + I"), _react.default.createElement("dd", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "console.helpPage.keyboardCommands.autoIndentDescription",
    defaultMessage: "Auto indent current request"
  })), _react.default.createElement("dt", null, "Ctrl/Cmd + /"), _react.default.createElement("dd", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "console.helpPage.keyboardCommands.openDocumentationDescription",
    defaultMessage: "Open documentation for current request"
  })), _react.default.createElement("dt", null, "Ctrl + Space"), _react.default.createElement("dd", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "console.helpPage.keyboardCommands.openAutoCompleteDescription",
    defaultMessage: "Open Auto complete (even if not typing)"
  })), _react.default.createElement("dt", null, "Ctrl/Cmd + Enter"), _react.default.createElement("dd", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "console.helpPage.keyboardCommands.submitRequestDescription",
    defaultMessage: "Submit request"
  })), _react.default.createElement("dt", null, "Ctrl/Cmd + Up/Down"), _react.default.createElement("dd", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "console.helpPage.keyboardCommands.jumpToPreviousNextRequestDescription",
    defaultMessage: "Jump to the previous/next request start or end."
  })), _react.default.createElement("dt", null, "Ctrl/Cmd + Alt + L"), _react.default.createElement("dd", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "console.helpPage.keyboardCommands.collapseExpandCurrentScopeDescription",
    defaultMessage: "Collapse/expand current scope."
  })), _react.default.createElement("dt", null, "Ctrl/Cmd + Option + 0"), _react.default.createElement("dd", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "console.helpPage.keyboardCommands.collapseAllScopesDescription",
    defaultMessage: "Collapse all scopes but the current one. Expand by adding a shift."
  })), _react.default.createElement("dt", null, "Down arrow"), _react.default.createElement("dd", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "console.helpPage.keyboardCommands.switchFocusToAutoCompleteMenuDescription",
    defaultMessage: "Switch focus to auto-complete menu. Use arrows to further select a term"
  })), _react.default.createElement("dt", null, "Enter/Tab"), _react.default.createElement("dd", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "console.helpPage.keyboardCommands.selectCurrentlySelectedInAutoCompleteMenuDescription",
    defaultMessage: "Select the currently selected or the top most term in auto-complete menu"
  })), _react.default.createElement("dt", null, "Esc"), _react.default.createElement("dd", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "console.helpPage.keyboardCommands.closeAutoCompleteMenuDescription",
    defaultMessage: "Close auto-complete menu"
  }))))));
}