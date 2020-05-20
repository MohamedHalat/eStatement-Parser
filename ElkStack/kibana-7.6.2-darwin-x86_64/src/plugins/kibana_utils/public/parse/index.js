"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ipv4_address = require("./ipv4_address");

Object.keys(_ipv4_address).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ipv4_address[key];
    }
  });
});