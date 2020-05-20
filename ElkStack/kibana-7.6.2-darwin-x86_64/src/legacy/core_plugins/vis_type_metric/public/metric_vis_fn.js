"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMetricVisFn = void 0;

var _i18n = require("@kbn/i18n");

var _colormaps = require("ui/vislib/components/color/colormaps");

var _collections = require("../../kbn_vislib_vis_types/public/utils/collections");

var _types = require("./types");

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
var name = 'metricVis';

var createMetricVisFn = function createMetricVisFn() {
  return {
    name: name,
    type: 'render',
    context: {
      types: ['kibana_datatable']
    },
    help: _i18n.i18n.translate('visTypeMetric.function.help', {
      defaultMessage: 'Metric visualization'
    }),
    args: {
      percentage: {
        types: ['boolean'],
        default: false,
        help: _i18n.i18n.translate('visTypeMetric.function.percentage.help', {
          defaultMessage: 'Shows metric in percentage mode. Requires colorRange to be set.'
        })
      },
      colorScheme: {
        types: ['string'],
        default: '"Green to Red"',
        options: Object.values(_colormaps.vislibColorMaps).map(function (value) {
          return value.id;
        }),
        help: _i18n.i18n.translate('visTypeMetric.function.colorScheme.help', {
          defaultMessage: 'Color scheme to use'
        })
      },
      colorMode: {
        types: ['string'],
        default: '"None"',
        options: [_collections.ColorModes.NONE, _collections.ColorModes.LABELS, _collections.ColorModes.BACKGROUND],
        help: _i18n.i18n.translate('visTypeMetric.function.colorMode.help', {
          defaultMessage: 'Which part of metric to color'
        })
      },
      colorRange: {
        types: ['range'],
        multi: true,
        default: '{range from=0 to=10000}',
        help: _i18n.i18n.translate('visTypeMetric.function.colorRange.help', {
          defaultMessage: 'A range object specifying groups of values to which different colors should be applied.'
        })
      },
      useRanges: {
        types: ['boolean'],
        default: false,
        help: _i18n.i18n.translate('visTypeMetric.function.useRanges.help', {
          defaultMessage: 'Enabled color ranges.'
        })
      },
      invertColors: {
        types: ['boolean'],
        default: false,
        help: _i18n.i18n.translate('visTypeMetric.function.invertColors.help', {
          defaultMessage: 'Inverts the color ranges'
        })
      },
      showLabels: {
        types: ['boolean'],
        default: true,
        help: _i18n.i18n.translate('visTypeMetric.function.showLabels.help', {
          defaultMessage: 'Shows labels under the metric values.'
        })
      },
      bgFill: {
        types: ['string'],
        default: '"#000"',
        aliases: ['backgroundFill', 'bgColor', 'backgroundColor'],
        help: _i18n.i18n.translate('visTypeMetric.function.bgFill.help', {
          defaultMessage: 'Color as html hex code (#123456), html color (red, blue) or rgba value (rgba(255,255,255,1)).'
        })
      },
      font: {
        types: ['style'],
        help: _i18n.i18n.translate('visTypeMetric.function.font.help', {
          defaultMessage: 'Font settings.'
        }),
        default: '{font size=60}'
      },
      subText: {
        types: ['string'],
        aliases: ['label', 'text', 'description'],
        default: '""',
        help: _i18n.i18n.translate('visTypeMetric.function.subText.help', {
          defaultMessage: 'Custom text to show under the metric'
        })
      },
      metric: {
        types: ['vis_dimension'],
        help: _i18n.i18n.translate('visTypeMetric.function.metric.help', {
          defaultMessage: 'metric dimension configuration'
        }),
        required: true,
        multi: true
      },
      bucket: {
        types: ['vis_dimension'],
        help: _i18n.i18n.translate('visTypeMetric.function.bucket.help', {
          defaultMessage: 'bucket dimension configuration'
        })
      }
    },
    fn: function fn(context, args) {
      var dimensions = {
        metrics: args.metric
      };

      if (args.bucket) {
        dimensions.bucket = args.bucket;
      }

      if (args.percentage && (!args.colorRange || args.colorRange.length === 0)) {
        throw new Error('colorRange must be provided when using percentage');
      }

      var fontSize = Number.parseInt(args.font.spec.fontSize || '', 10);
      return {
        type: 'render',
        as: 'visualization',
        value: {
          visData: context,
          visType: _types.visType,
          visConfig: {
            metric: {
              percentageMode: args.percentage,
              useRanges: args.useRanges,
              colorSchema: args.colorScheme,
              metricColorMode: args.colorMode,
              colorsRange: args.colorRange,
              labels: {
                show: args.showLabels
              },
              invertColors: args.invertColors,
              style: {
                bgFill: args.bgFill,
                bgColor: args.colorMode === _collections.ColorModes.BACKGROUND,
                labelColor: args.colorMode === _collections.ColorModes.LABELS,
                subText: args.subText,
                fontSize: fontSize
              }
            },
            dimensions: dimensions
          },
          params: {
            listenOnChange: true
          }
        }
      };
    }
  };
};

exports.createMetricVisFn = createMetricVisFn;