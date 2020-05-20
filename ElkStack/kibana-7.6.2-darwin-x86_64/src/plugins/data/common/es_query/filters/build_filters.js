"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildFilter = buildFilter;
exports.buildCustomFilter = buildCustomFilter;

var _ = require("../..");

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
function buildFilter(indexPattern, field, type, negate, disabled, params, alias, store) {
  const filter = buildBaseFilter(indexPattern, field, type, params);
  filter.meta.alias = alias;
  filter.meta.negate = negate;
  filter.meta.disabled = disabled;
  filter.$state = {
    store
  };
  return filter;
}

function buildCustomFilter(indexPatternString, queryDsl, disabled, negate, alias, store) {
  const meta = {
    index: indexPatternString,
    type: _.esFilters.FILTERS.CUSTOM,
    disabled,
    negate,
    alias
  };
  const filter = { ...queryDsl,
    meta
  };
  filter.$state = {
    store
  };
  return filter;
}

function buildBaseFilter(indexPattern, field, type, params) {
  switch (type) {
    case 'phrase':
      return _.esFilters.buildPhraseFilter(field, params, indexPattern);

    case 'phrases':
      return _.esFilters.buildPhrasesFilter(field, params, indexPattern);

    case 'range':
      const newParams = {
        gte: params.from,
        lt: params.to
      };
      return _.esFilters.buildRangeFilter(field, newParams, indexPattern);

    case 'exists':
      return _.esFilters.buildExistsFilter(field, indexPattern);

    default:
      throw new Error(`Unknown filter type: ${type}`);
  }
}