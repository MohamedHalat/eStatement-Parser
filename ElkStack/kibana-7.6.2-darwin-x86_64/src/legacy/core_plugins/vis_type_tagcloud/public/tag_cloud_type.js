"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tagcloudVisDefinition = void 0;

var _i18n = require("@kbn/i18n");

var _schemas = require("ui/vis/editors/default/schemas");

var _public = require("../../visualizations/public");

var _tag_cloud_options = require("./components/tag_cloud_options");

var _tag_cloud_visualization = require("./components/tag_cloud_visualization");

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
var tagcloudVisDefinition = {
  name: 'tagcloud',
  title: _i18n.i18n.translate('visTypeTagCloud.vis.tagCloudTitle', {
    defaultMessage: 'Tag Cloud'
  }),
  icon: 'visTagCloud',
  description: _i18n.i18n.translate('visTypeTagCloud.vis.tagCloudDescription', {
    defaultMessage: 'A group of words, sized according to their importance'
  }),
  visConfig: {
    defaults: {
      scale: 'linear',
      orientation: 'single',
      minFontSize: 18,
      maxFontSize: 72,
      showLabel: true
    }
  },
  requiresUpdateStatus: [_public.Status.PARAMS, _public.Status.RESIZE, _public.Status.DATA],
  visualization: _tag_cloud_visualization.TagCloudVisualization,
  editorConfig: {
    collections: {
      scales: [{
        text: _i18n.i18n.translate('visTypeTagCloud.vis.editorConfig.scales.linearText', {
          defaultMessage: 'Linear'
        }),
        value: 'linear'
      }, {
        text: _i18n.i18n.translate('visTypeTagCloud.vis.editorConfig.scales.logText', {
          defaultMessage: 'Log'
        }),
        value: 'log'
      }, {
        text: _i18n.i18n.translate('visTypeTagCloud.vis.editorConfig.scales.squareRootText', {
          defaultMessage: 'Square root'
        }),
        value: 'square root'
      }],
      orientations: [{
        text: _i18n.i18n.translate('visTypeTagCloud.vis.editorConfig.orientations.singleText', {
          defaultMessage: 'Single'
        }),
        value: 'single'
      }, {
        text: _i18n.i18n.translate('visTypeTagCloud.vis.editorConfig.orientations.rightAngledText', {
          defaultMessage: 'Right angled'
        }),
        value: 'right angled'
      }, {
        text: _i18n.i18n.translate('visTypeTagCloud.vis.editorConfig.orientations.multipleText', {
          defaultMessage: 'Multiple'
        }),
        value: 'multiple'
      }]
    },
    optionsTemplate: _tag_cloud_options.TagCloudOptions,
    schemas: new _schemas.Schemas([{
      group: 'metrics',
      name: 'metric',
      title: _i18n.i18n.translate('visTypeTagCloud.vis.schemas.metricTitle', {
        defaultMessage: 'Tag size'
      }),
      min: 1,
      max: 1,
      aggFilter: ['!std_dev', '!percentiles', '!percentile_ranks', '!derivative', '!geo_bounds', '!geo_centroid'],
      defaults: [{
        schema: 'metric',
        type: 'count'
      }]
    }, {
      group: 'buckets',
      name: 'segment',
      title: _i18n.i18n.translate('visTypeTagCloud.vis.schemas.segmentTitle', {
        defaultMessage: 'Tags'
      }),
      min: 1,
      max: 1,
      aggFilter: ['terms', 'significant_terms']
    }])
  },
  useCustomNoDataScreen: true
};
exports.tagcloudVisDefinition = tagcloudVisDefinition;