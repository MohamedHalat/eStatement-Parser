"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterUtils = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @typedef {Object} QueryFilter
 * @property query_string {Object}
 * @property query_string.query {String}
 */
var FilterUtils =
/*#__PURE__*/
function () {
  function FilterUtils() {
    _classCallCheck(this, FilterUtils);
  }

  _createClass(FilterUtils, null, [{
    key: "convertTimeToUTCString",

    /**
     * Converts the time to a utc formatted string. If the time is not valid (e.g. it might be in a relative format like
     * 'now-15m', then it just returns what it was passed).
     * @param time {string|Moment}
     * @returns the time represented in utc format, or if the time range was not able to be parsed into a moment
     * object, it returns the same object it was given.
     */
    value: function convertTimeToUTCString(time) {
      if ((0, _moment.default)(time).isValid()) {
        return (0, _moment.default)(time).utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
      } else {
        // If it's not a valid moment date, then it should be a string representing a relative time
        // like 'now' or 'now-15m'.
        return time;
      }
    }
    /**
     * Compares the two times, making sure they are in both compared in string format. Absolute times
     * are sometimes stored as moment objects, but converted to strings when reloaded. Relative times are
     * strings that are not convertible to moment objects.
     * @param timeA {string|Moment}
     * @param timeB {string|Moment}
     * @returns {boolean}
     */

  }, {
    key: "areTimesEqual",
    value: function areTimesEqual(timeA, timeB) {
      return this.convertTimeToUTCString(timeA) === this.convertTimeToUTCString(timeB);
    }
    /**
     * Depending on how a dashboard is loaded, the filter object may contain a $$hashKey and $state that will throw
     * off a filter comparison. This removes those variables.
     * @param filters {Array.<Object>}
     * @returns {Array.<Object>}
     */

  }, {
    key: "cleanFiltersForComparison",
    value: function cleanFiltersForComparison(filters) {
      return _lodash.default.map(filters, function (filter) {
        var f = _lodash.default.omit(filter, ['$$hashKey', '$state']);

        if (f.meta) {
          // f.meta.value is the value displayed in the filter bar.
          // It may also be loaded differently and shouldn't be used in this comparison.
          return _lodash.default.omit(f.meta, ['value']);
        }

        return f;
      });
    }
  }]);

  return FilterUtils;
}();

exports.FilterUtils = FilterUtils;