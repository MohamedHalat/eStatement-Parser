"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchService = void 0;

var _routes = require("./routes");

var _create_api = require("./create_api");

var _es_search = require("./es_search");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class SearchService {
  constructor(initializerContext) {
    this.initializerContext = initializerContext;

    _defineProperty(this, "searchStrategies", {});

    _defineProperty(this, "contextContainer", void 0);
  }

  setup(core) {
    const router = core.http.createRouter();
    (0, _routes.registerSearchRoute)(router);
    this.contextContainer = core.context.createContextContainer();
    core.http.registerRouteHandlerContext('search', context => {
      return (0, _create_api.createApi)({
        caller: context.core.elasticsearch.dataClient.callAsCurrentUser,
        searchStrategies: this.searchStrategies
      });
    });

    const registerSearchStrategyProvider = (plugin, name, strategyProvider) => {
      this.searchStrategies[name] = this.contextContainer.createHandler(plugin, strategyProvider);
    };

    const api = {
      registerSearchStrategyContext: this.contextContainer.registerContext,
      registerSearchStrategyProvider,
      __LEGACY: {
        search: (caller, request, strategyName) => {
          const searchAPI = (0, _create_api.createApi)({
            caller,
            searchStrategies: this.searchStrategies
          });
          return searchAPI.search(request, {}, strategyName);
        }
      }
    };
    api.registerSearchStrategyContext(this.initializerContext.opaqueId, 'core', () => core);
    api.registerSearchStrategyContext(this.initializerContext.opaqueId, 'config$', () => this.initializerContext.config.legacy.globalConfig$); // ES search capabilities are written in a way that it could easily be a separate plugin,
    // however these two plugins are tightly coupled due to the default search strategy using
    // es search types.

    (0, _es_search.esSearchService)(this.initializerContext).setup(core, {
      search: api
    });
    return api;
  }

  start() {}

  stop() {}

}

exports.SearchService = SearchService;