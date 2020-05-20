"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TableHeaderColumn = TableHeaderColumn;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var sortDirectionToIcon = {
  desc: 'fa fa-sort-down',
  asc: 'fa fa-sort-up',
  '': 'fa fa-sort'
};

function TableHeaderColumn(_ref) {
  var colLeftIdx = _ref.colLeftIdx,
      colRightIdx = _ref.colRightIdx,
      displayName = _ref.displayName,
      isRemoveable = _ref.isRemoveable,
      isSortable = _ref.isSortable,
      name = _ref.name,
      onChangeSortOrder = _ref.onChangeSortOrder,
      onMoveColumn = _ref.onMoveColumn,
      onRemoveColumn = _ref.onRemoveColumn,
      sortOrder = _ref.sortOrder;

  var _ref2 = sortOrder.find(function (sortPair) {
    return name === sortPair[0];
  }) || [],
      _ref3 = _slicedToArray(_ref2, 2),
      _ref3$ = _ref3[1],
      sortDirection = _ref3$ === void 0 ? '' : _ref3$;

  var currentSortWithoutColumn = sortOrder.filter(function (pair) {
    return pair[0] !== name;
  });
  var currentColumnSort = sortOrder.find(function (pair) {
    return pair[0] === name;
  });
  var currentColumnSortDirection = currentColumnSort && currentColumnSort[1] || '';
  var btnSortIcon = sortDirectionToIcon[sortDirection];
  var btnSortClassName = sortDirection !== '' ? btnSortIcon : "kbnDocTableHeader__sortChange ".concat(btnSortIcon);

  var handleChangeSortOrder = function handleChangeSortOrder() {
    if (!onChangeSortOrder) return; // Cycle goes Unsorted -> Asc -> Desc -> Unsorted

    if (currentColumnSort === undefined) {
      onChangeSortOrder([].concat(_toConsumableArray(currentSortWithoutColumn), [[name, 'asc']]));
    } else if (currentColumnSortDirection === 'asc') {
      onChangeSortOrder([].concat(_toConsumableArray(currentSortWithoutColumn), [[name, 'desc']]));
    } else if (currentColumnSortDirection === 'desc' && currentSortWithoutColumn.length === 0) {
      // If we're at the end of the cycle and this is the only existing sort, we switch
      // back to ascending sort instead of removing it.
      onChangeSortOrder([[name, 'asc']]);
    } else {
      onChangeSortOrder(currentSortWithoutColumn);
    }
  };

  var getSortButtonAriaLabel = function getSortButtonAriaLabel() {
    var sortAscendingMessage = _i18n.i18n.translate('kbn.docTable.tableHeader.sortByColumnAscendingAriaLabel', {
      defaultMessage: 'Sort {columnName} ascending',
      values: {
        columnName: name
      }
    });

    var sortDescendingMessage = _i18n.i18n.translate('kbn.docTable.tableHeader.sortByColumnDescendingAriaLabel', {
      defaultMessage: 'Sort {columnName} descending',
      values: {
        columnName: name
      }
    });

    var stopSortingMessage = _i18n.i18n.translate('kbn.docTable.tableHeader.sortByColumnUnsortedAriaLabel', {
      defaultMessage: 'Stop sorting on {columnName}',
      values: {
        columnName: name
      }
    });

    if (currentColumnSort === undefined) {
      return sortAscendingMessage;
    } else if (sortDirection === 'asc') {
      return sortDescendingMessage;
    } else if (sortDirection === 'desc' && currentSortWithoutColumn.length === 0) {
      return sortAscendingMessage;
    } else {
      return stopSortingMessage;
    }
  }; // action buttons displayed on the right side of the column name


  var buttons = [// Sort Button
  {
    active: isSortable && typeof onChangeSortOrder === 'function',
    ariaLabel: getSortButtonAriaLabel(),
    className: btnSortClassName,
    onClick: handleChangeSortOrder,
    testSubject: "docTableHeaderFieldSort_".concat(name),
    tooltip: getSortButtonAriaLabel()
  }, // Remove Button
  {
    active: isRemoveable && typeof onRemoveColumn === 'function',
    ariaLabel: _i18n.i18n.translate('kbn.docTable.tableHeader.removeColumnButtonAriaLabel', {
      defaultMessage: 'Remove {columnName} column',
      values: {
        columnName: name
      }
    }),
    className: 'fa fa-remove kbnDocTableHeader__move',
    onClick: function onClick() {
      return onRemoveColumn && onRemoveColumn(name);
    },
    testSubject: "docTableRemoveHeader-".concat(name),
    tooltip: _i18n.i18n.translate('kbn.docTable.tableHeader.removeColumnButtonTooltip', {
      defaultMessage: 'Remove Column'
    })
  }, // Move Left Button
  {
    active: colLeftIdx >= 0 && typeof onMoveColumn === 'function',
    ariaLabel: _i18n.i18n.translate('kbn.docTable.tableHeader.moveColumnLeftButtonAriaLabel', {
      defaultMessage: 'Move {columnName} column to the left',
      values: {
        columnName: name
      }
    }),
    className: 'fa fa-angle-double-left kbnDocTableHeader__move',
    onClick: function onClick() {
      return onMoveColumn && onMoveColumn(name, colLeftIdx);
    },
    testSubject: "docTableMoveLeftHeader-".concat(name),
    tooltip: _i18n.i18n.translate('kbn.docTable.tableHeader.moveColumnLeftButtonTooltip', {
      defaultMessage: 'Move column to the left'
    })
  }, // Move Right Button
  {
    active: colRightIdx >= 0 && typeof onMoveColumn === 'function',
    ariaLabel: _i18n.i18n.translate('kbn.docTable.tableHeader.moveColumnRightButtonAriaLabel', {
      defaultMessage: 'Move {columnName} column to the right',
      values: {
        columnName: name
      }
    }),
    className: 'fa fa-angle-double-right kbnDocTableHeader__move',
    onClick: function onClick() {
      return onMoveColumn && onMoveColumn(name, colRightIdx);
    },
    testSubject: "docTableMoveRightHeader-".concat(name),
    tooltip: _i18n.i18n.translate('kbn.docTable.tableHeader.moveColumnRightButtonTooltip', {
      defaultMessage: 'Move column to the right'
    })
  }];
  return _react.default.createElement("th", {
    "data-test-subj": "docTableHeaderField"
  }, _react.default.createElement("span", {
    "data-test-subj": "docTableHeader-".concat(name)
  }, displayName, buttons.filter(function (button) {
    return button.active;
  }).map(function (button, idx) {
    return _react.default.createElement(_eui.EuiToolTip, {
      id: "docTableHeader-".concat(name, "-tt"),
      content: button.tooltip,
      key: "button-".concat(idx)
    }, _react.default.createElement("button", {
      "aria-label": button.ariaLabel,
      className: button.className,
      "data-test-subj": button.testSubject,
      onClick: button.onClick
    }));
  })));
}