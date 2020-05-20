"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index_pattern_management = require("./index_pattern_management");

Object.keys(_index_pattern_management).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _index_pattern_management[key];
    }
  });
});

var _saved_objects_management = require("./saved_objects_management");

Object.keys(_saved_objects_management).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _saved_objects_management[key];
    }
  });
});