"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exportAsCsv = exportAsCsv;

var _lodash = require("lodash");

var _filesaver = require("@elastic/filesaver");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var LINE_FEED_CHARACTER = '\r\n';
var nonAlphaNumRE = /[^a-zA-Z0-9]/;
var allDoubleQuoteRE = /"/g;

function escape(val, quoteValues) {
  if ((0, _lodash.isObject)(val)) {
    val = val.valueOf();
  }

  val = String(val);

  if (quoteValues && nonAlphaNumRE.test(val)) {
    val = "\"".concat(val.replace(allDoubleQuoteRE, '""'), "\"");
  }

  return val;
}

function buildCsv(columns, rows, csvSeparator, quoteValues, valueFormatter) {
  // Build the header row by its names
  var header = columns.map(function (col) {
    return escape(col.name, quoteValues);
  }); // Convert the array of row objects to an array of row arrays

  var orderedFieldNames = columns.map(function (col) {
    return col.field;
  });
  var csvRows = rows.map(function (row) {
    return orderedFieldNames.map(function (field) {
      return escape(valueFormatter ? valueFormatter(row[field]) : row[field], quoteValues);
    });
  });
  return [header].concat(_toConsumableArray(csvRows)).map(function (row) {
    return row.join(csvSeparator);
  }).join(LINE_FEED_CHARACTER) + LINE_FEED_CHARACTER; // Add \r\n after last line
}

function exportAsCsv(_ref) {
  var filename = _ref.filename,
      columns = _ref.columns,
      rows = _ref.rows,
      valueFormatter = _ref.valueFormatter,
      csvSeparator = _ref.csvSeparator,
      quoteValues = _ref.quoteValues;
  var type = 'text/plain;charset=utf-8';
  var csv = new Blob([buildCsv(columns, rows, csvSeparator, quoteValues, valueFormatter)], {
    type: type
  });
  (0, _filesaver.saveAs)(csv, filename);
}