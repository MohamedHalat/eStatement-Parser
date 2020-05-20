"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _type_registry = require("./type_registry");

Object.keys(_type_registry).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _type_registry[key];
    }
  });
});

var _function_registry = require("./function_registry");

Object.keys(_function_registry).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _function_registry[key];
    }
  });
});

var _render_registry = require("./render_registry");

Object.keys(_render_registry).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _render_registry[key];
    }
  });
});