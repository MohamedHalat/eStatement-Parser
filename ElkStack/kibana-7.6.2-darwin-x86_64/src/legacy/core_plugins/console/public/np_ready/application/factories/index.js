"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _token_iterator = require("./token_iterator");

Object.keys(_token_iterator).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _token_iterator[key];
    }
  });
});