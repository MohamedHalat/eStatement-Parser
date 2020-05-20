"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _legacy_dependencies_plugin = require("./legacy_dependencies_plugin");

Object.keys(_legacy_dependencies_plugin).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _legacy_dependencies_plugin[key];
    }
  });
});