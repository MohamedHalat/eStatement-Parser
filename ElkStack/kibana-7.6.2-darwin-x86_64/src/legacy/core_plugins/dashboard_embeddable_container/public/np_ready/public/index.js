"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _public = require("../../../../../../plugins/dashboard_embeddable_container/public");

Object.keys(_public).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _public[key];
    }
  });
});