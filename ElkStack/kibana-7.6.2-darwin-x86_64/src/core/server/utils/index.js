"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _from_root = require("./from_root");

Object.keys(_from_root).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _from_root[key];
    }
  });
});

var _package_json = require("./package_json");

Object.keys(_package_json).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _package_json[key];
    }
  });
});