"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDashboardTitle = getDashboardTitle;

var _i18n = require("@kbn/i18n");

var _public = require("../../../../../../plugins/embeddable/public");

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
 * @param title {string} the current title of the dashboard
 * @param viewMode {DashboardViewMode} the current mode. If in editing state, prepends 'Editing ' to the title.
 * @param isDirty {boolean} if the dashboard is in a dirty state. If in dirty state, adds (unsaved) to the
 * end of the title.
 * @returns {string} A title to display to the user based on the above parameters.
 */
function getDashboardTitle(title, viewMode, isDirty, isNew) {
  var isEditMode = viewMode === _public.ViewMode.EDIT;
  var displayTitle;

  var newDashboardTitle = _i18n.i18n.translate('kbn.dashboard.savedDashboard.newDashboardTitle', {
    defaultMessage: 'New Dashboard'
  });

  var dashboardTitle = isNew ? newDashboardTitle : title;

  if (isEditMode && isDirty) {
    displayTitle = _i18n.i18n.translate('kbn.dashboard.strings.dashboardUnsavedEditTitle', {
      defaultMessage: 'Editing {title} (unsaved)',
      values: {
        title: dashboardTitle
      }
    });
  } else if (isEditMode) {
    displayTitle = _i18n.i18n.translate('kbn.dashboard.strings.dashboardEditTitle', {
      defaultMessage: 'Editing {title}',
      values: {
        title: dashboardTitle
      }
    });
  } else {
    displayTitle = dashboardTitle;
  }

  return displayTitle;
}