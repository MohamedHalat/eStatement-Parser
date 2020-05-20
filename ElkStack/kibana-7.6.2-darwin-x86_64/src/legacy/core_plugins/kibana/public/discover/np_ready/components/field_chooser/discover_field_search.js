"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DiscoverFieldSearch = DiscoverFieldSearch;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Component is Discover's side bar to  search of available fields
 * Additionally there's a button displayed that allows the user to show/hide more filter fields
 */
function DiscoverFieldSearch(_ref) {
  var _onChange = _ref.onChange,
      value = _ref.value,
      types = _ref.types;

  var searchPlaceholder = _i18n.i18n.translate('kbn.discover.fieldChooser.searchPlaceHolder', {
    defaultMessage: 'Search field names'
  });

  var aggregatableLabel = _i18n.i18n.translate('kbn.discover.fieldChooser.filter.aggregatableLabel', {
    defaultMessage: 'Aggregatable'
  });

  var searchableLabel = _i18n.i18n.translate('kbn.discover.fieldChooser.filter.searchableLabel', {
    defaultMessage: 'Searchable'
  });

  var typeLabel = _i18n.i18n.translate('kbn.discover.fieldChooser.filter.typeLabel', {
    defaultMessage: 'Type'
  });

  var typeOptions = types ? types.map(function (type) {
    return {
      value: type,
      text: type
    };
  }) : [{
    value: 'any',
    text: 'any'
  }];

  var _useState = (0, _react.useState)(0),
      _useState2 = _slicedToArray(_useState, 2),
      activeFiltersCount = _useState2[0],
      setActiveFiltersCount = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isPopoverOpen = _useState4[0],
      setPopoverOpen = _useState4[1];

  var _useState5 = (0, _react.useState)({
    searchable: 'any',
    aggregatable: 'any',
    type: 'any',
    missing: true
  }),
      _useState6 = _slicedToArray(_useState5, 2),
      values = _useState6[0],
      setValues = _useState6[1];

  if (typeof value !== 'string') {
    // at initial rendering value is undefined (angular related), this catches the warning
    // should be removed once all is react
    return null;
  }

  var filterBtnAriaLabel = isPopoverOpen ? _i18n.i18n.translate('kbn.discover.fieldChooser.toggleFieldFilterButtonHideAriaLabel', {
    defaultMessage: 'Hide field filter settings'
  }) : _i18n.i18n.translate('kbn.discover.fieldChooser.toggleFieldFilterButtonShowAriaLabel', {
    defaultMessage: 'Show field filter settings'
  });

  var handleFacetButtonClicked = function handleFacetButtonClicked() {
    setPopoverOpen(!isPopoverOpen);
  };

  var applyFilterValue = function applyFilterValue(id, filterValue) {
    switch (filterValue) {
      case 'any':
        if (id !== 'type') {
          _onChange(id, undefined);
        } else {
          _onChange(id, filterValue);
        }

        break;

      case 'true':
        _onChange(id, true);

        break;

      case 'false':
        _onChange(id, false);

        break;

      default:
        _onChange(id, filterValue);

    }
  };

  var isFilterActive = function isFilterActive(name, filterValue) {
    return name !== 'missing' && filterValue !== 'any';
  };

  var handleValueChange = function handleValueChange(name, filterValue) {
    var previousValue = values[name];
    updateFilterCount(name, previousValue, filterValue);

    var updatedValues = _objectSpread({}, values);

    updatedValues[name] = filterValue;
    setValues(updatedValues);
    applyFilterValue(name, filterValue);
  };

  var updateFilterCount = function updateFilterCount(name, previousValue, currentValue) {
    var previouslyFilterActive = isFilterActive(name, previousValue);
    var filterActive = isFilterActive(name, currentValue);
    var diff = Number(filterActive) - Number(previouslyFilterActive);
    setActiveFiltersCount(activeFiltersCount + diff);
  };

  var handleMissingChange = function handleMissingChange(e) {
    var missingValue = e.target.checked;
    handleValueChange('missing', missingValue);
  };

  var buttonContent = _react.default.createElement(_eui.EuiFacetButton, {
    "aria-label": filterBtnAriaLabel,
    "data-test-subj": "toggleFieldFilterButton",
    className: "dscToggleFieldFilterButton",
    icon: _react.default.createElement(_eui.EuiIcon, {
      type: "filter"
    }),
    isSelected: activeFiltersCount > 0,
    quantity: activeFiltersCount,
    onClick: handleFacetButtonClicked
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "kbn.discover.fieldChooser.fieldFilterFacetButtonLabel",
    defaultMessage: "Filter by type"
  }));

  var select = function select(id, selectOptions, selectValue) {
    return _react.default.createElement(_eui.EuiSelect, {
      id: "".concat(id, "-select"),
      options: selectOptions,
      value: selectValue,
      onChange: function onChange(e) {
        return handleValueChange(id, e.target.value);
      },
      "aria-label": _i18n.i18n.translate('kbn.discover.fieldChooser.filter.fieldSelectorLabel', {
        defaultMessage: 'Selection of {id} filter options',
        values: {
          id: id
        }
      }),
      "data-test-subj": "".concat(id, "Select"),
      compressed: true
    });
  };

  var toggleButtons = function toggleButtons(id) {
    return [{
      id: "".concat(id, "-any"),
      label: 'any'
    }, {
      id: "".concat(id, "-true"),
      label: 'yes'
    }, {
      id: "".concat(id, "-false"),
      label: 'no'
    }];
  };

  var buttonGroup = function buttonGroup(id, legend) {
    return _react.default.createElement(_eui.EuiButtonGroup, {
      legend: legend,
      options: toggleButtons(id),
      idSelected: "".concat(id, "-").concat(values[id]),
      onChange: function onChange(optionId) {
        return handleValueChange(id, optionId.replace("".concat(id, "-"), ''));
      },
      buttonSize: "compressed",
      isFullWidth: true,
      "data-test-subj": "".concat(id, "ButtonGroup")
    });
  };

  var selectionPanel = _react.default.createElement("div", {
    className: "dscFieldSearch__formWrapper"
  }, _react.default.createElement(_eui.EuiForm, {
    "data-test-subj": "filterSelectionPanel"
  }, _react.default.createElement(_eui.EuiFormRow, {
    fullWidth: true,
    label: aggregatableLabel,
    display: "columnCompressed"
  }, buttonGroup('aggregatable', aggregatableLabel)), _react.default.createElement(_eui.EuiFormRow, {
    fullWidth: true,
    label: searchableLabel,
    display: "columnCompressed"
  }, buttonGroup('searchable', searchableLabel)), _react.default.createElement(_eui.EuiFormRow, {
    fullWidth: true,
    label: typeLabel,
    display: "columnCompressed"
  }, select('type', typeOptions, values.type))));

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, {
    responsive: false,
    gutterSize: 's'
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFieldSearch, {
    "aria-label": searchPlaceholder,
    "data-test-subj": "fieldFilterSearchInput",
    compressed: true,
    fullWidth: true,
    onChange: function onChange(event) {
      return _onChange('name', event.currentTarget.value);
    },
    placeholder: searchPlaceholder,
    value: value
  }))), _react.default.createElement("div", {
    className: "dscFieldSearch__filterWrapper"
  }, _react.default.createElement(_eui.EuiOutsideClickDetector, {
    onOutsideClick: function onOutsideClick() {},
    isDisabled: !isPopoverOpen
  }, _react.default.createElement(_eui.EuiPopover, {
    id: "dataPanelTypeFilter",
    panelClassName: "euiFilterGroup__popoverPanel",
    panelPaddingSize: "none",
    anchorPosition: "downLeft",
    display: "block",
    isOpen: isPopoverOpen,
    closePopover: function closePopover() {
      setPopoverOpen(false);
    },
    button: buttonContent
  }, _react.default.createElement(_eui.EuiPopoverTitle, null, _i18n.i18n.translate('kbn.discover.fieldChooser.filter.filterByTypeLabel', {
    defaultMessage: 'Filter by type'
  })), selectionPanel, _react.default.createElement(_eui.EuiPopoverFooter, null, _react.default.createElement(_eui.EuiSwitch, {
    label: _i18n.i18n.translate('kbn.discover.fieldChooser.filter.hideMissingFieldsLabel', {
      defaultMessage: 'Hide missing fields'
    }),
    checked: values.missing,
    onChange: handleMissingChange,
    "data-test-subj": "missingSwitch"
  }))))));
}