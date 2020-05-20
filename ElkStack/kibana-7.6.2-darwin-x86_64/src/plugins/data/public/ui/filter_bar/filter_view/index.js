"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterView = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

var _filter_label = require("../filter_editor/lib/filter_label");

var _ = require("../../..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var FilterView = function FilterView(_ref) {
  var filter = _ref.filter,
      iconOnClick = _ref.iconOnClick,
      onClick = _ref.onClick,
      valueLabel = _ref.valueLabel,
      rest = _objectWithoutProperties(_ref, ["filter", "iconOnClick", "onClick", "valueLabel"]);

  var _useInnerText = (0, _eui.useInnerText)(),
      _useInnerText2 = _slicedToArray(_useInnerText, 2),
      ref = _useInnerText2[0],
      innerText = _useInnerText2[1];

  var title = _i18n.i18n.translate('data.filter.filterBar.moreFilterActionsMessage', {
    defaultMessage: 'Filter: {innerText}. Select for more filter actions.',
    values: {
      innerText: innerText
    }
  });

  if (_.esFilters.isFilterPinned(filter)) {
    title = "".concat(_i18n.i18n.translate('data.filter.filterBar.pinnedFilterPrefix', {
      defaultMessage: 'Pinned'
    }), " ").concat(title);
  }

  if (filter.meta.disabled) {
    title = "".concat(_i18n.i18n.translate('data.filter.filterBar.disabledFilterPrefix', {
      defaultMessage: 'Disabled'
    }), " ").concat(title);
  }

  return _react.default.createElement(_eui.EuiBadge, _extends({
    title: title,
    color: "hollow",
    iconType: "cross",
    iconSide: "right",
    closeButtonProps: {
      // Removing tab focus on close button because the same option can be optained through the context menu
      // Also, we may want to add a `DEL` keyboard press functionality
      tabIndex: -1
    },
    iconOnClick: iconOnClick,
    iconOnClickAriaLabel: _i18n.i18n.translate('data.filter.filterBar.filterItemBadgeIconAriaLabel', {
      defaultMessage: 'Delete'
    }),
    onClick: onClick,
    onClickAriaLabel: _i18n.i18n.translate('data.filter.filterBar.filterItemBadgeAriaLabel', {
      defaultMessage: 'Filter actions'
    })
  }, rest), _react.default.createElement("span", {
    ref: ref
  }, _react.default.createElement(_filter_label.FilterLabel, {
    filter: filter,
    valueLabel: valueLabel
  })));
};

exports.FilterView = FilterView;