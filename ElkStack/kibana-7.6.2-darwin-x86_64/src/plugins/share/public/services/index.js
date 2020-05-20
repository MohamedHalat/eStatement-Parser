"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _share_menu_registry = require("./share_menu_registry");

Object.keys(_share_menu_registry).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _share_menu_registry[key];
    }
  });
});

var _share_menu_manager = require("./share_menu_manager");

Object.keys(_share_menu_manager).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _share_menu_manager[key];
    }
  });
});