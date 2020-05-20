"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _remove_leading_slash = require("./remove_leading_slash");

Object.keys(_remove_leading_slash).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _remove_leading_slash[key];
    }
  });
});