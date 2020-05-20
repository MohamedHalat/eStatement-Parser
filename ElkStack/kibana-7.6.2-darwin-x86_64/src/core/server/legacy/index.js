"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  LegacyObjectToConfigAdapter: true,
  ensureValidConfiguration: true,
  LegacyInternals: true,
  LegacyService: true,
  ILegacyService: true
};
Object.defineProperty(exports, "LegacyObjectToConfigAdapter", {
  enumerable: true,
  get: function () {
    return _config.LegacyObjectToConfigAdapter;
  }
});
Object.defineProperty(exports, "ensureValidConfiguration", {
  enumerable: true,
  get: function () {
    return _config.ensureValidConfiguration;
  }
});
Object.defineProperty(exports, "LegacyInternals", {
  enumerable: true,
  get: function () {
    return _legacy_internals.LegacyInternals;
  }
});
Object.defineProperty(exports, "LegacyService", {
  enumerable: true,
  get: function () {
    return _legacy_service.LegacyService;
  }
});
Object.defineProperty(exports, "ILegacyService", {
  enumerable: true,
  get: function () {
    return _legacy_service.ILegacyService;
  }
});

var _config = require("./config");

var _legacy_internals = require("./legacy_internals");

var _legacy_service = require("./legacy_service");

var _types = require("./types");

Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _types[key];
    }
  });
});