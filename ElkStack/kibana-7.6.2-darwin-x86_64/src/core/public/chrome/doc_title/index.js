"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _doc_title_service = require("./doc_title_service");

Object.keys(_doc_title_service).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _doc_title_service[key];
    }
  });
});