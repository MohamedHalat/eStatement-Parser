"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inspector_view_chooser = require("../../../../../plugins/inspector/public/ui/inspector_view_chooser");

Object.keys(_inspector_view_chooser).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _inspector_view_chooser[key];
    }
  });
});