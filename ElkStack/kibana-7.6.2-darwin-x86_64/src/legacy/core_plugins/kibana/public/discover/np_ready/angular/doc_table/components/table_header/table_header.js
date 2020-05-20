"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TableHeader = TableHeader;

var _react = _interopRequireDefault(require("react"));

var _table_header_column = require("./table_header_column");

var _helpers = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function TableHeader(_ref) {
  var columns = _ref.columns,
      hideTimeColumn = _ref.hideTimeColumn,
      indexPattern = _ref.indexPattern,
      isShortDots = _ref.isShortDots,
      onChangeSortOrder = _ref.onChangeSortOrder,
      onMoveColumn = _ref.onMoveColumn,
      onRemoveColumn = _ref.onRemoveColumn,
      sortOrder = _ref.sortOrder;
  var displayedColumns = (0, _helpers.getDisplayedColumns)(columns, indexPattern, hideTimeColumn, isShortDots);
  return _react.default.createElement("tr", {
    "data-test-subj": "docTableHeader",
    className: "kbnDocTableHeader"
  }, _react.default.createElement("th", {
    style: {
      width: '24px'
    }
  }), displayedColumns.map(function (col) {
    return _react.default.createElement(_table_header_column.TableHeaderColumn, _extends({
      key: col.name
    }, col, {
      sortOrder: sortOrder,
      onMoveColumn: onMoveColumn,
      onRemoveColumn: onRemoveColumn,
      onChangeSortOrder: onChangeSortOrder
    }));
  }));
}