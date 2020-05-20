"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractTimeFilter = extractTimeFilter;

var _lodash = require("lodash");

var _common = require("../../../../common");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function extractTimeFilter(timeFieldName, filters) {
  var _partition = (0, _lodash.partition)(filters, function (obj) {
    var key;

    if (_common.esFilters.isRangeFilter(obj)) {
      key = (0, _lodash.keys)(obj.range)[0];
    }

    return Boolean(key && key === timeFieldName);
  }),
      _partition2 = _slicedToArray(_partition, 2),
      timeRangeFilter = _partition2[0],
      restOfFilters = _partition2[1];

  return {
    restOfFilters: restOfFilters,
    timeRangeFilter: timeRangeFilter[0]
  };
}