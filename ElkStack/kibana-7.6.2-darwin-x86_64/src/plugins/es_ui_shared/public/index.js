"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  useUIAceKeyboardMode: true
};
Object.defineProperty(exports, "useUIAceKeyboardMode", {
  enumerable: true,
  get: function get() {
    return _use_ui_ace_keyboard_mode.useUIAceKeyboardMode;
  }
});

var _json_editor = require("./components/json_editor");

Object.keys(_json_editor).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _json_editor[key];
    }
  });
});

var _use_ui_ace_keyboard_mode = require("./use_ui_ace_keyboard_mode");