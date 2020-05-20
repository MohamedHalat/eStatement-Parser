"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EsSearchService = void 0;

var _es_search = require("../../../common/search/es_search");

var _es_search_strategy = require("./es_search_strategy");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EsSearchService =
/*#__PURE__*/
function () {
  function EsSearchService(initializerContext) {
    _classCallCheck(this, EsSearchService);

    this.initializerContext = initializerContext;
  }

  _createClass(EsSearchService, [{
    key: "setup",
    value: function setup(core, deps) {
      deps.search.registerSearchStrategyProvider(this.initializerContext.opaqueId, _es_search.ES_SEARCH_STRATEGY, _es_search_strategy.esSearchStrategyProvider);
    }
  }, {
    key: "start",
    value: function start() {}
  }, {
    key: "stop",
    value: function stop() {}
  }]);

  return EsSearchService;
}();

exports.EsSearchService = EsSearchService;