"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCollectorFetch = createCollectorFetch;
exports.registerTelemetryPluginUsageCollector = registerTelemetryPluginUsageCollector;

var _constants = require("../../../common/constants");

var _telemetry_repository = require("../../telemetry_repository");

var _telemetry_config = require("../../telemetry_config");

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
function createCollectorFetch(server) {
  return async function fetchUsageStats() {
    const config = server.config();
    const configTelemetrySendUsageFrom = config.get('telemetry.sendUsageFrom');
    const allowChangingOptInStatus = config.get('telemetry.allowChangingOptInStatus');
    const configTelemetryOptIn = config.get('telemetry.optIn');
    const currentKibanaVersion = config.get('pkg.version');
    let telemetrySavedObject = {};

    try {
      const {
        getSavedObjectsRepository
      } = server.savedObjects;
      const {
        callWithInternalUser
      } = server.plugins.elasticsearch.getCluster('admin');
      const internalRepository = getSavedObjectsRepository(callWithInternalUser);
      telemetrySavedObject = await (0, _telemetry_repository.getTelemetrySavedObject)(internalRepository);
    } catch (err) {// no-op
    }

    return {
      opt_in_status: (0, _telemetry_config.getTelemetryOptIn)({
        currentKibanaVersion,
        telemetrySavedObject,
        allowChangingOptInStatus,
        configTelemetryOptIn
      }),
      last_reported: telemetrySavedObject ? telemetrySavedObject.lastReported : undefined,
      usage_fetcher: (0, _telemetry_config.getTelemetrySendUsageFrom)({
        telemetrySavedObject,
        configTelemetrySendUsageFrom
      })
    };
  };
}

function registerTelemetryPluginUsageCollector(usageCollection, server) {
  const collector = usageCollection.makeUsageCollector({
    type: _constants.TELEMETRY_STATS_TYPE,
    isReady: () => true,
    fetch: createCollectorFetch(server)
  });
  usageCollection.registerCollector(collector);
}