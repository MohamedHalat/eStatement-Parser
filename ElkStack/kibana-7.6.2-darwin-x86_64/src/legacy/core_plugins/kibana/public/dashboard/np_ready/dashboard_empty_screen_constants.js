"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createNewVisualizationButtonAriaLabel = exports.createNewVisualizationButton = exports.addNewVisualizationDescription = exports.addExistingVisualizationLinkAriaLabel = exports.addExistingVisualizationLinkText = exports.howToStartWorkingOnNewDashboardEditLinkAriaLabel = exports.howToStartWorkingOnNewDashboardEditLinkText = exports.howToStartWorkingOnNewDashboardDescription2 = exports.howToStartWorkingOnNewDashboardDescription1 = exports.fillDashboardTitle = exports.emptyDashboardAdditionalPrivilege = exports.emptyDashboardTitle = void 0;

var _i18n = require("@kbn/i18n");

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

/** READONLY VIEW CONSTANTS **/
var emptyDashboardTitle = _i18n.i18n.translate('kbn.dashboard.emptyDashboardTitle', {
  defaultMessage: 'This dashboard is empty.'
});

exports.emptyDashboardTitle = emptyDashboardTitle;

var emptyDashboardAdditionalPrivilege = _i18n.i18n.translate('kbn.dashboard.emptyDashboardAdditionalPrivilege', {
  defaultMessage: 'You need additional privileges to edit this dashboard.'
});
/** VIEW MODE CONSTANTS **/


exports.emptyDashboardAdditionalPrivilege = emptyDashboardAdditionalPrivilege;

var fillDashboardTitle = _i18n.i18n.translate('kbn.dashboard.fillDashboardTitle', {
  defaultMessage: "This dashboard is empty. Let\u2019s fill it up!"
});

exports.fillDashboardTitle = fillDashboardTitle;

var howToStartWorkingOnNewDashboardDescription1 = _i18n.i18n.translate('kbn.dashboard.howToStartWorkingOnNewDashboardDescription1', {
  defaultMessage: 'Click'
});

exports.howToStartWorkingOnNewDashboardDescription1 = howToStartWorkingOnNewDashboardDescription1;

var howToStartWorkingOnNewDashboardDescription2 = _i18n.i18n.translate('kbn.dashboard.howToStartWorkingOnNewDashboardDescription2', {
  defaultMessage: 'in the menu bar above to start adding panels.'
});

exports.howToStartWorkingOnNewDashboardDescription2 = howToStartWorkingOnNewDashboardDescription2;

var howToStartWorkingOnNewDashboardEditLinkText = _i18n.i18n.translate('kbn.dashboard.howToStartWorkingOnNewDashboardEditLinkText', {
  defaultMessage: 'Edit'
});

exports.howToStartWorkingOnNewDashboardEditLinkText = howToStartWorkingOnNewDashboardEditLinkText;

var howToStartWorkingOnNewDashboardEditLinkAriaLabel = _i18n.i18n.translate('kbn.dashboard.howToStartWorkingOnNewDashboardEditLinkAriaLabel', {
  defaultMessage: 'Edit dashboard'
});
/** EDIT MODE CONSTANTS **/


exports.howToStartWorkingOnNewDashboardEditLinkAriaLabel = howToStartWorkingOnNewDashboardEditLinkAriaLabel;

var addExistingVisualizationLinkText = _i18n.i18n.translate('kbn.dashboard.addExistingVisualizationLinkText', {
  defaultMessage: 'Add an existing'
});

exports.addExistingVisualizationLinkText = addExistingVisualizationLinkText;

var addExistingVisualizationLinkAriaLabel = _i18n.i18n.translate('kbn.dashboard.addVisualizationLinkAriaLabel', {
  defaultMessage: 'Add an existing visualization'
});

exports.addExistingVisualizationLinkAriaLabel = addExistingVisualizationLinkAriaLabel;

var addNewVisualizationDescription = _i18n.i18n.translate('kbn.dashboard.addNewVisualizationText', {
  defaultMessage: 'or new object to this dashboard'
});

exports.addNewVisualizationDescription = addNewVisualizationDescription;

var createNewVisualizationButton = _i18n.i18n.translate('kbn.dashboard.createNewVisualizationButton', {
  defaultMessage: 'Create new'
});

exports.createNewVisualizationButton = createNewVisualizationButton;

var createNewVisualizationButtonAriaLabel = _i18n.i18n.translate('kbn.dashboard.createNewVisualizationButtonAriaLabel', {
  defaultMessage: 'Create new visualization button'
});

exports.createNewVisualizationButtonAriaLabel = createNewVisualizationButtonAriaLabel;