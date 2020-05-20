"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showOptionsPopover = showOptionsPopover;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _options = require("./options");

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
var isOpen = false;
var container = document.createElement('div');

var onClose = function onClose() {
  _reactDom.default.unmountComponentAtNode(container);

  isOpen = false;
};

function showOptionsPopover(_ref) {
  var anchorElement = _ref.anchorElement,
      useMargins = _ref.useMargins,
      onUseMarginsChange = _ref.onUseMarginsChange,
      hidePanelTitles = _ref.hidePanelTitles,
      onHidePanelTitlesChange = _ref.onHidePanelTitlesChange;

  if (isOpen) {
    onClose();
    return;
  }

  isOpen = true;
  document.body.appendChild(container);

  var element = _react.default.createElement(_react2.I18nProvider, null, _react.default.createElement(_eui.EuiWrappingPopover, {
    id: "popover",
    button: anchorElement,
    isOpen: true,
    closePopover: onClose
  }, _react.default.createElement(_options.OptionsMenu, {
    useMargins: useMargins,
    onUseMarginsChange: onUseMarginsChange,
    hidePanelTitles: hidePanelTitles,
    onHidePanelTitlesChange: onHidePanelTitlesChange
  })));

  _reactDom.default.render(element, container);
}