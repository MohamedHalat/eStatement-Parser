"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react_mount = require("./react_mount");

Object.keys(_react_mount).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _react_mount[key];
    }
  });
});