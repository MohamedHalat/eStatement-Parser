"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DefaultEditorAggAdd = DefaultEditorAggAdd;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

var _agg_groups = require("../agg_groups");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function DefaultEditorAggAdd(_ref) {
  var _ref$group = _ref.group,
      group = _ref$group === void 0 ? [] : _ref$group,
      groupName = _ref.groupName,
      schemas = _ref.schemas,
      addSchema = _ref.addSchema,
      stats = _ref.stats;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isPopoverOpen = _useState2[0],
      setIsPopoverOpen = _useState2[1];

  var onSelectSchema = function onSelectSchema(schema) {
    setIsPopoverOpen(false);
    addSchema(schema);
  };

  var addButton = _react.default.createElement(_eui.EuiButtonEmpty, {
    size: "xs",
    iconType: "plusInCircleFilled",
    "data-test-subj": "visEditorAdd_".concat(groupName),
    onClick: function onClick() {
      return setIsPopoverOpen(!isPopoverOpen);
    }
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "common.ui.vis.editors.aggAdd.addButtonLabel",
    defaultMessage: "Add"
  }));

  var groupNameLabel = groupName === _agg_groups.AggGroupNames.Buckets ? _i18n.i18n.translate('common.ui.vis.editors.aggAdd.bucketLabel', {
    defaultMessage: 'bucket'
  }) : _i18n.i18n.translate('common.ui.vis.editors.aggAdd.metricLabel', {
    defaultMessage: 'metric'
  });

  var isSchemaDisabled = function isSchemaDisabled(schema) {
    var count = group.filter(function (agg) {
      return agg.schema.name === schema.name;
    }).length;
    return count >= schema.max;
  };

  return _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "center",
    responsive: false
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiPopover, {
    id: "addGroupButtonPopover_".concat(groupName),
    button: addButton,
    isOpen: isPopoverOpen,
    panelPaddingSize: "none",
    repositionOnScroll: true,
    closePopover: function closePopover() {
      return setIsPopoverOpen(false);
    }
  }, _react.default.createElement(_eui.EuiPopoverTitle, null, (groupName !== _agg_groups.AggGroupNames.Buckets || !stats.count) && _react.default.createElement(_react2.FormattedMessage, {
    id: "common.ui.vis.editors.aggAdd.addGroupButtonLabel",
    defaultMessage: "Add {groupNameLabel}",
    values: {
      groupNameLabel: groupNameLabel
    }
  }), groupName === _agg_groups.AggGroupNames.Buckets && stats.count > 0 && _react.default.createElement(_react2.FormattedMessage, {
    id: "common.ui.vis.editors.aggAdd.addSubGroupButtonLabel",
    defaultMessage: "Add sub-{groupNameLabel}",
    values: {
      groupNameLabel: groupNameLabel
    }
  })), _react.default.createElement(_eui.EuiContextMenuPanel, {
    items: schemas.map(function (schema) {
      return _react.default.createElement(_eui.EuiContextMenuItem, {
        key: "".concat(schema.name, "_").concat(schema.title),
        "data-test-subj": "visEditorAdd_".concat(groupName, "_").concat(schema.title),
        disabled: isPopoverOpen && isSchemaDisabled(schema),
        onClick: function onClick() {
          return onSelectSchema(schema);
        }
      }, schema.title);
    })
  }))));
}