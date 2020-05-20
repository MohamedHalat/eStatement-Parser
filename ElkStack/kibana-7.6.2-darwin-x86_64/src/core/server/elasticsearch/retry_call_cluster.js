"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.migrationsRetryCallCluster = migrationsRetryCallCluster;
exports.retryCallCluster = retryCallCluster;

var _operators = require("rxjs/operators");

var _rxjs = require("rxjs");

var legacyElasticsearch = _interopRequireWildcard(require("elasticsearch"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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
const esErrors = legacyElasticsearch.errors;
/**
 * Retries the provided Elasticsearch API call when an error such as
 * `AuthenticationException` `NoConnections`, `ConnectionFault`,
 * `ServiceUnavailable` or `RequestTimeout` are encountered. The API call will
 * be retried once a second, indefinitely, until a successful response or a
 * different error is received.
 *
 * @param apiCaller
 */

function migrationsRetryCallCluster(apiCaller, log, delay = 2500) {
  const previousErrors = [];
  return (endpoint, clientParams = {}, options) => {
    return (0, _rxjs.defer)(() => apiCaller(endpoint, clientParams, options)).pipe((0, _operators.retryWhen)(error$ => error$.pipe((0, _operators.concatMap)((error, i) => {
      if (!previousErrors.includes(error.message)) {
        log.warn(`Unable to connect to Elasticsearch. Error: ${error.message}`);
        previousErrors.push(error.message);
      }

      return (0, _rxjs.iif)(() => {
        var _error$body, _error$body$error;

        return error instanceof esErrors.NoConnections || error instanceof esErrors.ConnectionFault || error instanceof esErrors.ServiceUnavailable || error instanceof esErrors.RequestTimeout || error instanceof esErrors.AuthenticationException || error instanceof esErrors.AuthorizationException || // @ts-ignore
        error instanceof esErrors.Gone || (error === null || error === void 0 ? void 0 : (_error$body = error.body) === null || _error$body === void 0 ? void 0 : (_error$body$error = _error$body.error) === null || _error$body$error === void 0 ? void 0 : _error$body$error.type) === 'snapshot_in_progress_exception';
      }, (0, _rxjs.timer)(delay), (0, _rxjs.throwError)(error));
    })))).toPromise();
  };
}
/**
 * Retries the provided Elasticsearch API call when a `NoConnections` error is
 * encountered. The API call will be retried once a second, indefinitely, until
 * a successful response or a different error is received.
 *
 * @param apiCaller
 */


function retryCallCluster(apiCaller) {
  return (endpoint, clientParams = {}, options) => {
    return (0, _rxjs.defer)(() => apiCaller(endpoint, clientParams, options)).pipe((0, _operators.retryWhen)(errors => errors.pipe((0, _operators.concatMap)((error, i) => (0, _rxjs.iif)(() => error instanceof legacyElasticsearch.errors.NoConnections, (0, _rxjs.timer)(1000), (0, _rxjs.throwError)(error)))))).toPromise();
  };
}