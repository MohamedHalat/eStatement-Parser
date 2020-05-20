"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _saved_searches = require("./saved_searches");

Object.keys(_saved_searches).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _saved_searches[key];
    }
  });
});

require("./saved_searches_register");