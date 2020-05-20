"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ManagementSidebarNav = exports.mergeLegacyItems = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

var _react2 = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var managementSectionOrAppToNav = function managementSectionOrAppToNav(appOrSection) {
  return {
    id: appOrSection.id,
    name: appOrSection.title,
    'data-test-subj': appOrSection.id,
    order: appOrSection.order
  };
};

var managementSectionToNavSection = function managementSectionToNavSection(section) {
  var iconType = section.euiIconType ? section.euiIconType : section.icon ? section.icon : 'empty';
  return _objectSpread({
    icon: _react2.default.createElement(_eui.EuiIcon, {
      type: iconType,
      size: "m"
    })
  }, managementSectionOrAppToNav(section));
};

var managementAppToNavItem = function managementAppToNavItem(selectedId, parentId) {
  return function (app) {
    return _objectSpread({
      isSelected: selectedId === app.id,
      href: "#/management/".concat(parentId, "/").concat(app.id)
    }, managementSectionOrAppToNav(app));
  };
};

var legacySectionToNavSection = function legacySectionToNavSection(section) {
  return {
    name: section.display,
    id: section.id,
    icon: section.icon ? _react2.default.createElement(_eui.EuiIcon, {
      type: section.icon
    }) : null,
    items: [],
    'data-test-subj': section.id,
    // @ts-ignore
    order: section.order
  };
};

var legacyAppToNavItem = function legacyAppToNavItem(app, selectedId) {
  return {
    isSelected: selectedId === app.id,
    name: app.display,
    id: app.id,
    href: app.url,
    'data-test-subj': app.id,
    // @ts-ignore
    order: app.order
  };
};

var sectionVisible = function sectionVisible(section) {
  return !section.disabled && section.visible;
};

var sideNavItems = function sideNavItems(sections, selectedId) {
  return sections.map(function (section) {
    return _objectSpread({
      items: section.getAppsEnabled().map(managementAppToNavItem(selectedId, section.id))
    }, managementSectionToNavSection(section));
  });
};

var findOrAddSection = function findOrAddSection(navItems, legacySection) {
  var foundSection = navItems.find(function (sec) {
    return sec.id === legacySection.id;
  });

  if (foundSection) {
    return foundSection;
  } else {
    var newSection = legacySectionToNavSection(legacySection);
    navItems.push(newSection);
    navItems.sort(function (a, b) {
      return a.order - b.order;
    }); // only needed while merging platform and legacy

    return newSection;
  }
};

var mergeLegacyItems = function mergeLegacyItems(navItems, legacySections, selectedId) {
  var filteredLegacySections = legacySections.filter(sectionVisible).filter(function (section) {
    return section.visibleItems.length;
  });
  filteredLegacySections.forEach(function (legacySection) {
    var section = findOrAddSection(navItems, legacySection);
    legacySection.visibleItems.forEach(function (app) {
      section.items.push(legacyAppToNavItem(app, selectedId));
      return section.items.sort(function (a, b) {
        return a.order - b.order;
      });
    });
  });
  return navItems;
};

exports.mergeLegacyItems = mergeLegacyItems;

var sectionsToItems = function sectionsToItems(sections, legacySections, selectedId) {
  var navItems = sideNavItems(sections, selectedId);
  return mergeLegacyItems(navItems, legacySections, selectedId);
};

var ManagementSidebarNav =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ManagementSidebarNav, _React$Component);

  function ManagementSidebarNav(props) {
    var _this;

    _classCallCheck(this, ManagementSidebarNav);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ManagementSidebarNav).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "toggleOpenOnMobile", function () {
      _this.setState({
        isSideNavOpenOnMobile: !_this.state.isSideNavOpenOnMobile
      });
    });

    _this.state = {
      isSideNavOpenOnMobile: false
    };
    return _this;
  }

  _createClass(ManagementSidebarNav, [{
    key: "render",
    value: function render() {
      var HEADER_ID = 'management-nav-header';
      return _react2.default.createElement(_react2.default.Fragment, null, _react2.default.createElement(_eui.EuiScreenReaderOnly, null, _react2.default.createElement("h2", {
        id: HEADER_ID
      }, _i18n.i18n.translate('management.nav.label', {
        defaultMessage: 'Management'
      }))), _react2.default.createElement(_eui.EuiSideNav, {
        "aria-labelledby": HEADER_ID,
        mobileTitle: this.renderMobileTitle(),
        isOpenOnMobile: this.state.isSideNavOpenOnMobile,
        toggleOpenOnMobile: this.toggleOpenOnMobile,
        items: sectionsToItems(this.props.getSections(), this.props.legacySections, this.props.selectedId),
        className: "mgtSideBarNav"
      }));
    }
  }, {
    key: "renderMobileTitle",
    value: function renderMobileTitle() {
      return _react2.default.createElement(_react.FormattedMessage, {
        id: "management.nav.menu",
        defaultMessage: "Management menu"
      });
    }
  }]);

  return ManagementSidebarNav;
}(_react2.default.Component);

exports.ManagementSidebarNav = ManagementSidebarNav;