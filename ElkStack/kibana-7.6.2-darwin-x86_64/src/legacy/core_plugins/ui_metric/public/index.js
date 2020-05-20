"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "createUiStatsReporter", {
  enumerable: true,
  get: function get() {
    return _telemetry_analytics.createUiStatsReporter;
  }
});
Object.defineProperty(exports, "METRIC_TYPE", {
  enumerable: true,
  get: function get() {
    return _analytics.METRIC_TYPE;
  }
});
Object.defineProperty(exports, "UiStatsMetricType", {
  enumerable: true,
  get: function get() {
    return _analytics.UiStatsMetricType;
  }
});

var _telemetry_analytics = require("./services/telemetry_analytics");

var _analytics = require("@kbn/analytics");