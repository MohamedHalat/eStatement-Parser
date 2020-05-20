"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSearchBar = createSearchBar;

var _react = _interopRequireWildcard(require("react"));

var _rxjs = require("rxjs");

var _public = require("../../../../kibana_react/public");

var _search_bar = require("./search_bar");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var defaultFiltersUpdated = function defaultFiltersUpdated(query) {
  return function (filters) {
    query.filterManager.setFilters(filters);
  };
};

var defaultOnRefreshChange = function defaultOnRefreshChange(query) {
  var timefilter = query.timefilter.timefilter;
  return function (options) {
    timefilter.setRefreshInterval({
      value: options.refreshInterval,
      pause: options.isPaused
    });
  };
};

function createSearchBar(_ref) {
  var core = _ref.core,
      storage = _ref.storage,
      data = _ref.data;
  // App name should come from the core application service.
  // Until it's available, we'll ask the user to provide it for the pre-wired component.
  return function (props) {
    var _data$query = data.query,
        filterManager = _data$query.filterManager,
        timefilter = _data$query.timefilter;
    var tfRefreshInterval = timefilter.timefilter.getRefreshInterval();
    var fmFilters = filterManager.getFilters();

    var _useState = (0, _react.useState)(tfRefreshInterval.value),
        _useState2 = _slicedToArray(_useState, 2),
        refreshInterval = _useState2[0],
        setRefreshInterval = _useState2[1];

    var _useState3 = (0, _react.useState)(tfRefreshInterval.pause),
        _useState4 = _slicedToArray(_useState3, 2),
        refreshPaused = _useState4[0],
        setRefreshPaused = _useState4[1];

    var _useState5 = (0, _react.useState)(fmFilters),
        _useState6 = _slicedToArray(_useState5, 2),
        filters = _useState6[0],
        setFilters = _useState6[1]; // We do not really need to keep track of the time
    // since this is just for initialization


    var timeRange = timefilter.timefilter.getTime();
    (0, _react.useEffect)(function () {
      var isSubscribed = true;
      var subscriptions = new _rxjs.Subscription();
      subscriptions.add(timefilter.timefilter.getRefreshIntervalUpdate$().subscribe({
        next: function next() {
          if (isSubscribed) {
            var newRefreshInterval = timefilter.timefilter.getRefreshInterval();
            setRefreshInterval(newRefreshInterval.value);
            setRefreshPaused(newRefreshInterval.pause);
          }
        }
      }));
      subscriptions.add(filterManager.getUpdates$().subscribe({
        next: function next() {
          if (isSubscribed) {
            var newFilters = filterManager.getFilters();
            setFilters(newFilters);
          }
        }
      }));
      return function () {
        isSubscribed = false;
        subscriptions.unsubscribe();
      };
    }, [filterManager, timefilter.timefilter]);
    return _react.default.createElement(_public.KibanaContextProvider, {
      services: _objectSpread({
        appName: props.appName,
        data: data,
        storage: storage
      }, core)
    }, _react.default.createElement(_search_bar.SearchBar, _extends({
      timeHistory: timefilter.history,
      dateRangeFrom: timeRange.from,
      dateRangeTo: timeRange.to,
      refreshInterval: refreshInterval,
      isRefreshPaused: refreshPaused,
      filters: filters,
      onFiltersUpdated: defaultFiltersUpdated(data.query),
      onRefreshChange: defaultOnRefreshChange(data.query)
    }, props)));
  };
}