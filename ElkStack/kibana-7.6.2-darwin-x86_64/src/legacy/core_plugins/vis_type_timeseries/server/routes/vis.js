"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.visDataRoutes = void 0;

var _configSchema = require("@kbn/config-schema");

var _get_vis_data = require("../lib/get_vis_data");

var _post_vis_schema = require("./post_vis_schema");

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
const escapeHatch = _configSchema.schema.object({}, {
  allowUnknowns: true
});

const visDataRoutes = (router, framework, {
  logFailedValidation
}) => {
  router.post({
    path: '/api/metrics/vis/data',
    validate: {
      body: escapeHatch
    }
  }, async (requestContext, request, response) => {
    const {
      error: validationError
    } = _post_vis_schema.visPayloadSchema.validate(request.body);

    if (validationError) {
      logFailedValidation();
      const savedObjectId = typeof request.body === 'object' && request.body.savedObjectId || 'unavailable';
      framework.logger.warn(`Request validation error: ${validationError.message} (saved object id: ${savedObjectId}). This most likely means your TSVB visualization contains outdated configuration. You can report this problem under https://github.com/elastic/kibana/issues/new?template=Bug_report.md`);
    }

    try {
      const results = await (0, _get_vis_data.getVisData)(requestContext, request.body, framework, request);
      return response.ok({
        body: results
      });
    } catch (error) {
      return response.internalError({
        body: error.message
      });
    }
  });
};

exports.visDataRoutes = visDataRoutes;