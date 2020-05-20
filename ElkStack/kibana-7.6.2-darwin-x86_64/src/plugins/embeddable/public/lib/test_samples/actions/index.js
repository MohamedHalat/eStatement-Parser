"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _edit_mode_action = require("./edit_mode_action");

Object.keys(_edit_mode_action).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _edit_mode_action[key];
    }
  });
});

var _say_hello_action = require("./say_hello_action");

Object.keys(_say_hello_action).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _say_hello_action[key];
    }
  });
});

var _send_message_action = require("./send_message_action");

Object.keys(_send_message_action).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _send_message_action[key];
    }
  });
});