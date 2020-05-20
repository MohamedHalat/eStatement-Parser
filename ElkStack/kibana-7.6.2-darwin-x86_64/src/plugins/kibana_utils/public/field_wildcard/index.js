"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _field_wildcard = require("./field_wildcard");

Object.keys(_field_wildcard).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _field_wildcard[key];
    }
  });
});