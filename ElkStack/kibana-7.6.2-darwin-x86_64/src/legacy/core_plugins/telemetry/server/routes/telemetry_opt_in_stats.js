"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendTelemetryOptInStatus = sendTelemetryOptInStatus;
exports.registerTelemetryOptInStatsRoutes = registerTelemetryOptInStatsRoutes;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _joi = _interopRequireDefault(require("joi"));

var _moment = _interopRequireDefault(require("moment"));

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
// @ts-ignore
async function sendTelemetryOptInStatus(config, statsGetterConfig) {
  const {
    optInStatusUrl,
    newOptInStatus
  } = config;
  const optInStatus = await _collection_manager.telemetryCollectionManager.getOptInStats(newOptInStatus, statsGetterConfig);
  await (0, _nodeFetch.default)(optInStatusUrl, {
    method: 'post',
    body: optInStatus
  });
}

function registerTelemetryOptInStatsRoutes(core) {
  const {
    server
  } = core.http;
  server.route({
    method: 'POST',
    path: '/api/telemetry/v2/clusters/_opt_in_stats',
    options: {
      validate: {
        payload: _joi.default.object({
          enabled: _joi.default.bool().required(),
          unencrypted: _joi.default.bool().default(true)
        })
      }
    },
    handler: async (req, h) => {
      try {
        const newOptInStatus = req.payload.enabled;
        const unencrypted = req.payload.unencrypted;
        const statsGetterConfig = {
          start: (0, _moment.default)().subtract(20, 'minutes').toISOString(),
          end: (0, _moment.default)().toISOString(),
          server: req.server,
          req,
          unencrypted
        };
        const optInStatus = await _collection_manager.telemetryCollectionManager.getOptInStats(newOptInStatus, statsGetterConfig);
        return h.response(optInStatus).code(200);
      } catch (err) {
        return h.response([]).code(200);
      }
    }
  });
}