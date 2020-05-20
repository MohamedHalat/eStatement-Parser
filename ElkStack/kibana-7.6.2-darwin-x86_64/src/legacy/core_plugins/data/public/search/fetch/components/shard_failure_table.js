"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShardFailureTable = ShardFailureTable;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _services = require("@elastic/eui/lib/services");

var _i18n = require("@kbn/i18n");

var _shard_failure_description = require("./shard_failure_description");

var _shard_failure_description_header = require("./shard_failure_description_header");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function ShardFailureTable(_ref) {
  var failures = _ref.failures;
  var itemList = failures.map(function (failure, idx) {
    return _objectSpread({}, {
      id: String(idx)
    }, {}, failure);
  });
  var initalMap = {};

  var _useState = (0, _react.useState)(initalMap),
      _useState2 = _slicedToArray(_useState, 2),
      expandMap = _useState2[0],
      setExpandMap = _useState2[1];

  var columns = [{
    align: _services.RIGHT_ALIGNMENT,
    width: '40px',
    isExpander: true,
    render: function render(item) {
      var failureSummeryText = (0, _shard_failure_description_header.getFailureSummaryText)(item);

      var collapseLabel = _i18n.i18n.translate('data.search.searchSource.fetch.shardsFailedModal.tableRowCollapse', {
        defaultMessage: 'Collapse {rowDescription}',
        description: 'Collapse a row of a table with failures',
        values: {
          rowDescription: failureSummeryText
        }
      });

      var expandLabel = _i18n.i18n.translate('data.search.searchSource.fetch.shardsFailedModal.tableRowExpand', {
        defaultMessage: 'Expand {rowDescription}',
        description: 'Expand a row of a table with failures',
        values: {
          rowDescription: failureSummeryText
        }
      });

      return _react.default.createElement(_eui.EuiButtonIcon, {
        onClick: function onClick() {
          // toggle displaying the expanded view of the given list item
          var map = Object.assign({}, expandMap);

          if (map[item.id]) {
            delete map[item.id];
          } else {
            map[item.id] = _react.default.createElement(_shard_failure_description.ShardFailureDescription, item);
          }

          setExpandMap(map);
        },
        "aria-label": expandMap[item.id] ? collapseLabel : expandLabel,
        iconType: expandMap[item.id] ? 'arrowUp' : 'arrowDown'
      });
    }
  }, {
    field: 'shard',
    name: _i18n.i18n.translate('data.search.searchSource.fetch.shardsFailedModal.tableColShard', {
      defaultMessage: 'Shard'
    }),
    sortable: true,
    truncateText: true,
    width: '80px'
  }, {
    field: 'index',
    name: _i18n.i18n.translate('data.search.searchSource.fetch.shardsFailedModal.tableColIndex', {
      defaultMessage: 'Index'
    }),
    sortable: true,
    truncateText: true
  }, {
    field: 'node',
    name: _i18n.i18n.translate('data.search.searchSource.fetch.shardsFailedModal.tableColNode', {
      defaultMessage: 'Node'
    }),
    sortable: true,
    truncateText: true
  }, {
    field: 'reason.type',
    name: _i18n.i18n.translate('data.search.searchSource.fetch.shardsFailedModal.tableColReason', {
      defaultMessage: 'Reason'
    }),
    truncateText: true
  }];
  return _react.default.createElement(_eui.EuiInMemoryTable, {
    itemId: "id",
    items: itemList,
    columns: columns,
    pagination: true,
    sorting: {
      sort: {
        field: 'index',
        direction: 'desc'
      }
    },
    itemIdToExpandedRowMap: expandMap
  });
}