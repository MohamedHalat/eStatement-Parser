"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("brace");

require("brace/ext/language_tools");

require("brace/ext/searchbox");

require("brace/mode/json");

require("brace/mode/text");

var _legacy_core_editor = require("./legacy_core_editor");

Object.keys(_legacy_core_editor).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _legacy_core_editor[key];
    }
  });
});

var _create_readonly = require("./create_readonly");

Object.keys(_create_readonly).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _create_readonly[key];
    }
  });
});

var _create = require("./create");

Object.keys(_create).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _create[key];
    }
  });
});