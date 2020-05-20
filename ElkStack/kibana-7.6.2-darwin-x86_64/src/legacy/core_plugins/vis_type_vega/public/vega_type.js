"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createVegaTypeDefinition = void 0;

var _i18n = require("@kbn/i18n");

var _editor_size = require("ui/vis/editor_size");

var _default_feedback_message = require("ui/vis/default_feedback_message");

var _public = require("../../visualizations/public");

var _components = require("./components");

var _vega_request_handler = require("./vega_request_handler");

var _vega_visualization = require("./vega_visualization");

var _defaultSpec = _interopRequireDefault(require("!!raw-loader!./default.spec.hjson"));

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
// @ts-ignore
// @ts-ignore
var createVegaTypeDefinition = function createVegaTypeDefinition(dependencies) {
  var requestHandler = (0, _vega_request_handler.createVegaRequestHandler)(dependencies);
  var visualization = (0, _vega_visualization.createVegaVisualization)(dependencies);
  return {
    name: 'vega',
    title: 'Vega',
    description: _i18n.i18n.translate('visTypeVega.type.vegaDescription', {
      defaultMessage: 'Create custom visualizations using Vega and Vega-Lite',
      description: 'Vega and Vega-Lite are product names and should not be translated'
    }),
    icon: 'visVega',
    visConfig: {
      defaults: {
        spec: _defaultSpec.default
      }
    },
    editorConfig: {
      optionsTemplate: _components.VegaVisEditor,
      enableAutoApply: true,
      defaultSize: _editor_size.DefaultEditorSize.MEDIUM
    },
    visualization: visualization,
    requestHandler: requestHandler,
    requiresUpdateStatus: [_public.Status.DATA, _public.Status.RESIZE],
    responseHandler: 'none',
    options: {
      showIndexSelection: false,
      showQueryBar: true,
      showFilterBar: true
    },
    stage: 'experimental',
    feedbackMessage: _default_feedback_message.defaultFeedbackMessage
  };
};

exports.createVegaTypeDefinition = createVegaTypeDefinition;