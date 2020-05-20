"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "encryptTelemetry", {
  enumerable: true,
  get: function () {
    return _encryption.encryptTelemetry;
  }
});
Object.defineProperty(exports, "registerTelemetryUsageCollector", {
  enumerable: true,
  get: function () {
    return _usage.registerTelemetryUsageCollector;
  }
});
Object.defineProperty(exports, "registerUiMetricUsageCollector", {
  enumerable: true,
  get: function () {
    return _ui_metric.registerUiMetricUsageCollector;
  }
});
Object.defineProperty(exports, "registerLocalizationUsageCollector", {
  enumerable: true,
  get: function () {
    return _localization.registerLocalizationUsageCollector;
  }
});
Object.defineProperty(exports, "registerTelemetryPluginUsageCollector", {
  enumerable: true,
  get: function () {
    return _telemetry_plugin.registerTelemetryPluginUsageCollector;
  }
});
Object.defineProperty(exports, "registerManagementUsageCollector", {
  enumerable: true,
  get: function () {
    return _management.registerManagementUsageCollector;
  }
});

var _encryption = require("./encryption");

var _usage = require("./usage");

var _ui_metric = require("./ui_metric");

var _localization = require("./localization");

var _telemetry_plugin = require("./telemetry_plugin");

var _management = require("./management");