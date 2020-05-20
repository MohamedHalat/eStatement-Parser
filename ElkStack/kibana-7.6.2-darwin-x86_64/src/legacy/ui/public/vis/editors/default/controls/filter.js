"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterRow = FilterRow;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _new_platform = require("../../../../new_platform");

var _public = require("../../../../../../../plugins/data/public");

var _public2 = require("../../../../../../../plugins/kibana_utils/public");

var _public3 = require("../../../../../../../plugins/kibana_react/public");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var localStorage = new _public2.Storage(window.localStorage);

function FilterRow(_ref) {
  var id = _ref.id,
      arrayIndex = _ref.arrayIndex,
      customLabel = _ref.customLabel,
      value = _ref.value,
      autoFocus = _ref.autoFocus,
      disableRemove = _ref.disableRemove,
      dataTestSubj = _ref.dataTestSubj,
      agg = _ref.agg,
      onChangeValue = _ref.onChangeValue,
      onRemoveFilter = _ref.onRemoveFilter;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      showCustomLabel = _useState2[0],
      setShowCustomLabel = _useState2[1];

  var filterLabel = _i18n.i18n.translate('common.ui.aggTypes.filters.filterLabel', {
    defaultMessage: 'Filter {index}',
    values: {
      index: arrayIndex + 1
    }
  });

  var FilterControl = _react.default.createElement("div", null, _react.default.createElement(_eui.EuiButtonIcon, {
    iconType: "tag",
    "aria-label": _i18n.i18n.translate('common.ui.aggTypes.filters.toggleFilterButtonAriaLabel', {
      defaultMessage: 'Toggle filter label'
    }),
    "aria-expanded": showCustomLabel,
    "aria-controls": "visEditorFilterLabel".concat(arrayIndex),
    onClick: function onClick() {
      return setShowCustomLabel(!showCustomLabel);
    }
  }), _react.default.createElement(_eui.EuiButtonIcon, {
    iconType: "trash",
    color: "danger",
    disabled: disableRemove,
    "aria-label": _i18n.i18n.translate('common.ui.aggTypes.filters.removeFilterButtonAriaLabel', {
      defaultMessage: 'Remove this filter'
    }),
    onClick: function onClick() {
      return onRemoveFilter(id);
    }
  })); // TODO: KibanaContextProvider should be raised to the top of the vis plugin


  return _react.default.createElement(_eui.EuiForm, null, _react.default.createElement(_eui.EuiFormRow, {
    label: "".concat(filterLabel).concat(customLabel ? " - ".concat(customLabel) : ''),
    labelAppend: FilterControl,
    fullWidth: true
  }, _react.default.createElement(_public3.KibanaContextProvider, {
    services: _objectSpread({
      appName: 'filtersAgg',
      storage: localStorage,
      data: _new_platform.npStart.plugins.data
    }, _new_platform.npStart.core)
  }, _react.default.createElement(_public.QueryStringInput, {
    query: value,
    indexPatterns: [agg.getIndexPattern()],
    onChange: function onChange(query) {
      return onChangeValue(id, query, customLabel);
    },
    disableAutoFocus: !autoFocus,
    dataTestSubj: dataTestSubj,
    bubbleSubmitEvent: true,
    languageSwitcherPopoverAnchorPosition: "leftDown"
  }))), showCustomLabel ? _react.default.createElement(_eui.EuiFormRow, {
    id: "visEditorFilterLabel".concat(arrayIndex),
    label: _i18n.i18n.translate('common.ui.aggTypes.filters.definiteFilterLabel', {
      defaultMessage: 'Filter {index} label',
      description: "'Filter {index}' represents the name of the filter as a noun, similar to 'label for filter 1'.",
      values: {
        index: arrayIndex + 1
      }
    }),
    fullWidth: true,
    compressed: true
  }, _react.default.createElement(_eui.EuiFieldText, {
    value: customLabel,
    placeholder: _i18n.i18n.translate('common.ui.aggTypes.filters.labelPlaceholder', {
      defaultMessage: 'Label'
    }),
    onChange: function onChange(ev) {
      return onChangeValue(id, value, ev.target.value);
    },
    fullWidth: true,
    compressed: true
  })) : null, _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }));
}