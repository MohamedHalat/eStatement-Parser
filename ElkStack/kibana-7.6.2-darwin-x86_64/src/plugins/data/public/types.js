"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  IGetSuggestions: true
};
Object.defineProperty(exports, "IGetSuggestions", {
  enumerable: true,
  get: function get() {
    return _types.IGetSuggestions;
  }
});

var _types = require("./suggestions_provider/types");

var _types2 = require("./autocomplete_provider/types");

Object.keys(_types2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _types2[key];
    }
  });
});