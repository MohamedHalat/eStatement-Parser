"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _use_ui_setting = require("./use_ui_setting");

Object.keys(_use_ui_setting).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _use_ui_setting[key];
    }
  });
});