"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "indexPatternsMixin", {
  enumerable: true,
  get: function () {
    return _mixin.indexPatternsMixin;
  }
});
Object.defineProperty(exports, "IndexPatternsServiceFactory", {
  enumerable: true,
  get: function () {
    return _mixin.IndexPatternsServiceFactory;
  }
});
Object.defineProperty(exports, "IndexPatternsFetcher", {
  enumerable: true,
  get: function () {
    return _fetcher.IndexPatternsFetcher;
  }
});
Object.defineProperty(exports, "FieldDescriptor", {
  enumerable: true,
  get: function () {
    return _fetcher.FieldDescriptor;
  }
});

var _mixin = require("./mixin");

var _fetcher = require("../../../plugins/data/server/index_patterns/fetcher");