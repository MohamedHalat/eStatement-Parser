"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Plugin = exports.DataServerPlugin = void 0;

var _index_patterns = require("./index_patterns");

var _search_service = require("./search/search_service");

var _scripts = require("./scripts");

var _kql_telemetry = require("./kql_telemetry");

var _autocomplete = require("./autocomplete");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class DataServerPlugin {
  constructor(initializerContext) {
    _defineProperty(this, "searchService", void 0);

    _defineProperty(this, "scriptsService", void 0);

    _defineProperty(this, "kqlTelemetryService", void 0);

    _defineProperty(this, "autocompleteService", void 0);

    _defineProperty(this, "indexPatterns", new _index_patterns.IndexPatternsService());

    this.searchService = new _search_service.SearchService(initializerContext);
    this.scriptsService = new _scripts.ScriptsService();
    this.kqlTelemetryService = new _kql_telemetry.KqlTelemetryService(initializerContext);
    this.autocompleteService = new _autocomplete.AutocompleteService(initializerContext);
  }

  setup(core, {
    usageCollection
  }) {
    this.indexPatterns.setup(core);
    this.scriptsService.setup(core);
    this.autocompleteService.setup(core);
    this.kqlTelemetryService.setup(core, {
      usageCollection
    });
    return {
      search: this.searchService.setup(core)
    };
  }

  start(core) {}

  stop() {}

}

exports.Plugin = exports.DataServerPlugin = DataServerPlugin;