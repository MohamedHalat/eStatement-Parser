"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.replaceTelemetryInjectedVars = replaceTelemetryInjectedVars;

var _telemetry_repository = require("../telemetry_repository");

var _get_telemetry_opt_in = require("./get_telemetry_opt_in");

var _get_telemetry_send_usage_from = require("./get_telemetry_send_usage_from");

var _get_telemetry_allow_changing_opt_in_status = require("./get_telemetry_allow_changing_opt_in_status");

var _get_telemetry_notify_user_about_optin_default = require("./get_telemetry_notify_user_about_optin_default");

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
async function replaceTelemetryInjectedVars(request, server) {
  const config = server.config();
  const configTelemetrySendUsageFrom = config.get('telemetry.sendUsageFrom');
  const configTelemetryOptIn = config.get('telemetry.optIn');
  const configTelemetryAllowChangingOptInStatus = config.get('telemetry.allowChangingOptInStatus');
  const isRequestingApplication = request.path.startsWith('/app'); // Prevent interstitial screens (such as the space selector) from prompting for telemetry

  if (!isRequestingApplication) {
    return {
      telemetryOptedIn: false
    };
  }

  const currentKibanaVersion = config.get('pkg.version');
  const savedObjectsClient = server.savedObjects.getScopedSavedObjectsClient(request);
  const telemetrySavedObject = await (0, _telemetry_repository.getTelemetrySavedObject)(savedObjectsClient);
  const allowChangingOptInStatus = (0, _get_telemetry_allow_changing_opt_in_status.getTelemetryAllowChangingOptInStatus)({
    configTelemetryAllowChangingOptInStatus,
    telemetrySavedObject
  });
  const telemetryOptedIn = (0, _get_telemetry_opt_in.getTelemetryOptIn)({
    configTelemetryOptIn,
    allowChangingOptInStatus,
    telemetrySavedObject,
    currentKibanaVersion
  });
  const telemetrySendUsageFrom = (0, _get_telemetry_send_usage_from.getTelemetrySendUsageFrom)({
    configTelemetrySendUsageFrom,
    telemetrySavedObject
  });
  const telemetryNotifyUserAboutOptInDefault = (0, _get_telemetry_notify_user_about_optin_default.getNotifyUserAboutOptInDefault)({
    telemetrySavedObject,
    allowChangingOptInStatus,
    configTelemetryOptIn,
    telemetryOptedIn
  });
  return {
    telemetryOptedIn,
    telemetrySendUsageFrom,
    telemetryNotifyUserAboutOptInDefault
  };
}