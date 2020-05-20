"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TelemetryPlugin = void 0;

var _routes = require("./routes");

var _telemetry_collection = require("./telemetry_collection");

var _collectors = require("./collectors");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class TelemetryPlugin {
  constructor(initializerContext) {
    _defineProperty(this, "currentKibanaVersion", void 0);

    this.currentKibanaVersion = initializerContext.env.packageInfo.version;
  }

  setup(core, {
    usageCollection
  }, server) {
    const currentKibanaVersion = this.currentKibanaVersion;
    (0, _telemetry_collection.registerCollection)();
    (0, _routes.registerRoutes)({
      core,
      currentKibanaVersion
    });
    (0, _collectors.registerTelemetryPluginUsageCollector)(usageCollection, server);
    (0, _collectors.registerLocalizationUsageCollector)(usageCollection, server);
    (0, _collectors.registerTelemetryUsageCollector)(usageCollection, server);
    (0, _collectors.registerUiMetricUsageCollector)(usageCollection, server);
    (0, _collectors.registerManagementUsageCollector)(usageCollection, server);
  }

}

exports.TelemetryPlugin = TelemetryPlugin;