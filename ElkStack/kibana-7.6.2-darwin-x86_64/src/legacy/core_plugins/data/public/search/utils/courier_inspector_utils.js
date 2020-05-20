"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRequestInspectorStats = getRequestInspectorStats;
exports.getResponseInspectorStats = getResponseInspectorStats;

var _i18n = require("@kbn/i18n");

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

/**
 * This function collects statistics from a SearchSource and a response
 * for the usage in the inspector stats panel. Pass in a searchSource and a response
 * and the returned object can be passed to the `stats` method of the request
 * logger.
 */
function getRequestInspectorStats(searchSource) {
  var stats = {};
  var index = searchSource.getField('index');

  if (index) {
    stats.indexPattern = {
      label: _i18n.i18n.translate('data.search.searchSource.indexPatternLabel', {
        defaultMessage: 'Index pattern'
      }),
      value: index.title,
      description: _i18n.i18n.translate('data.search.searchSource.indexPatternDescription', {
        defaultMessage: 'The index pattern that connected to the Elasticsearch indices.'
      })
    };
    stats.indexPatternId = {
      label: _i18n.i18n.translate('data.search.searchSource.indexPatternIdLabel', {
        defaultMessage: 'Index pattern ID'
      }),
      value: index.id,
      description: _i18n.i18n.translate('data.search.searchSource.indexPatternIdDescription', {
        defaultMessage: 'The ID in the {kibanaIndexPattern} index.',
        values: {
          kibanaIndexPattern: '.kibana'
        }
      })
    };
  }

  return stats;
}

function getResponseInspectorStats(searchSource, resp) {
  var lastRequest = searchSource.history && searchSource.history[searchSource.history.length - 1];
  var stats = {};

  if (resp && resp.took) {
    stats.queryTime = {
      label: _i18n.i18n.translate('data.search.searchSource.queryTimeLabel', {
        defaultMessage: 'Query time'
      }),
      value: _i18n.i18n.translate('data.search.searchSource.queryTimeValue', {
        defaultMessage: '{queryTime}ms',
        values: {
          queryTime: resp.took
        }
      }),
      description: _i18n.i18n.translate('data.search.searchSource.queryTimeDescription', {
        defaultMessage: 'The time it took to process the query. ' + 'Does not include the time to send the request or parse it in the browser.'
      })
    };
  }

  if (resp && resp.hits) {
    stats.hitsTotal = {
      label: _i18n.i18n.translate('data.search.searchSource.hitsTotalLabel', {
        defaultMessage: 'Hits (total)'
      }),
      value: "".concat(resp.hits.total),
      description: _i18n.i18n.translate('data.search.searchSource.hitsTotalDescription', {
        defaultMessage: 'The number of documents that match the query.'
      })
    };
    stats.hits = {
      label: _i18n.i18n.translate('data.search.searchSource.hitsLabel', {
        defaultMessage: 'Hits'
      }),
      value: "".concat(resp.hits.hits.length),
      description: _i18n.i18n.translate('data.search.searchSource.hitsDescription', {
        defaultMessage: 'The number of documents returned by the query.'
      })
    };
  }

  if (lastRequest && (lastRequest.ms === 0 || lastRequest.ms)) {
    stats.requestTime = {
      label: _i18n.i18n.translate('data.search.searchSource.requestTimeLabel', {
        defaultMessage: 'Request time'
      }),
      value: _i18n.i18n.translate('data.search.searchSource.requestTimeValue', {
        defaultMessage: '{requestTime}ms',
        values: {
          requestTime: lastRequest.ms
        }
      }),
      description: _i18n.i18n.translate('data.search.searchSource.requestTimeDescription', {
        defaultMessage: 'The time of the request from the browser to Elasticsearch and back. ' + 'Does not include the time the requested waited in the queue.'
      })
    };
  }

  return stats;
}