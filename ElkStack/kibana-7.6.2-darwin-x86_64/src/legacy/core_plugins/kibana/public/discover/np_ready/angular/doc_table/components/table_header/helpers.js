"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTimeColumn = getTimeColumn;
exports.getDisplayedColumns = getDisplayedColumns;

var _shorten_dotted_string = require("../../../../../../../common/utils/shorten_dotted_string");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Returns properties necessary to display the time column
 * If it's an IndexPattern with timefield, the time column is
 * prepended, not moveable and removeable
 * @param timeFieldName
 */
function getTimeColumn(timeFieldName) {
  return {
    name: timeFieldName,
    displayName: 'Time',
    isSortable: true,
    isRemoveable: false,
    colLeftIdx: -1,
    colRightIdx: -1
  };
}
/**
 * A given array of column names returns an array of properties
 * necessary to display the columns. If the given indexPattern
 * has a timefield, a time column is prepended
 * @param columns
 * @param indexPattern
 * @param hideTimeField
 * @param isShortDots
 */


function getDisplayedColumns(columns, indexPattern, hideTimeField, isShortDots) {
  if (!Array.isArray(columns) || _typeof(indexPattern) !== 'object' || !indexPattern.getFieldByName) {
    return [];
  }

  var columnProps = columns.map(function (column, idx) {
    var field = indexPattern.getFieldByName(column);
    return {
      name: column,
      displayName: isShortDots ? (0, _shorten_dotted_string.shortenDottedString)(column) : column,
      isSortable: field && field.sortable ? true : false,
      isRemoveable: column !== '_source' || columns.length > 1,
      colLeftIdx: idx - 1 < 0 ? -1 : idx - 1,
      colRightIdx: idx + 1 >= columns.length ? -1 : idx + 1
    };
  });
  return !hideTimeField && indexPattern.timeFieldName ? [getTimeColumn(indexPattern.timeFieldName)].concat(_toConsumableArray(columnProps)) : columnProps;
}