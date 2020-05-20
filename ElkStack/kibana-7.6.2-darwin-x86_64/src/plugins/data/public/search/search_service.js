"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchService = void 0;

var _create_app_mount_context_search = require("./create_app_mount_context_search");

var _sync_search_strategy = require("./sync_search_strategy");

var _es_search = require("./es_search");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * The search plugin exposes two registration methods for other plugins:
 *  -  registerSearchStrategyProvider for plugins to add their own custom
 * search strategies
 *  -  registerSearchStrategyContext for plugins to expose information
 * and/or functionality for other search strategies to use
 *
 * It also comes with two search strategy implementations - SYNC_SEARCH_STRATEGY and ES_SEARCH_STRATEGY.
 */
var SearchService =
/*#__PURE__*/
function () {
  /**
   * A mapping of search strategies keyed by a unique identifier.  Plugins can use this unique identifier
   * to override certain strategy implementations.
   */

  /**
   * Exposes context to the search strategies.
   */
  function SearchService(initializerContext) {
    _classCallCheck(this, SearchService);

    this.initializerContext = initializerContext;

    _defineProperty(this, "searchStrategies", {});

    _defineProperty(this, "contextContainer", void 0);

    _defineProperty(this, "search", void 0);
  }

  _createClass(SearchService, [{
    key: "setup",
    value: function setup(core) {
      var _this = this;

      var search = this.search = (0, _create_app_mount_context_search.createAppMountSearchContext)(this.searchStrategies).search;
      core.application.registerMountContext('search', function () {
        return {
          search: search
        };
      });
      this.contextContainer = core.context.createContextContainer();

      var registerSearchStrategyProvider = function registerSearchStrategyProvider(plugin, name, strategyProvider) {
        _this.searchStrategies[name] = _this.contextContainer.createHandler(plugin, strategyProvider);
      };

      var api = {
        registerSearchStrategyContext: this.contextContainer.registerContext,
        registerSearchStrategyProvider: registerSearchStrategyProvider
      };
      api.registerSearchStrategyContext(this.initializerContext.opaqueId, 'core', function () {
        return core;
      });
      api.registerSearchStrategyProvider(this.initializerContext.opaqueId, _sync_search_strategy.SYNC_SEARCH_STRATEGY, _sync_search_strategy.syncSearchStrategyProvider); // ES search capabilities are written in a way that it could easily be a separate plugin,
      // however these two plugins are tightly coupled due to the default search strategy using
      // es search types.

      (0, _es_search.esSearchService)(this.initializerContext).setup(core, {
        search: api
      });
      return api;
    }
  }, {
    key: "start",
    value: function start(core) {
      if (!this.search) {
        throw new Error('Search should always be defined');
      }

      return {
        search: this.search
      };
    }
  }, {
    key: "stop",
    value: function stop() {}
  }]);

  return SearchService;
}();

exports.SearchService = SearchService;