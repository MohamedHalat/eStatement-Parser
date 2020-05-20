"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.visPayloadSchema = void 0;

var _joi = _interopRequireDefault(require("joi"));

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
const stringOptionalNullable = _joi.default.string().allow('', null).optional();

const stringRequired = _joi.default.string().allow('').required();

const arrayNullable = _joi.default.array().allow(null);

const numberIntegerOptional = _joi.default.number().integer().optional();

const numberIntegerRequired = _joi.default.number().integer().required();

const numberOptional = _joi.default.number().optional();

const queryObject = _joi.default.object({
  language: _joi.default.string().allow(''),
  query: _joi.default.string().allow('')
});

const numberOptionalOrEmptyString = _joi.default.alternatives(numberOptional, _joi.default.string().valid(''));

const annotationsItems = _joi.default.object({
  color: stringOptionalNullable,
  fields: stringOptionalNullable,
  hidden: _joi.default.boolean().optional(),
  icon: stringOptionalNullable,
  id: stringOptionalNullable,
  ignore_global_filters: numberIntegerOptional,
  ignore_panel_filters: numberIntegerOptional,
  index_pattern: stringOptionalNullable,
  query_string: queryObject.optional(),
  template: stringOptionalNullable,
  time_field: stringOptionalNullable
});

const backgroundColorRulesItems = _joi.default.object({
  value: _joi.default.number().allow(null).optional(),
  id: stringOptionalNullable,
  background_color: stringOptionalNullable,
  color: stringOptionalNullable
});

const gaugeColorRulesItems = _joi.default.object({
  gauge: stringOptionalNullable,
  text: stringOptionalNullable,
  id: stringOptionalNullable,
  operator: stringOptionalNullable,
  value: _joi.default.number()
});

const metricsItems = _joi.default.object({
  field: stringOptionalNullable,
  id: stringRequired,
  metric_agg: stringOptionalNullable,
  numerator: stringOptionalNullable,
  denominator: stringOptionalNullable,
  sigma: stringOptionalNullable,
  unit: stringOptionalNullable,
  model_type: stringOptionalNullable,
  mode: stringOptionalNullable,
  lag: numberOptional,
  alpha: numberOptional,
  beta: numberOptional,
  gamma: numberOptional,
  period: numberOptional,
  multiplicative: _joi.default.boolean(),
  window: numberOptional,
  function: stringOptionalNullable,
  script: stringOptionalNullable,
  variables: _joi.default.array().items(_joi.default.object({
    field: stringOptionalNullable,
    id: stringRequired,
    name: stringOptionalNullable
  })).optional(),
  percentiles: _joi.default.array().items(_joi.default.object({
    id: stringRequired,
    field: stringOptionalNullable,
    mode: _joi.default.string().allow('line', 'band'),
    shade: _joi.default.alternatives(numberOptional, stringOptionalNullable),
    value: _joi.default.alternatives(numberOptional, stringOptionalNullable),
    percentile: stringOptionalNullable
  })).optional(),
  type: stringRequired,
  value: stringOptionalNullable,
  values: _joi.default.array().items(_joi.default.string().allow('', null)).allow(null).optional()
});

const splitFiltersItems = _joi.default.object({
  id: stringOptionalNullable,
  color: stringOptionalNullable,
  filter: _joi.default.object({
    language: _joi.default.string().allow(''),
    query: _joi.default.string().allow('')
  }).optional(),
  label: stringOptionalNullable
});

