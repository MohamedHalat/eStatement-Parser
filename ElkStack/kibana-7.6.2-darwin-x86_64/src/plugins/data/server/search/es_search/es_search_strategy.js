"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.esSearchStrategyProvider = void 0;

var _operators = require("rxjs/operators");

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
const esSearchStrategyProvider = (context, caller) => {
  return {
    search: async (request, options) => {
      const config = await context.config$.pipe((0, _operators.first)()).toPromise();
      const params = {
        timeout: `${config.elasticsearch.shardTimeout.asMilliseconds()}ms`,
        ignoreUnavailable: true,
        // Don't fail if the index/indices don't exist
        restTotalHitsAsInt: true,
        // Get the number of hits as an int rather than a range
        ...request.params
      };

      if (request.debug) {
        // eslint-disable-next-line
        console.log(JSON.stringify(params, null, 2));
      }

      const esSearchResponse = await caller('search', params, options); // The above query will either complete or timeout and throw an error.
      // There is no progress indication on this api.

      return {
        total: esSearchResponse._shards.total,
        loaded: esSearchResponse._shards.failed + esSearchResponse._shards.skipped + esSearchResponse._shards.successful,
        rawResponse: esSearchResponse
      };
    }
  };
};

exports.esSearchStrategyProvider = esSearchStrategyProvider;