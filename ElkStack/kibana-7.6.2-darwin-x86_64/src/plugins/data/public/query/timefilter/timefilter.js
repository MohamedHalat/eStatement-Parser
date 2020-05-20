"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Timefilter = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _rxjs = require("rxjs");

var _moment = _interopRequireDefault(require("moment"));

var _diff_time_picker_vals = require("./lib/diff_time_picker_vals");

var _parse_querystring = require("./lib/parse_querystring");

var _get_time = require("./get_time");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// TODO: remove!
var Timefilter =
/*#__PURE__*/
function () {
  // Fired when isTimeRangeSelectorEnabled \ isAutoRefreshSelectorEnabled are toggled
  // Fired when a user changes the timerange
  // Fired when a user changes the the autorefresh settings
  // Used when an auto refresh is triggered
  function Timefilter(config, timeHistory) {
    var _this = this;

    _classCallCheck(this, Timefilter);

    _defineProperty(this, "enabledUpdated$", new _rxjs.BehaviorSubject(false));

    _defineProperty(this, "timeUpdate$", new _rxjs.Subject());

    _defineProperty(this, "refreshIntervalUpdate$", new _rxjs.Subject());

    _defineProperty(this, "autoRefreshFetch$", new _rxjs.Subject());

    _defineProperty(this, "fetch$", new _rxjs.Subject());

    _defineProperty(this, "_time", void 0);

    _defineProperty(this, "_refreshInterval", void 0);

    _defineProperty(this, "_history", void 0);

    _defineProperty(this, "_isTimeRangeSelectorEnabled", false);

    _defineProperty(this, "_isAutoRefreshSelectorEnabled", false);

    _defineProperty(this, "_autoRefreshIntervalId", 0);

    _defineProperty(this, "getEnabledUpdated$", function () {
      return _this.enabledUpdated$.asObservable();
    });

    _defineProperty(this, "getTimeUpdate$", function () {
      return _this.timeUpdate$.asObservable();
    });

    _defineProperty(this, "getRefreshIntervalUpdate$", function () {
      return _this.refreshIntervalUpdate$.asObservable();
    });

    _defineProperty(this, "getAutoRefreshFetch$", function () {
      return _this.autoRefreshFetch$.asObservable();
    });

    _defineProperty(this, "getFetch$", function () {
      return _this.fetch$.asObservable();
    });

    _defineProperty(this, "getTime", function () {
      var _this$_time = _this._time,
          from = _this$_time.from,
          to = _this$_time.to;
      return _objectSpread({}, _this._time, {
        from: _moment.default.isMoment(from) ? from.toISOString() : from,
        to: _moment.default.isMoment(to) ? to.toISOString() : to
      });
    });

    _defineProperty(this, "setTime", function (time) {
      // Object.assign used for partially composed updates
      var newTime = Object.assign(_this.getTime(), time);

      if ((0, _diff_time_picker_vals.areTimeRangesDifferent)(_this.getTime(), newTime)) {
        _this._time = {
          from: newTime.from,
          to: newTime.to
        };

        _this._history.add(_this._time);

        _this.timeUpdate$.next();

        _this.fetch$.next();
      }
    });

    _defineProperty(this, "getRefreshInterval", function () {
      return _lodash.default.clone(_this._refreshInterval);
    });

    _defineProperty(this, "setRefreshInterval", function (refreshInterval) {
      var prevRefreshInterval = _this.getRefreshInterval();

      var newRefreshInterval = _objectSpread({}, prevRefreshInterval, {}, refreshInterval); // If the refresh interval is <= 0 handle that as a paused refresh


      if (newRefreshInterval.value <= 0) {
        newRefreshInterval.value = 0;
        newRefreshInterval.pause = true;
      }

      _this._refreshInterval = {
        value: newRefreshInterval.value,
        pause: newRefreshInterval.pause
      }; // Only send out an event if we already had a previous refresh interval (not for the initial set)
      // and the old and new refresh interval are actually different.

      if (prevRefreshInterval && (0, _diff_time_picker_vals.areRefreshIntervalsDifferent)(prevRefreshInterval, newRefreshInterval)) {
        _this.refreshIntervalUpdate$.next();

        if (!newRefreshInterval.pause && newRefreshInterval.value !== 0) {
          _this.fetch$.next();
        }
      } // Clear the previous auto refresh interval and start a new one (if not paused)


      clearInterval(_this._autoRefreshIntervalId);

      if (!newRefreshInterval.pause) {
        _this._autoRefreshIntervalId = window.setInterval(function () {
          return _this.autoRefreshFetch$.next();
        }, newRefreshInterval.value);
      }
    });

    _defineProperty(this, "createFilter", function (indexPattern, timeRange) {
      return (0, _get_time.getTime)(indexPattern, timeRange ? timeRange : _this._time, _this.getForceNow());
    });

    _defineProperty(this, "enableTimeRangeSelector", function () {
      _this._isTimeRangeSelectorEnabled = true;

      _this.enabledUpdated$.next(true);
    });

    _defineProperty(this, "disableTimeRangeSelector", function () {
      _this._isTimeRangeSelectorEnabled = false;

      _this.enabledUpdated$.next(false);
    });

    _defineProperty(this, "enableAutoRefreshSelector", function () {
      _this._isAutoRefreshSelectorEnabled = true;

      _this.enabledUpdated$.next(true);
    });

    _defineProperty(this, "disableAutoRefreshSelector", function () {
      _this._isAutoRefreshSelectorEnabled = false;

      _this.enabledUpdated$.next(false);
    });

    _defineProperty(this, "getForceNow", function () {
      var forceNow = (0, _parse_querystring.parseQueryString)().forceNow;

      if (!forceNow) {
        return;
      }

      var ticks = Date.parse(forceNow);

      if (isNaN(ticks)) {
        throw new Error("forceNow query parameter, ".concat(forceNow, ", can't be parsed by Date.parse"));
      }

      return new Date(ticks);
    });

    this._history = timeHistory;
    this._time = config.timeDefaults;
    this.setRefreshInterval(config.refreshIntervalDefaults);
  }

  _createClass(Timefilter, [{
    key: "isTimeRangeSelectorEnabled",
    value: function isTimeRangeSelectorEnabled() {
      return this._isTimeRangeSelectorEnabled;
    }
  }, {
    key: "isAutoRefreshSelectorEnabled",
    value: function isAutoRefreshSelectorEnabled() {
      return this._isAutoRefreshSelectorEnabled;
    }
  }, {
    key: "getBounds",
    value: function getBounds() {
      return this.calculateBounds(this._time);
    }
  }, {
    key: "calculateBounds",
    value: function calculateBounds(timeRange) {
      return (0, _get_time.calculateBounds)(timeRange, {
        forceNow: this.getForceNow()
      });
    }
  }, {
    key: "getActiveBounds",
    value: function getActiveBounds() {
      if (this.isTimeRangeSelectorEnabled()) {
        return this.getBounds();
      }
    }
    /**
     * Show the time bounds selector part of the time filter
     */

  }]);

  return Timefilter;
}();

exports.Timefilter = Timefilter;