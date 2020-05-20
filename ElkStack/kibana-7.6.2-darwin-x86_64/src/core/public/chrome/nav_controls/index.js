"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nav_controls_service = require("./nav_controls_service");

Object.keys(_nav_controls_service).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _nav_controls_service[key];
    }
  });
});