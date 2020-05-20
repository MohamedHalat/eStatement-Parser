"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fetch_soon = require("./fetch_soon");

Object.keys(_fetch_soon).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _fetch_soon[key];
    }
  });
});

var _get_search_params = require("./get_search_params");

Object.keys(_get_search_params).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _get_search_params[key];
    }
  });
});