"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFilterTerms = void 0;

var _public = require("../../../../../../plugins/data/public");

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
var createFilterTerms = function createFilterTerms(aggConfig, key, params) {
  var field = aggConfig.params.field;
  var indexPattern = field.indexPattern;

  if (key === '__other__') {
    var terms = params.terms;

    var phraseFilter = _public.esFilters.buildPhrasesFilter(field, terms, indexPattern);

    phraseFilter.meta.negate = true;
    var filters = [phraseFilter];

    if (terms.some(function (term) {
      return term === '__missing__';
    })) {
      filters.push(_public.esFilters.buildExistsFilter(field, indexPattern));
    }

    return filters;
  } else if (key === '__missing__') {
    var existsFilter = _public.esFilters.buildExistsFilter(field, indexPattern);

    existsFilter.meta.negate = true;
    return existsFilter;
  }

  return _public.esFilters.buildPhraseFilter(field, key, indexPattern);
};

exports.createFilterTerms = createFilterTerms;