"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerTelemetryOptInRoutes = registerTelemetryOptInRoutes;

var _joi = _interopRequireDefault(require("joi"));

var _moment = _interopRequireDefault(require("moment"));

var _boom = require("boom");

var _telemetry_config = require("../telemetry_config");

var _telemetry_opt_in_stats = require("./telemetry_opt_in_stats");

var _telemetry_repository = require("../telemetry_repository");

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
function registerTelemetryOptInRoutes({
  core,
  currentKibanaVersion
}) {
  const {
    server
  } = core.http;
  server.route({
    method: 'POST',
    path: '/api/telemetry/v2/optIn',
    options: {
      validate: {
        payload: _joi.default.object({
          enabled: _joi.default.bool().required()
        })
      }
    },
    handler: async (req, h) => {
      try {
        const newOptInStatus = req.payload.enabled;
        const attributes = {
          enabled: newOptInStatus,
          lastVersionChecked: currentKibanaVersion
        };
        const config = req.server.config();
        const savedObjectsClient = req.getSavedObjectsClient();
        const configTelemetryAllowChangingOptInStatus = config.get('telemetry.allowChangingOptInStatus');
        const allowChangingOptInStatus = (0, _telemetry_config.getTelemetryAllowChangingOptInStatus)({
          telemetrySavedObject: savedObjectsClient,
          configTelemetryAllowChangingOptInStatus
        });

        if (!allowChangingOptInStatus) {
          return h.response({
            error: 'Not allowed to change Opt-in Status.'
          }).code(400);
        }

        const sendUsageFrom = config.get('telemetry.sendUsageFrom');

        if (sendUsageFrom === 'server') {
          const optInStatusUrl = config.get('telemetry.optInStatusUrl');
          await (0, _telemetry_opt_in_stats.sendTelemetryOptInStatus)({
            optInStatusUrl,
            newOptInStatus
          }, {
            start: (0, _moment.default)().subtract(20, 'minutes').toISOString(),
            end: (0, _moment.default)().toISOString(),
            server: req.server,
            unencrypted: false
          });
        }

        await (0, _telemetry_repository.updateTelemetrySavedObject)(savedObjectsClient, attributes);
        return h.response({}).code(200);
      } catch (err) {
        return (0, _boom.boomify)(err);
      }
    }
  });
}