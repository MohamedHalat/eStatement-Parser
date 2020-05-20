"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inspector_panel = require("../../../../../plugins/inspector/public/ui/inspector_panel");

Object.keys(_inspector_panel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _inspector_panel[key];
    }
  });
});