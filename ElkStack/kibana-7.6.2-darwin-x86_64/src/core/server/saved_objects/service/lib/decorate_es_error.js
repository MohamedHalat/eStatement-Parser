"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decorateEsError = decorateEsError;

var legacyElasticsearch = _interopRequireWildcard(require("elasticsearch"));

var _lodash = require("lodash");

var _errors = require("./errors");

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
const {
  ConnectionFault,
  ServiceUnavailable,
  NoConnections,
  RequestTimeout,
  Conflict,
  // @ts-ignore
  401: NotAuthorized,
  // @ts-ignore
  403: Forbidden,
  // @ts-ignore
  413: RequestEntityTooLarge,
  NotFound,
  BadRequest
} = legacyElasticsearch.errors;

function decorateEsError(error) {
  if (!(error instanceof Error)) {
    throw new Error('Expected an instance of Error');
  }

  const {
    reason
  } = (0, _lodash.get)(error, 'body.error', {
    reason: undefined
  });

  if (error instanceof ConnectionFault || error instanceof ServiceUnavailable || error instanceof NoConnections || error instanceof RequestTimeout) {
    return _errors.SavedObjectsErrorHelpers.decorateEsUnavailableError(error, reason);
  }

  if (error instanceof Conflict) {
    return _errors.SavedObjectsErrorHelpers.decorateConflictError(error, reason);
  }

  if (error instanceof NotAuthorized) {
    return _errors.SavedObjectsErrorHelpers.decorateNotAuthorizedError(error, reason);
  }

  if (error instanceof Forbidden) {
    return _errors.SavedObjectsErrorHelpers.decorateForbiddenError(error, reason);
  }

  if (error instanceof RequestEntityTooLarge) {
    return _errors.SavedObjectsErrorHelpers.decorateRequestEntityTooLargeError(error, reason);
  }

  if (error instanceof NotFound) {
    return _errors.SavedObjectsErrorHelpers.createGenericNotFoundError();
  }

  if (error instanceof BadRequest) {
    return _errors.SavedObjectsErrorHelpers.decorateBadRequestError(error, reason);
  }

  return _errors.SavedObjectsErrorHelpers.decorateGeneralError(error, reason);
}