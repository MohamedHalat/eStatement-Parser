"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerTelemetryUsageStatsRoutes = registerTelemetryUsageStatsRoutes;

var _joi = _interopRequireDefault(require("joi"));

var _boom = require("boom");

var _collection_manager = require("../collection_manager");

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
function registerTelemetryUsageStatsRoutes(core) {
  const {
    server
  } = core.http;
  server.route({
    method: 'POST',
    path: '/api/telemetry/v2/clusters/_stats',
    config: {
      validate: {
        payload: _joi.default.object({
          unencrypted: _joi.default.bool(),
          timeRange: _joi.default.object({
            min: _joi.default.date().required(),
            max: _joi.default.date().required()
          }).required()
        })
      }
    },
    handler: async (req, h) => {
      const config = req.server.config();
      const start = req.payload.timeRange.min;
      const end = req.payload.timeRange.max;
      const unencrypted = req.payload.unencrypted;

      try {
        return await _collection_manager.telemetryCollectionManager.getStats({
          unencrypted,
          server,
          req,
          start,
          end
        });
      } catch (err) {
        const isDev = config.get('env.dev');

        if (isDev) {
          // don't ignore errors when running in dev mode
          return (0, _boom.boomify)(err, {
            statusCode: err.status || 500
          });
        } else {
          const statusCode = unencrypted && err.status === 403 ? 403 : 200; // ignore errors and return empty set

          return h.response([]).code(statusCode);
        }
      }
    }
  });
}