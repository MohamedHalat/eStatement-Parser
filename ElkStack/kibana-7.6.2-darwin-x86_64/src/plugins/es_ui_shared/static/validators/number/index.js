"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _greater_than = require("./greater_than");

Object.keys(_greater_than).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _greater_than[key];
    }
  });
});

var _smaller_than = require("./smaller_than");

Object.keys(_smaller_than).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _smaller_than[key];
    }
  });
});