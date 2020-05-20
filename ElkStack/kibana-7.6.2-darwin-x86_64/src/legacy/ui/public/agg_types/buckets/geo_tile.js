"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.geoTileBucketAgg = void 0;

var _i18n = require("@kbn/i18n");

var _lodash = require("lodash");

var _bucket_agg_type = require("./_bucket_agg_type");

var _bucket_agg_types = require("./bucket_agg_types");

var _public = require("../../../../../plugins/data/public");

var _metric_agg_types = require("../metrics/metric_agg_types");

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
var geotileGridTitle = _i18n.i18n.translate('common.ui.aggTypes.buckets.geotileGridTitle', {
  defaultMessage: 'Geotile'
});

var geoTileBucketAgg = new _bucket_agg_type.BucketAggType({
  name: _bucket_agg_types.BUCKET_TYPES.GEOTILE_GRID,
  title: geotileGridTitle,
  params: [{
    name: 'field',
    type: 'field',
    filterFieldTypes: _public.KBN_FIELD_TYPES.GEO_POINT
  }, {
    name: 'useGeocentroid',
    default: true,
    write: _lodash.noop
  }, {
    name: 'precision',
    default: 0
  }],
  getRequestAggs: function getRequestAggs(agg) {
    var aggs = [];
    var useGeocentroid = agg.getParam('useGeocentroid');
    aggs.push(agg);

    if (useGeocentroid) {
      var aggConfig = {
        type: _metric_agg_types.METRIC_TYPES.GEO_CENTROID,
        enabled: true,
        params: {
          field: agg.getField()
        }
      };
      aggs.push(agg.aggConfigs.createAggConfig(aggConfig, {
        addToAggConfigs: false
      }));
    }

    return aggs;
  }
});
exports.geoTileBucketAgg = geoTileBucketAgg;