"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initTimelionLegacyModule = void 0;

require("ngreact");

require("brace/mode/hjson");

require("brace/ext/searchbox");

require("ui/accessibility/kbn_ui_ace_keyboard_mode");

require("ui/vis/map/service_settings");

var _lodash = require("lodash");

var _modules = require("ui/modules");

var _chart = require("../directives/chart/chart");

var _timelion_interval = require("../directives/timelion_interval/timelion_interval");

var _timelion_expression_input = require("../directives/timelion_expression_input");

var _timelion_expression_suggestions = require("../directives/timelion_expression_suggestions/timelion_expression_suggestions");

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
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore

/** @internal */
var initTimelionLegacyModule = (0, _lodash.once)(function (timelionPanels) {
  require('ui/state_management/app_state');

  _modules.uiModules.get('apps/timelion', []).controller('TimelionVisController', function ($scope) {
    $scope.$on('timelionChartRendered', function (event) {
      event.stopPropagation();
      $scope.renderComplete();
    });
  }).constant('timelionPanels', timelionPanels).directive('chart', _chart.Chart).directive('timelionInterval', _timelion_interval.TimelionInterval).directive('timelionExpressionSuggestions', _timelion_expression_suggestions.TimelionExpressionSuggestions).directive('timelionExpressionInput', _timelion_expression_input.TimelionExpInput);
});
exports.initTimelionLegacyModule = initTimelionLegacyModule;