"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSortForSearchSource = getSortForSearchSource;

var _get_sort = require("./get_sort");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * prepares sort for search source, that's sending the request to ES
 * handles the special case when there's sorting by date_nanos typed fields
 * the addon of the numeric_type guarantees the right sort order
 * when there are indices with date and indices with date_nanos field
 */
function getSortForSearchSource(sort, indexPattern) {
  if (!sort || !indexPattern) {
    return [];
  }

  var timeFieldName = indexPattern.timeFieldName;
  return (0, _get_sort.getSort)(sort, indexPattern).map(function (sortPair) {
    if (indexPattern.isTimeNanosBased() && timeFieldName && sortPair[timeFieldName]) {
      return _defineProperty({}, timeFieldName, {
        order: sortPair[timeFieldName],
        numeric_type: 'date_nanos'
      });
    }

    return sortPair;
  });
}