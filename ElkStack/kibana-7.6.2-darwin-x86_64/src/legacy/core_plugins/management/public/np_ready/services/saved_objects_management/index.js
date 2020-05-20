"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _saved_objects_management_action_registry = require("./saved_objects_management_action_registry");

Object.keys(_saved_objects_management_action_registry).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _saved_objects_management_action_registry[key];
    }
  });
});

var _saved_objects_management_action = require("./saved_objects_management_action");

Object.keys(_saved_objects_management_action).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _saved_objects_management_action[key];
    }
  });
});

var _saved_objects_management_service = require("./saved_objects_management_service");

Object.keys(_saved_objects_management_service).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _saved_objects_management_service[key];
    }
  });
});