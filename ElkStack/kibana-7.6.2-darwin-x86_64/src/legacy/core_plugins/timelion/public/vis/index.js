"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTimelionVisualization = getTimelionVisualization;
exports.TIMELION_VIS_NAME = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _editor_size = require("ui/vis/editor_size");

var _public = require("../../../../../plugins/kibana_react/public");

var _timelion_request_handler = require("./timelion_request_handler");

var _timelion_vis = _interopRequireDefault(require("./timelion_vis.html"));

var _angular_vis_type = require("../../../../ui/public/vis/vis_types/angular_vis_type");

var _timelion_options = require("./timelion_options");

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
// @ts-ignore
var TIMELION_VIS_NAME = 'timelion';
exports.TIMELION_VIS_NAME = TIMELION_VIS_NAME;

function getTimelionVisualization(dependencies) {
  var http = dependencies.http,
      uiSettings = dependencies.uiSettings;
  var timelionRequestHandler = (0, _timelion_request_handler.getTimelionRequestHandler)(dependencies); // return the visType object, which kibana will use to display and configure new
  // Vis object of this type.

  return {
    name: TIMELION_VIS_NAME,
    title: 'Timelion',
    icon: 'visTimelion',
    description: _i18n.i18n.translate('timelion.timelionDescription', {
      defaultMessage: 'Build time-series using functional expressions'
    }),
    visualization: _angular_vis_type.AngularVisController,
    visConfig: {
      defaults: {
        expression: '.es(*)',
        interval: 'auto'
      },
      template: _timelion_vis.default
    },
    editorConfig: {
      optionsTemplate: function optionsTemplate(props) {
        return _react.default.createElement(_public.KibanaContextProvider, {
          services: {
            uiSettings: uiSettings,
            http: http
          }
        }, _react.default.createElement(_timelion_options.TimelionOptions, props));
      },
      defaultSize: _editor_size.DefaultEditorSize.MEDIUM
    },
    requestHandler: timelionRequestHandler,
    responseHandler: 'none',
    options: {
      showIndexSelection: false,
      showQueryBar: false,
      showFilterBar: false
    }
  };
}