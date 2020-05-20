"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertIPRangeToString = exports.ipRangeBucketAgg = void 0;

var _lodash = require("lodash");

var _i18n = require("@kbn/i18n");

var _new_platform = require("ui/new_platform");

var _bucket_agg_type = require("./_bucket_agg_type");

var _ip_range_type = require("../../vis/editors/default/controls/ip_range_type");

var _ip_ranges = require("../../vis/editors/default/controls/ip_ranges");

var _bucket_agg_types = require("./bucket_agg_types");

var _ip_range = require("./create_filter/ip_range");

var _public = require("../../../../../plugins/data/public");

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
var ipRangeTitle = _i18n.i18n.translate('common.ui.aggTypes.buckets.ipRangeTitle', {
  defaultMessage: 'IPv4 Range'
});

var ipRangeBucketAgg = new _bucket_agg_type.BucketAggType({
  name: _bucket_agg_types.BUCKET_TYPES.IP_RANGE,
  title: ipRangeTitle,
  createFilter: _ip_range.createFilterIpRange,
  getKey: function getKey(bucket, key, agg) {
    if (agg.params.ipRangeType === 'mask') {
      return {
        type: 'mask',
        mask: key
      };
    }

    return {
      type: 'range',
      from: bucket.from,
      to: bucket.to
    };
  },
  getFormat: function getFormat(agg) {
    var fieldFormats = _new_platform.npStart.plugins.data.fieldFormats;
    var formatter = agg.fieldOwnFormatter(_public.TEXT_CONTEXT_TYPE, fieldFormats.getDefaultInstance(_public.KBN_FIELD_TYPES.IP));

    var IpRangeFormat = _public.FieldFormat.from(function (range) {
      return convertIPRangeToString(range, formatter);
    });

    return new IpRangeFormat();
  },
  makeLabel: function makeLabel(aggConfig) {
    return _i18n.i18n.translate('common.ui.aggTypes.buckets.ipRangeLabel', {
      defaultMessage: '{fieldName} IP ranges',
      values: {
        fieldName: aggConfig.getFieldDisplayName()
      }
    });
  },
  params: [{
    name: 'field',
    type: 'field',
    filterFieldTypes: _public.KBN_FIELD_TYPES.IP
  }, {
    name: 'ipRangeType',
    editorComponent: _ip_range_type.IpRangeTypeParamEditor,
    default: 'fromTo',
    write: _lodash.noop
  }, {
    name: 'ranges',
    default: {
      fromTo: [{
        from: '0.0.0.0',
        to: '127.255.255.255'
      }, {
        from: '128.0.0.0',
        to: '191.255.255.255'
      }],
      mask: [{
        mask: '0.0.0.0/1'
      }, {
        mask: '128.0.0.0/2'
      }]
    },
    editorComponent: _ip_ranges.IpRangesParamEditor,
    write: function write(aggConfig, output) {
      var ipRangeType = aggConfig.params.ipRangeType;
      var ranges = aggConfig.params.ranges[ipRangeType];

      if (ipRangeType === 'fromTo') {
        ranges = (0, _lodash.map)(ranges, function (range) {
          return (0, _lodash.omit)(range, _lodash.isNull);
        });
      }

      output.params.ranges = ranges;
    }
  }]
});
exports.ipRangeBucketAgg = ipRangeBucketAgg;

var convertIPRangeToString = function convertIPRangeToString(range, format) {
  if (range.type === 'mask') {
    return format(range.mask);
  }

  var from = range.from ? format(range.from) : '-Infinity';
  var to = range.to ? format(range.to) : 'Infinity';
  return "".concat(from, " to ").concat(to);
};

exports.convertIPRangeToString = convertIPRangeToString;