"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchService = void 0;

var _search_source = require("./search_source");

var _search_strategy = require("./search_strategy");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The contract provided here is a new platform shim for ui/courier.
 *
 * Once it has been refactored to work with new platform services,
 * it will move into the existing search service in src/plugins/data/public/search
 */
var SearchService =
/*#__PURE__*/
function () {
  function SearchService() {
    _classCallCheck(this, SearchService);
  }

  _createClass(SearchService, [{
    key: "setup",
    value: function setup(core) {
      return {};
    }
  }, {
    key: "start",
    value: function start(core) {
      return {
        defaultSearchStrategy: _search_strategy.defaultSearchStrategy,
        SearchSource: _search_source.SearchSource
      };
    }
  }, {
    key: "stop",
    value: function stop() {}
  }]);

  return SearchService;
}();

exports.SearchService = SearchService;