const seriesItems = _joi.default.object({
  aggregate_by: stringOptionalNullable,
  aggregate_function: stringOptionalNullable,
  axis_position: stringRequired,
  axis_max: stringOptionalNullable,
  axis_min: stringOptionalNullable,
  chart_type: stringRequired,
  color: stringRequired,
  color_rules: _joi.default.array().items(_joi.default.object({
    value: numberOptional,
    id: stringRequired,
    text: stringOptionalNullable,
    operator: stringOptionalNullable
  })).optional(),
  fill: numberOptionalOrEmptyString,
  filter: _joi.default.alternatives(_joi.default.object({
    query: stringRequired,
    language: stringOptionalNullable
  }).optional(), _joi.default.string().valid('')),
  formatter: stringRequired,
  hide_in_legend: numberIntegerOptional,
  hidden: _joi.default.boolean().optional(),
  id: stringRequired,
  label: stringOptionalNullable,
  line_width: numberOptionalOrEmptyString,
  metrics: _joi.default.array().items(metricsItems),
  offset_time: stringOptionalNullable,
  override_index_pattern: numberOptional,
  point_size: numberOptionalOrEmptyString,
  separate_axis: numberIntegerOptional,
  seperate_axis: numberIntegerOptional,
  series_index_pattern: stringOptionalNullable,
  series_time_field: stringOptionalNullable,
  series_interval: stringOptionalNullable,
  series_drop_last_bucket: numberIntegerOptional,
  split_color_mode: stringOptionalNullable,
  split_filters: _joi.default.array().items(splitFiltersItems).optional(),
  split_mode: stringRequired,
  stacked: stringRequired,
  steps: numberIntegerOptional,
  terms_field: stringOptionalNullable,
  terms_order_by: stringOptionalNullable,
  terms_size: stringOptionalNullable,
  terms_direction: stringOptionalNullable,
  terms_include: stringOptionalNullable,
  terms_exclude: stringOptionalNullable,
  time_range_mode: stringOptionalNullable,
  trend_arrows: numberOptional,
  type: stringOptionalNullable,
  value_template: stringOptionalNullable,
  var_name: stringOptionalNullable
});

const visPayloadSchema = _joi.default.object({
  filters: arrayNullable,
  panels: _joi.default.array().items(_joi.default.object({
    annotations: _joi.default.array().items(annotationsItems).optional(),
    axis_formatter: stringRequired,
    axis_position: stringRequired,
    axis_scale: stringRequired,
    axis_min: stringOptionalNullable,
    axis_max: stringOptionalNullable,
    bar_color_rules: arrayNullable.optional(),
    background_color: stringOptionalNullable,
    background_color_rules: _joi.default.array().items(backgroundColorRulesItems).optional(),
    default_index_pattern: stringOptionalNullable,
    default_timefield: stringOptionalNullable,
    drilldown_url: stringOptionalNullable,
    drop_last_bucket: numberIntegerOptional,
    filter: _joi.default.alternatives(stringOptionalNullable, _joi.default.object({
      language: stringOptionalNullable,
      query: stringOptionalNullable
    })),
    gauge_color_rules: _joi.default.array().items(gaugeColorRulesItems).optional(),
    gauge_width: [stringOptionalNullable, numberOptional],
    gauge_inner_color: stringOptionalNullable,
    gauge_inner_width: _joi.default.alternatives(stringOptionalNullable, numberIntegerOptional),
    gauge_style: stringOptionalNullable,
    gauge_max: stringOptionalNullable,
    id: stringRequired,
    ignore_global_filters: numberOptional,
    ignore_global_filter: numberOptional,
    index_pattern: stringRequired,
    interval: stringRequired,
    isModelInvalid: _joi.default.boolean().optional(),
    legend_position: stringOptionalNullable,
    markdown: stringOptionalNullable,
    markdown_scrollbars: numberIntegerOptional,
    markdown_openLinksInNewTab: numberIntegerOptional,
    markdown_vertical_align: stringOptionalNullable,
    markdown_less: stringOptionalNullable,
    markdown_css: stringOptionalNullable,
    pivot_id: stringOptionalNullable,
    pivot_label: stringOptionalNullable,
    pivot_type: stringOptionalNullable,
    pivot_rows: stringOptionalNullable,
    series: _joi.default.array().items(seriesItems).required(),
    show_grid: numberIntegerRequired,
    show_legend: numberIntegerRequired,
    time_field: stringOptionalNullable,
    time_range_mode: stringOptionalNullable,
    type: stringRequired
  })),
  // general
  query: _joi.default.array().items(queryObject).allow(null).required(),
  state: _joi.default.object({
    sort: _joi.default.object({
      column: stringRequired,
      order: _joi.default.string().valid(['asc', 'desc']).required()
    }).optional()
  }).required(),
  savedObjectId: _joi.default.string().optional(),
  timerange: _joi.default.object({
    timezone: stringRequired,
    min: stringRequired,
    max: stringRequired
  }).required()
});

exports.visPayloadSchema = visPayloadSchema;