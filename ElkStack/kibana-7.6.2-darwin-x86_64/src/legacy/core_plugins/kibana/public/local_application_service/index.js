"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _local_application_service = require("./local_application_service");

Object.keys(_local_application_service).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _local_application_service[key];
    }
  });
});