"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTopNavConfig = getTopNavConfig;

var _i18n = require("@kbn/i18n");

var _public = require("../../../../../../../plugins/embeddable/public");

var _top_nav_ids = require("./top_nav_ids");

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

/**
 * @param actions - A mapping of TopNavIds to an action function that should run when the
 * corresponding top nav is clicked.
 * @param hideWriteControls if true, does not include any controls that allow editing or creating objects.
 * @return an array of objects for a top nav configuration, based on the mode.
 */
function getTopNavConfig(dashboardMode, actions, hideWriteControls) {
  switch (dashboardMode) {
    case _public.ViewMode.VIEW:
      return hideWriteControls ? [getFullScreenConfig(actions[_top_nav_ids.TopNavIds.FULL_SCREEN]), getShareConfig(actions[_top_nav_ids.TopNavIds.SHARE])] : [getFullScreenConfig(actions[_top_nav_ids.TopNavIds.FULL_SCREEN]), getShareConfig(actions[_top_nav_ids.TopNavIds.SHARE]), getCloneConfig(actions[_top_nav_ids.TopNavIds.CLONE]), getEditConfig(actions[_top_nav_ids.TopNavIds.ENTER_EDIT_MODE])];

    case _public.ViewMode.EDIT:
      return [getSaveConfig(actions[_top_nav_ids.TopNavIds.SAVE]), getViewConfig(actions[_top_nav_ids.TopNavIds.EXIT_EDIT_MODE]), getAddConfig(actions[_top_nav_ids.TopNavIds.ADD]), getOptionsConfig(actions[_top_nav_ids.TopNavIds.OPTIONS]), getShareConfig(actions[_top_nav_ids.TopNavIds.SHARE])];

    default:
      return [];
  }
}

function getFullScreenConfig(action) {
  return {
    id: 'full-screen',
    label: _i18n.i18n.translate('kbn.dashboard.topNave.fullScreenButtonAriaLabel', {
      defaultMessage: 'full screen'
    }),
    description: _i18n.i18n.translate('kbn.dashboard.topNave.fullScreenConfigDescription', {
      defaultMessage: 'Full Screen Mode'
    }),
    testId: 'dashboardFullScreenMode',
    run: action
  };
}
/**
 * @returns {kbnTopNavConfig}
 */


function getEditConfig(action) {
  return {
    id: 'edit',
    label: _i18n.i18n.translate('kbn.dashboard.topNave.editButtonAriaLabel', {
      defaultMessage: 'edit'
    }),
    description: _i18n.i18n.translate('kbn.dashboard.topNave.editConfigDescription', {
      defaultMessage: 'Switch to edit mode'
    }),
    testId: 'dashboardEditMode',
    // We want to hide the "edit" button on small screens, since those have a responsive
    // layout, which is not tied to the grid anymore, so we cannot edit the grid on that screens.
    className: 'eui-hideFor--s eui-hideFor--xs',
    run: action
  };
}
/**
 * @returns {kbnTopNavConfig}
 */


function getSaveConfig(action) {
  return {
    id: 'save',
    label: _i18n.i18n.translate('kbn.dashboard.topNave.saveButtonAriaLabel', {
      defaultMessage: 'save'
    }),
    description: _i18n.i18n.translate('kbn.dashboard.topNave.saveConfigDescription', {
      defaultMessage: 'Save your dashboard'
    }),
    testId: 'dashboardSaveMenuItem',
    run: action
  };
}
/**
 * @returns {kbnTopNavConfig}
 */


function getViewConfig(action) {
  return {
    id: 'cancel',
    label: _i18n.i18n.translate('kbn.dashboard.topNave.cancelButtonAriaLabel', {
      defaultMessage: 'cancel'
    }),
    description: _i18n.i18n.translate('kbn.dashboard.topNave.viewConfigDescription', {
      defaultMessage: 'Cancel editing and switch to view-only mode'
    }),
    testId: 'dashboardViewOnlyMode',
    run: action
  };
}
/**
 * @returns {kbnTopNavConfig}
 */


function getCloneConfig(action) {
  return {
    id: 'clone',
    label: _i18n.i18n.translate('kbn.dashboard.topNave.cloneButtonAriaLabel', {
      defaultMessage: 'clone'
    }),
    description: _i18n.i18n.translate('kbn.dashboard.topNave.cloneConfigDescription', {
      defaultMessage: 'Create a copy of your dashboard'
    }),
    testId: 'dashboardClone',
    run: action
  };
}
/**
 * @returns {kbnTopNavConfig}
 */


function getAddConfig(action) {
  return {
    id: 'add',
    label: _i18n.i18n.translate('kbn.dashboard.topNave.addButtonAriaLabel', {
      defaultMessage: 'add'
    }),
    description: _i18n.i18n.translate('kbn.dashboard.topNave.addConfigDescription', {
      defaultMessage: 'Add a panel to the dashboard'
    }),
    testId: 'dashboardAddPanelButton',
    run: action
  };
}
/**
 * @returns {kbnTopNavConfig}
 */


function getShareConfig(action) {
  return {
    id: 'share',
    label: _i18n.i18n.translate('kbn.dashboard.topNave.shareButtonAriaLabel', {
      defaultMessage: 'share'
    }),
    description: _i18n.i18n.translate('kbn.dashboard.topNave.shareConfigDescription', {
      defaultMessage: 'Share Dashboard'
    }),
    testId: 'shareTopNavButton',
    run: action
  };
}
/**
 * @returns {kbnTopNavConfig}
 */


function getOptionsConfig(action) {
  return {
    id: 'options',
    label: _i18n.i18n.translate('kbn.dashboard.topNave.optionsButtonAriaLabel', {
      defaultMessage: 'options'
    }),
    description: _i18n.i18n.translate('kbn.dashboard.topNave.optionsConfigDescription', {
      defaultMessage: 'Options'
    }),
    testId: 'dashboardOptionsButton',
    run: action
  };
}