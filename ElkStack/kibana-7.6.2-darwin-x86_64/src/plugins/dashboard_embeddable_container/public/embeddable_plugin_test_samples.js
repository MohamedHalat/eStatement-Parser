"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _test_samples = require("../../../plugins/embeddable/public/lib/test_samples");

Object.keys(_test_samples).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _test_samples[key];
    }
  });
});