"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "addSearchStrategy", {
  enumerable: true,
  get: function get() {
    return _search_strategy_registry.addSearchStrategy;
  }
});
Object.defineProperty(exports, "hasSearchStategyForIndexPattern", {
  enumerable: true,
  get: function get() {
    return _search_strategy_registry.hasSearchStategyForIndexPattern;
  }
});
Object.defineProperty(exports, "getSearchStrategyById", {
  enumerable: true,
  get: function get() {
    return _search_strategy_registry.getSearchStrategyById;
  }
});
Object.defineProperty(exports, "getSearchStrategyForSearchRequest", {
  enumerable: true,
  get: function get() {
    return _search_strategy_registry.getSearchStrategyForSearchRequest;
  }
});
Object.defineProperty(exports, "defaultSearchStrategy", {
  enumerable: true,
  get: function get() {
    return _default_search_strategy.defaultSearchStrategy;
  }
});
Object.defineProperty(exports, "isDefaultTypeIndexPattern", {
  enumerable: true,
  get: function get() {
    return _is_default_type_index_pattern.isDefaultTypeIndexPattern;
  }
});
Object.defineProperty(exports, "SearchError", {
  enumerable: true,
  get: function get() {
    return _search_error.SearchError;
  }
});
Object.defineProperty(exports, "getSearchErrorType", {
  enumerable: true,
  get: function get() {
    return _search_error.getSearchErrorType;
  }
});

var _search_strategy_registry = require("./search_strategy_registry");

var _default_search_strategy = require("./default_search_strategy");

var _is_default_type_index_pattern = require("./is_default_type_index_pattern");

var _search_error = require("./search_error");