"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TopNavMenu = TopNavMenu;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _top_nav_menu_item = require("./top_nav_menu_item");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/*
 * Top Nav Menu is a convenience wrapper component for:
 * - Top navigation menu - configured by an array of `TopNavMenuData` objects
 * - Search Bar - which includes Filter Bar \ Query Input \ Timepicker.
 *
 * See SearchBar documentation to learn more about its properties.
 *
 **/
function TopNavMenu(props) {
  var config = props.config,
      showSearchBar = props.showSearchBar,
      searchBarProps = _objectWithoutProperties(props, ["config", "showSearchBar"]);

  function renderItems() {
    if (!config) return;
    return config.map(function (menuItem, i) {
      return _react.default.createElement(_eui.EuiFlexItem, {
        grow: false,
        key: "nav-menu-".concat(i)
      }, _react.default.createElement(_top_nav_menu_item.TopNavMenuItem, menuItem));
    });
  }

  function renderSearchBar() {
    // Validate presense of all required fields
    if (!showSearchBar || !props.data) return;
    var SearchBar = props.data.ui.SearchBar;
    return _react.default.createElement(SearchBar, searchBarProps);
  }

  function renderLayout() {
    return _react.default.createElement("span", {
      className: "kbnTopNavMenu__wrapper"
    }, _react.default.createElement(_eui.EuiFlexGroup, {
      "data-test-subj": "top-nav",
      justifyContent: "flexStart",
      gutterSize: "none",
      className: "kbnTopNavMenu",
      responsive: false
    }, renderItems()), renderSearchBar());
  }

  return _react.default.createElement(_react2.I18nProvider, null, renderLayout());
}

TopNavMenu.defaultProps = {
  showSearchBar: false,
  showQueryBar: true,
  showQueryInput: true,
  showDatePicker: true,
  showFilterBar: true,
  screenTitle: ''
};