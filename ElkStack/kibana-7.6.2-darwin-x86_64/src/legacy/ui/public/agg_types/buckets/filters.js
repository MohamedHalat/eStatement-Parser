"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filtersBucketAgg = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _angular = _interopRequireDefault(require("angular"));

var _i18n = require("@kbn/i18n");

var _chrome = _interopRequireDefault(require("ui/chrome"));

var _filters = require("../../vis/editors/default/controls/filters");

var _filters2 = require("./create_filter/filters");

var _bucket_agg_type = require("./_bucket_agg_type");

var _public = require("../../../../../plugins/kibana_utils/public");

var _public2 = require("../../../../../plugins/data/public");

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
var config = _chrome.default.getUiSettingsClient();

var storage = new _public.Storage(window.localStorage);

var filtersTitle = _i18n.i18n.translate('common.ui.aggTypes.buckets.filtersTitle', {
  defaultMessage: 'Filters',
  description: 'The name of an aggregation, that allows to specify multiple individual filters to group data by.'
});

var filtersBucketAgg = new _bucket_agg_type.BucketAggType({
  name: 'filters',
  title: filtersTitle,
  createFilter: _filters2.createFilterFilters,
  customLabels: false,
  params: [{
    name: 'filters',
    editorComponent: _filters.FiltersParamEditor,
    default: [{
      input: {
        query: '',
        language: config.get('search:queryLanguage')
      },
      label: ''
    }],
    write: function write(aggConfig, output) {
      var inFilters = aggConfig.params.filters;
      if (!_lodash.default.size(inFilters)) return;
      inFilters.forEach(function (filter) {
        var persistedLog = (0, _public2.getQueryLog)(config, storage, 'filtersAgg', filter.input.language);
        persistedLog.add(filter.input.query);
      });

      var outFilters = _lodash.default.transform(inFilters, function (filters, filter) {
        var input = _lodash.default.cloneDeep(filter.input);

        if (!input) {
          console.log('malformed filter agg params, missing "input" query'); // eslint-disable-line no-console

          return;
        }

        var query = _public2.esQuery.buildEsQuery(aggConfig.getIndexPattern(), [input], [], config);

        if (!query) {
          console.log('malformed filter agg params, missing "query" on input'); // eslint-disable-line no-console

          return;
        }

        var matchAllLabel = filter.input.query === '' ? '*' : '';
        var label = filter.label || matchAllLabel || (typeof filter.input.query === 'string' ? filter.input.query : _angular.default.toJson(filter.input.query));
        filters[label] = {
          query: query
        };
      }, {});

      if (!_lodash.default.size(outFilters)) return;
      var params = output.params || (output.params = {});
      params.filters = outFilters;
    }
  }]
});
exports.filtersBucketAgg = filtersBucketAgg;