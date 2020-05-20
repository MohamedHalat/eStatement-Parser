"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _persisted_log = require("./persisted_log");

Object.keys(_persisted_log).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _persisted_log[key];
    }
  });
});