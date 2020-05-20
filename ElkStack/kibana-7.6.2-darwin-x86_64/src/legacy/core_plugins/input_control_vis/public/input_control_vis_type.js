"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createInputControlVisTypeDefinition = createInputControlVisTypeDefinition;

var _i18n = require("@kbn/i18n");

var _vis_controller = require("./vis_controller");

var _controls_tab = require("./components/editor/controls_tab");

var _options_tab = require("./components/editor/options_tab");

var _public = require("../../visualizations/public");

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
function createInputControlVisTypeDefinition(deps) {
  var InputControlVisController = (0, _vis_controller.createInputControlVisController)(deps);
  var ControlsTab = (0, _controls_tab.getControlsTab)(deps);
  return {
    name: 'input_control_vis',
    title: _i18n.i18n.translate('inputControl.register.controlsTitle', {
      defaultMessage: 'Controls'
    }),
    icon: 'visControls',
    description: _i18n.i18n.translate('inputControl.register.controlsDescription', {
      defaultMessage: 'Create interactive controls for easy dashboard manipulation.'
    }),
    stage: 'experimental',
    requiresUpdateStatus: [_public.Status.PARAMS, _public.Status.TIME],
    feedbackMessage: _public.defaultFeedbackMessage,
    visualization: InputControlVisController,
    visConfig: {
      defaults: {
        controls: [],
        updateFiltersOnChange: false,
        useTimeFilter: false,
        pinFilters: false
      }
    },
    editor: 'default',
    editorConfig: {
      optionTabs: [{
        name: 'controls',
        title: _i18n.i18n.translate('inputControl.register.tabs.controlsTitle', {
          defaultMessage: 'Controls'
        }),
        editor: ControlsTab
      }, {
        name: 'options',
        title: _i18n.i18n.translate('inputControl.register.tabs.optionsTitle', {
          defaultMessage: 'Options'
        }),
        editor: _options_tab.OptionsTab
      }]
    },
    requestHandler: 'none',
    responseHandler: 'none'
  };
}