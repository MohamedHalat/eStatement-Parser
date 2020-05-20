"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterBar = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _classnames = _interopRequireDefault(require("classnames"));

var _react2 = _interopRequireWildcard(require("react"));

var _filter_editor = require("./filter_editor");

var _filter_item = require("./filter_item");

var _filter_options = require("./filter_options");

var _public = require("../../../../kibana_react/public");

var _ = require("../..");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function FilterBarUI(props) {
  var _useState = (0, _react2.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isAddFilterPopoverOpen = _useState2[0],
      setIsAddFilterPopoverOpen = _useState2[1];

  var kibana = (0, _public.useKibana)();
  var uiSettings = kibana.services.uiSettings;
  if (!uiSettings) return null;

  function onFiltersUpdated(filters) {
    if (props.onFiltersUpdated) {
      props.onFiltersUpdated(filters);
    }
  }

  function renderItems() {
    return props.filters.map(function (filter, i) {
      return _react2.default.createElement(_eui.EuiFlexItem, {
        key: i,
        grow: false,
        className: "globalFilterBar__flexItem"
      }, _react2.default.createElement(_filter_item.FilterItem, {
        id: "".concat(i),
        filter: filter,
        onUpdate: function onUpdate(newFilter) {
          return _onUpdate(i, newFilter);
        },
        onRemove: function onRemove() {
          return _onRemove(i);
        },
        indexPatterns: props.indexPatterns,
        uiSettings: uiSettings
      }));
    });
  }

  function renderAddFilter() {
    var isPinned = uiSettings.get('filters:pinnedByDefault');

    var _props$indexPatterns = _slicedToArray(props.indexPatterns, 1),
        indexPattern = _props$indexPatterns[0];

    var index = indexPattern && indexPattern.id;

    var newFilter = _.esFilters.buildEmptyFilter(isPinned, index);

    var button = _react2.default.createElement(_eui.EuiButtonEmpty, {
      size: "xs",
      onClick: function onClick() {
        return setIsAddFilterPopoverOpen(true);
      },
      "data-test-subj": "addFilter",
      className: "globalFilterBar__addButton"
    }, "+", ' ', _react2.default.createElement(_react.FormattedMessage, {
      id: "data.filter.filterBar.addFilterButtonLabel",
      defaultMessage: "Add filter"
    }));

    return _react2.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react2.default.createElement(_eui.EuiPopover, {
      id: "addFilterPopover",
      button: button,
      isOpen: isAddFilterPopoverOpen,
      closePopover: function closePopover() {
        return setIsAddFilterPopoverOpen(false);
      },
      anchorPosition: "downLeft",
      withTitle: true,
      panelPaddingSize: "none",
      ownFocus: true
    }, _react2.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react2.default.createElement("div", {
      style: {
        width: 400
      }
    }, _react2.default.createElement(_filter_editor.FilterEditor, {
      filter: newFilter,
      indexPatterns: props.indexPatterns,
      onSubmit: onAdd,
      onCancel: function onCancel() {
        return setIsAddFilterPopoverOpen(false);
      },
      key: JSON.stringify(newFilter)
    })))));
  }

  function onAdd(filter) {
    setIsAddFilterPopoverOpen(false);
    var filters = [].concat(_toConsumableArray(props.filters), [filter]);
    onFiltersUpdated(filters);
  }

  function _onRemove(i) {
    var filters = _toConsumableArray(props.filters);

    filters.splice(i, 1);
    onFiltersUpdated(filters);
  }

  function _onUpdate(i, filter) {
    var filters = _toConsumableArray(props.filters);

    filters[i] = filter;
    onFiltersUpdated(filters);
  }

  function onEnableAll() {
    var filters = props.filters.map(_.esFilters.enableFilter);
    onFiltersUpdated(filters);
  }

  function onDisableAll() {
    var filters = props.filters.map(_.esFilters.disableFilter);
    onFiltersUpdated(filters);
  }

  function onPinAll() {
    var filters = props.filters.map(_.esFilters.pinFilter);
    onFiltersUpdated(filters);
  }

  function onUnpinAll() {
    var filters = props.filters.map(_.esFilters.unpinFilter);
    onFiltersUpdated(filters);
  }

  function onToggleAllNegated() {
    var filters = props.filters.map(_.esFilters.toggleFilterNegated);
    onFiltersUpdated(filters);
  }

  function onToggleAllDisabled() {
    var filters = props.filters.map(_.esFilters.toggleFilterDisabled);
    onFiltersUpdated(filters);
  }

  function onRemoveAll() {
    onFiltersUpdated([]);
  }

  var classes = (0, _classnames.default)('globalFilterBar', props.className);
  return _react2.default.createElement(_eui.EuiFlexGroup, {
    className: "globalFilterGroup",
    gutterSize: "none",
    alignItems: "flexStart",
    responsive: false
  }, _react2.default.createElement(_eui.EuiFlexItem, {
    className: "globalFilterGroup__branch",
    grow: false
  }, _react2.default.createElement(_filter_options.FilterOptions, {
    onEnableAll: onEnableAll,
    onDisableAll: onDisableAll,
    onPinAll: onPinAll,
    onUnpinAll: onUnpinAll,
    onToggleAllNegated: onToggleAllNegated,
    onToggleAllDisabled: onToggleAllDisabled,
    onRemoveAll: onRemoveAll
  })), _react2.default.createElement(_eui.EuiFlexItem, {
    className: "globalFilterGroup__filterFlexItem"
  }, _react2.default.createElement(_eui.EuiFlexGroup, {
    className: classes,
    wrap: true,
    responsive: false,
    gutterSize: "xs",
    alignItems: "center"
  }, renderItems(), renderAddFilter())));
}

var FilterBar = (0, _react.injectI18n)(FilterBarUI);
exports.FilterBar = FilterBar;