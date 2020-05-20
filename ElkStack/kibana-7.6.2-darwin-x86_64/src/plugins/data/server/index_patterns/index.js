"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
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
Object.defineProperty(exports, "shouldReadFieldFromDocValues", {
  enumerable: true,
  get: function () {
    return _fetcher.shouldReadFieldFromDocValues;
  }
});
Object.defineProperty(exports, "IndexPatternsService", {
  enumerable: true,
  get: function () {
    return _index_patterns_service.IndexPatternsService;
  }
});
exports.indexPatterns = void 0;

var indexPatterns = _interopRequireWildcard(require("./utils"));

exports.indexPatterns = indexPatterns;

var _fetcher = require("./fetcher");

var _index_patterns_service = require("./index_patterns_service");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }