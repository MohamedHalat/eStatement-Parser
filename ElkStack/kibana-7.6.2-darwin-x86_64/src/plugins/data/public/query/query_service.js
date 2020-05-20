"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QueryService = void 0;

var _filter_manager = require("./filter_manager");

var _timefilter = require("./timefilter");

var _saved_query_service = require("./saved_query/saved_query_service");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var QueryService =
/*#__PURE__*/
function () {
  function QueryService() {
    _classCallCheck(this, QueryService);

    _defineProperty(this, "filterManager", void 0);

    _defineProperty(this, "timefilter", void 0);
  }

  _createClass(QueryService, [{
    key: "setup",
    value: function setup(_ref) {
      var uiSettings = _ref.uiSettings,
          storage = _ref.storage;
      this.filterManager = new _filter_manager.FilterManager(uiSettings);
      var timefilterService = new _timefilter.TimefilterService();
      this.timefilter = timefilterService.setup({
        uiSettings: uiSettings,
        storage: storage
      });
      return {
        filterManager: this.filterManager,
        timefilter: this.timefilter
      };
    }
  }, {
    key: "start",
    value: function start(savedObjects) {
      return {
        filterManager: this.filterManager,
        timefilter: this.timefilter,
        savedQueries: (0, _saved_query_service.createSavedQueryService)(savedObjects.client)
      };
    }
  }, {
    key: "stop",
    value: function stop() {// nothing to do here yet
    }
  }]);

  return QueryService;
}();
/** @public */


exports.QueryService = QueryService;