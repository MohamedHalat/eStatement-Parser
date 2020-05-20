"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.esSearchStrategyProvider = void 0;

var _search2 = require("../../../common/search");

var _sync_search_strategy = require("../sync_search_strategy");

var _get_es_preference = require("./get_es_preference");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var esSearchStrategyProvider = function esSearchStrategyProvider(context, _search) {
  return {
    search: function search(request, options) {
      if (typeof request.params.preference === 'undefined') {
        var setPreference = context.core.uiSettings.get('courier:setRequestPreference');
        var customPreference = context.core.uiSettings.get('courier:customRequestPreference');
        request.params.preference = (0, _get_es_preference.getEsPreference)(setPreference, customPreference);
      }

      return _search(_objectSpread({}, request, {
        serverStrategy: _search2.ES_SEARCH_STRATEGY
      }), options, _sync_search_strategy.SYNC_SEARCH_STRATEGY);
    }
  };
};

exports.esSearchStrategyProvider = esSearchStrategyProvider;