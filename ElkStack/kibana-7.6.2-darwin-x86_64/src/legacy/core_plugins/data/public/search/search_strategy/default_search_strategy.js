"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultSearchStrategy = void 0;

var _is_default_type_index_pattern = require("./is_default_type_index_pattern");

var _get_search_params = require("../fetch/get_search_params");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultSearchStrategy = {
  id: 'default',
  search: function search(params) {
    return params.config.get('courier:batchSearches') ? msearch(params) : _search(params);
  },
  isViable: function isViable(indexPattern) {
    return indexPattern && (0, _is_default_type_index_pattern.isDefaultTypeIndexPattern)(indexPattern);
  }
};
exports.defaultSearchStrategy = defaultSearchStrategy;

function msearch(_ref) {
  var searchRequests = _ref.searchRequests,
      es = _ref.es,
      config = _ref.config,
      esShardTimeout = _ref.esShardTimeout;
  var inlineRequests = searchRequests.map(function (_ref2) {
    var index = _ref2.index,
        body = _ref2.body,
        searchType = _ref2.search_type;
    var inlineHeader = {
      index: index.title || index,
      search_type: searchType,
      ignore_unavailable: true,
      preference: (0, _get_search_params.getPreference)(config)
    };

    var inlineBody = _objectSpread({}, body, {
      timeout: (0, _get_search_params.getTimeout)(esShardTimeout)
    });

    return "".concat(JSON.stringify(inlineHeader), "\n").concat(JSON.stringify(inlineBody));
  });
  var searching = es.msearch(_objectSpread({}, (0, _get_search_params.getMSearchParams)(config), {
    body: "".concat(inlineRequests.join('\n'), "\n")
  }));
  return {
    searching: searching.then(function (_ref3) {
      var responses = _ref3.responses;
      return responses;
    }),
    abort: searching.abort
  };
}

function _search(_ref4) {
  var searchRequests = _ref4.searchRequests,
      es = _ref4.es,
      config = _ref4.config,
      esShardTimeout = _ref4.esShardTimeout;
  var abortController = new AbortController();
  var searchParams = (0, _get_search_params.getSearchParams)(config, esShardTimeout);
  var promises = searchRequests.map(function (_ref5) {
    var index = _ref5.index,
        body = _ref5.body;
    var searching = es.search(_objectSpread({
      index: index.title || index,
      body: body
    }, searchParams));
    abortController.signal.addEventListener('abort', searching.abort);
    return searching.catch(function (_ref6) {
      var response = _ref6.response;
      return JSON.parse(response);
    });
  });
  return {
    searching: Promise.all(promises),
    abort: function abort() {
      return abortController.abort();
    }
  };
}