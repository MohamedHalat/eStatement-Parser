"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterStateManager = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _public = require("../../../../../../plugins/data/public");

var _compare_filters = require("../../../../../../plugins/data/public/query/filter_manager/lib/compare_filters");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * FilterStateManager is responsible for watching for filter changes
 * and syncing with FilterManager, as well as syncing FilterManager changes
 * back to the URL.
 **/
var FilterStateManager =
/*#__PURE__*/
function () {
  function FilterStateManager(globalState, getAppState, filterManager) {
    var _this = this;

    _classCallCheck(this, FilterStateManager);

    _defineProperty(this, "filterManager", void 0);

    _defineProperty(this, "globalState", void 0);

    _defineProperty(this, "getAppState", void 0);

    _defineProperty(this, "interval", void 0);

    this.getAppState = getAppState;
    this.globalState = globalState;
    this.filterManager = filterManager;
    this.watchFilterState();
    this.filterManager.getUpdates$().subscribe(function () {
      _this.updateAppState();
    });
  }

  _createClass(FilterStateManager, [{
    key: "destroy",
    value: function destroy() {
      if (this.interval) {
        clearInterval(this.interval);
      }
    }
  }, {
    key: "watchFilterState",
    value: function watchFilterState() {
      var _this2 = this;

      // This is a temporary solution to remove rootscope.
      // Moving forward, state should provide observable subscriptions.
      this.interval = setInterval(function () {
        var appState = _this2.getAppState();

        var stateUndefined = !appState || !_this2.globalState;
        if (stateUndefined) return;
        var globalFilters = _this2.globalState.filters || [];
        var appFilters = appState && appState.filters || [];
        var globalFilterChanged = !(0, _compare_filters.compareFilters)(_this2.filterManager.getGlobalFilters(), globalFilters, _compare_filters.COMPARE_ALL_OPTIONS);
        var appFilterChanged = !(0, _compare_filters.compareFilters)(_this2.filterManager.getAppFilters(), appFilters, _compare_filters.COMPARE_ALL_OPTIONS);
        var filterStateChanged = globalFilterChanged || appFilterChanged;
        if (!filterStateChanged) return;

        var newGlobalFilters = _lodash.default.cloneDeep(globalFilters);

        var newAppFilters = _lodash.default.cloneDeep(appFilters);

        _public.FilterManager.setFiltersStore(newAppFilters, _public.esFilters.FilterStateStore.APP_STATE);

        _public.FilterManager.setFiltersStore(newGlobalFilters, _public.esFilters.FilterStateStore.GLOBAL_STATE);

        _this2.filterManager.setFilters(newGlobalFilters.concat(newAppFilters));
      }, 10);
    }
  }, {
    key: "saveState",
    value: function saveState() {
      var appState = this.getAppState();
      if (appState) appState.save();
      this.globalState.save();
    }
  }, {
    key: "updateAppState",
    value: function updateAppState() {
      // Update Angular state before saving State objects (which save it to URL)
      var partitionedFilters = this.filterManager.getPartitionedFilters();
      var appState = this.getAppState();

      if (appState) {
        appState.filters = partitionedFilters.appFilters;
      }

      this.globalState.filters = partitionedFilters.globalFilters;
      this.saveState();
    }
  }]);

  return FilterStateManager;
}();

exports.FilterStateManager = FilterStateManager;