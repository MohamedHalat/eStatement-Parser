"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterBucketAgg = void 0;

var _i18n = require("@kbn/i18n");

var _bucket_agg_type = require("./_bucket_agg_type");

var _bucket_agg_types = require("./bucket_agg_types");

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
var filterTitle = _i18n.i18n.translate('common.ui.aggTypes.buckets.filterTitle', {
  defaultMessage: 'Filter'
});

var filterBucketAgg = new _bucket_agg_type.BucketAggType({
  name: _bucket_agg_types.BUCKET_TYPES.FILTER,
  title: filterTitle,
  params: [{
    name: 'geo_bounding_box'
  }]
});
exports.filterBucketAgg = filterBucketAgg;