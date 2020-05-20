"use strict";

var _new_platform = require("ui/new_platform");

var _modules = require("ui/modules");

var _services = require("../services");

var _telemetry = require("./telemetry");

var _fetch_telemetry = require("./fetch_telemetry");

var _handle_old_settings = require("./welcome_banner/handle_old_settings");

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
// @ts-ignore
// @ts-ignore
// @ts-ignore
function telemetryInit($injector) {
  var $http = $injector.get('$http');
  var Private = $injector.get('Private');
  var config = $injector.get('config');
  var telemetryOptInProvider = Private(_services.TelemetryOptInProvider);

  var telemetryEnabled = _new_platform.npStart.core.injectedMetadata.getInjectedVar('telemetryEnabled');

  var telemetryOptedIn = (0, _handle_old_settings.isOptInHandleOldSettings)(config, telemetryOptInProvider);

  var sendUsageFrom = _new_platform.npStart.core.injectedMetadata.getInjectedVar('telemetrySendUsageFrom');

  if (telemetryEnabled && telemetryOptedIn && sendUsageFrom === 'browser') {
    // no telemetry for non-logged in users
    if ((0, _services.isUnauthenticated)()) {
      return;
    }

    var sender = new _telemetry.Telemetry($injector, function () {
      return (0, _fetch_telemetry.fetchTelemetry)($http);
    });
    sender.start();
  }
}

_modules.uiModules.get('telemetry/hacks').run(telemetryInit);