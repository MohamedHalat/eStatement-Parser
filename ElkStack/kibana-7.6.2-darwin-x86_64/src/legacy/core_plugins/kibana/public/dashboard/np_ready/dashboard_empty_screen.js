"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DashboardEmptyScreen = DashboardEmptyScreen;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var constants = _interopRequireWildcard(require("./dashboard_empty_screen_constants"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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
function DashboardEmptyScreen(_ref) {
  var showLinkToVisualize = _ref.showLinkToVisualize,
      onLinkClick = _ref.onLinkClick,
      onVisualizeClick = _ref.onVisualizeClick,
      uiSettings = _ref.uiSettings,
      http = _ref.http,
      isReadonlyMode = _ref.isReadonlyMode;
  var IS_DARK_THEME = uiSettings.get('theme:darkMode');
  var emptyStateGraphicURL = IS_DARK_THEME ? '/plugins/kibana/home/assets/welcome_graphic_dark_2x.png' : '/plugins/kibana/home/assets/welcome_graphic_light_2x.png';

  var linkToVisualizeParagraph = _react.default.createElement("p", {
    "data-test-subj": "linkToVisualizeParagraph"
  }, _react.default.createElement(_eui.EuiButton, {
    iconSide: "right",
    size: "s",
    fill: true,
    iconType: "arrowDown",
    onClick: onVisualizeClick,
    "data-test-subj": "addVisualizationButton",
    "aria-label": constants.createNewVisualizationButtonAriaLabel
  }, constants.createNewVisualizationButton));

  var paragraph = function paragraph(description1, description2, linkText, ariaLabel, dataTestSubj) {
    return _react.default.createElement(_eui.EuiText, {
      size: "m",
      color: "subdued"
    }, _react.default.createElement("p", null, description1, description1 && _react.default.createElement("span", null, "\xA0"), _react.default.createElement(_eui.EuiLink, {
      onClick: onLinkClick,
      "aria-label": ariaLabel,
      "data-test-subj": dataTestSubj || ''
    }, linkText), _react.default.createElement("span", null, "\xA0"), description2));
  };

  var enterEditModeParagraph = paragraph(constants.howToStartWorkingOnNewDashboardDescription1, constants.howToStartWorkingOnNewDashboardDescription2, constants.howToStartWorkingOnNewDashboardEditLinkText, constants.howToStartWorkingOnNewDashboardEditLinkAriaLabel);
  var enterViewModeParagraph = paragraph(null, constants.addNewVisualizationDescription, constants.addExistingVisualizationLinkText, constants.addExistingVisualizationLinkAriaLabel);

  var page = function page(mainText, showAdditionalParagraph, additionalText) {
    return _react.default.createElement(_eui.EuiPage, {
      className: "dshStartScreen",
      restrictWidth: "500px"
    }, _react.default.createElement(_eui.EuiPageBody, null, _react.default.createElement(_eui.EuiPageContent, {
      verticalPosition: "center",
      horizontalPosition: "center",
      paddingSize: "none",
      className: "dshStartScreen__pageContent"
    }, _react.default.createElement(_eui.EuiImage, {
      url: http.basePath.prepend(emptyStateGraphicURL),
      alt: ""
    }), _react.default.createElement(_eui.EuiText, {
      size: "m"
    }, _react.default.createElement("p", {
      style: {
        fontWeight: 'bold'
      }
    }, mainText)), additionalText ? _react.default.createElement(_eui.EuiText, {
      size: "m",
      color: "subdued"
    }, additionalText) : null, showAdditionalParagraph ? _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
      size: "m"
    }), _react.default.createElement("div", {
      className: "dshStartScreen__panelDesc"
    }, enterEditModeParagraph)) : null)));
  };

  var readonlyMode = page(constants.emptyDashboardTitle, false, constants.emptyDashboardAdditionalPrivilege);
  var viewMode = page(constants.fillDashboardTitle, true);

  var editMode = _react.default.createElement("div", {
    "data-test-subj": "emptyDashboardWidget",
    className: "dshEmptyWidget"
  }, enterViewModeParagraph, _react.default.createElement(_eui.EuiSpacer, {
    size: "l"
  }), linkToVisualizeParagraph);

  var actionableMode = showLinkToVisualize ? editMode : viewMode;
  return _react.default.createElement(_react2.I18nProvider, null, isReadonlyMode ? readonlyMode : actionableMode);
}