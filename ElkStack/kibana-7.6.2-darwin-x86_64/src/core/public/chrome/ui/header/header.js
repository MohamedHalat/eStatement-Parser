"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Header = void 0;

var _url = _interopRequireDefault(require("url"));

var _react = _interopRequireWildcard(require("react"));

var Rx = _interopRequireWildcard(require("rxjs"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _header_badge = require("./header_badge");

var _header_breadcrumbs = require("./header_breadcrumbs");

var _header_help_menu = require("./header_help_menu");

var _header_nav_controls = require("./header_nav_controls");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

// Providing a buffer between the limit and the cut off index
// protects from truncating just the last couple (6) characters
var TRUNCATE_LIMIT = 64;
var TRUNCATE_AT = 58;
/**
 *
 * @param {string} url - a relative or root relative url.  If a relative path is given then the
 * absolute url returned will depend on the current page where this function is called from. For example
 * if you are on page "http://www.mysite.com/shopping/kids" and you pass this function "adults", you would get
 * back "http://www.mysite.com/shopping/adults".  If you passed this function a root relative path, or one that
 * starts with a "/", for example "/account/cart", you would get back "http://www.mysite.com/account/cart".
 * @return {string} the relative url transformed into an absolute url
 */

function relativeToAbsolute(url) {
  // convert all link urls to absolute urls
  var a = document.createElement('a');
  a.setAttribute('href', url);
  return a.href;
}

function extendRecentlyAccessedHistoryItem(navLinks, recentlyAccessed, basePath) {
  var href = relativeToAbsolute(basePath.prepend(recentlyAccessed.link));
  var navLink = navLinks.find(function (nl) {
    return href.startsWith(nl.subUrlBase || nl.baseUrl);
  });
  var titleAndAriaLabel = recentlyAccessed.label;

  if (navLink) {
    var objectTypeForAriaAppendix = navLink.title;
    titleAndAriaLabel = _i18n.i18n.translate('core.ui.recentLinks.linkItem.screenReaderLabel', {
      defaultMessage: '{recentlyAccessedItemLinklabel}, type: {pageType}',
      values: {
        recentlyAccessedItemLinklabel: recentlyAccessed.label,
        pageType: objectTypeForAriaAppendix
      }
    });
  }

  return _objectSpread({}, recentlyAccessed, {
    href: href,
    euiIconType: navLink ? navLink.euiIconType : undefined,
    title: titleAndAriaLabel
  });
}

function extendNavLink(navLink) {
  if (navLink.legacy) {
    return _objectSpread({}, navLink, {
      href: navLink.url && !navLink.active ? navLink.url : navLink.baseUrl
    });
  }

  return _objectSpread({}, navLink, {
    href: navLink.baseUrl
  });
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

function findClosestAnchor(element) {
  var current = element;

  while (current) {
    if (current.tagName === 'A') {
      return current;
    }

    if (!current.parentElement || current.parentElement === document.body) {
      return undefined;
    }

    current = current.parentElement;
  }
}

function truncateRecentItemLabel(label) {
  if (label.length > TRUNCATE_LIMIT) {
    label = "".concat(label.substring(0, TRUNCATE_AT), "\u2026");
  }

  return label;
}

var HeaderUI =
/*#__PURE__*/
function (_Component) {
  _inherits(HeaderUI, _Component);

  function HeaderUI(props) {
    var _this;

    _classCallCheck(this, HeaderUI);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(HeaderUI).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "subscription", void 0);

    _defineProperty(_assertThisInitialized(_this), "navDrawerRef", (0, _react.createRef)());

    _defineProperty(_assertThisInitialized(_this), "onNavClick", function (event) {
      var anchor = findClosestAnchor(event.nativeEvent.target);

      if (!anchor) {
        return;
      }

      var navLink = _this.state.navLinks.find(function (item) {
        return item.href === anchor.href;
      });

      if (navLink && navLink.disabled) {
        event.preventDefault();
        return;
      }

      if (!_this.state.forceNavigation || event.isDefaultPrevented() || event.altKey || event.metaKey || event.ctrlKey) {
        return;
      }

      var toParsed = _url.default.parse(anchor.href);

      var fromParsed = _url.default.parse(document.location.href);

      var sameProto = toParsed.protocol === fromParsed.protocol;
      var sameHost = toParsed.host === fromParsed.host;
      var samePath = toParsed.path === fromParsed.path;

      if (sameProto && sameHost && samePath) {
        if (toParsed.hash) {
          document.location.reload();
        } // event.preventDefault() keeps the browser from seeing the new url as an update
        // and even setting window.location does not mimic that behavior, so instead
        // we use stopPropagation() to prevent angular from seeing the click and
        // starting a digest cycle/attempting to handle it in the router.


        event.stopPropagation();
      }
    });

    _this.state = {
      appTitle: 'Kibana',
      isVisible: true,
      navLinks: [],
      recentlyAccessed: [],
      forceNavigation: false,
      navControlsLeft: [],
      navControlsRight: []
    };
    return _this;
  }

  _createClass(HeaderUI, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.subscription = Rx.combineLatest(this.props.appTitle$, this.props.isVisible$, this.props.forceAppSwitcherNavigation$, this.props.navLinks$, this.props.recentlyAccessed$, // Types for combineLatest only handle up to 6 inferred types so we combine these two separately.
      Rx.combineLatest(this.props.navControlsLeft$, this.props.navControlsRight$, this.props.application.currentAppId$)).subscribe({
        next: function next(_ref) {
          var _ref2 = _slicedToArray(_ref, 6),
              appTitle = _ref2[0],
              isVisible = _ref2[1],
              forceNavigation = _ref2[2],
              navLinks = _ref2[3],
              recentlyAccessed = _ref2[4],
              _ref2$ = _slicedToArray(_ref2[5], 3),
              navControlsLeft = _ref2$[0],
              navControlsRight = _ref2$[1],
              currentAppId = _ref2$[2];

          _this2.setState({
            appTitle: appTitle,
            isVisible: isVisible,
            forceNavigation: forceNavigation,
            navLinks: navLinks.map(extendNavLink),
            recentlyAccessed: recentlyAccessed.map(function (ra) {
              return extendRecentlyAccessedHistoryItem(navLinks, ra, _this2.props.basePath);
            }),
            navControlsLeft: navControlsLeft,
            navControlsRight: navControlsRight,
            currentAppId: currentAppId
          });
        }
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }
  }, {
    key: "renderLogo",
    value: function renderLogo() {
      var _this$props = this.props,
          homeHref = _this$props.homeHref,
          intl = _this$props.intl;
      return _react.default.createElement(_eui.EuiHeaderLogo, {
        "data-test-subj": "logo",
        iconType: "logoKibana",
        onClick: this.onNavClick,
        href: homeHref,
        "aria-label": intl.formatMessage({
          id: 'core.ui.chrome.headerGlobalNav.goHomePageIconAriaLabel',
          defaultMessage: 'Go to home page'
        })
      });
    }
  }, {
    key: "renderMenuTrigger",
    value: function renderMenuTrigger() {
      var _this3 = this;

      return _react.default.createElement(_eui.EuiHeaderSectionItemButton, {
        "aria-label": "Toggle side navigation",
        onClick: function onClick() {
          return _this3.navDrawerRef.current.toggleOpen();
        }
      }, _react.default.createElement(_eui.EuiIcon, {
        type: "apps",
        size: "m"
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          application = _this$props2.application,
          badge$ = _this$props2.badge$,
          basePath = _this$props2.basePath,
          breadcrumbs$ = _this$props2.breadcrumbs$,
          helpExtension$ = _this$props2.helpExtension$,
          helpSupportUrl$ = _this$props2.helpSupportUrl$,
          intl = _this$props2.intl,
          isLocked = _this$props2.isLocked,
          kibanaDocLink = _this$props2.kibanaDocLink,
          kibanaVersion = _this$props2.kibanaVersion,
          onIsLockedUpdate = _this$props2.onIsLockedUpdate,
          legacyMode = _this$props2.legacyMode;
      var _this$state = this.state,
          appTitle = _this$state.appTitle,
          currentAppId = _this$state.currentAppId,
          isVisible = _this$state.isVisible,
          navControlsLeft = _this$state.navControlsLeft,
          navControlsRight = _this$state.navControlsRight,
          navLinks = _this$state.navLinks,
          recentlyAccessed = _this$state.recentlyAccessed;

      if (!isVisible) {
        return null;
      }

      var navLinksArray = navLinks.filter(function (navLink) {
        return !navLink.hidden;
      }).map(function (navLink) {
        var _navLink$tooltip;

        return {
          key: navLink.id,
          label: (_navLink$tooltip = navLink.tooltip) !== null && _navLink$tooltip !== void 0 ? _navLink$tooltip : navLink.title,
          // Use href and onClick to support "open in new tab" and SPA navigation in the same link
          href: navLink.href,
          onClick: function onClick(event) {
            if (!legacyMode && // ignore when in legacy mode
            !navLink.legacy && // ignore links to legacy apps
            !event.defaultPrevented && // onClick prevented default
            event.button === 0 && // ignore everything but left clicks
            !isModifiedEvent(event) // ignore clicks with modifier keys
            ) {
                event.preventDefault();
                application.navigateToApp(navLink.id);
              }
          },
          // Legacy apps use `active` property, NP apps should match the current app
          isActive: navLink.active || currentAppId === navLink.id,
          isDisabled: navLink.disabled,
          iconType: navLink.euiIconType,
          icon: !navLink.euiIconType && navLink.icon ? _react.default.createElement(_eui.EuiImage, {
            size: "s",
            alt: "",
            "aria-hidden": true,
            url: basePath.prepend("/".concat(navLink.icon))
          }) : undefined,
          'data-test-subj': 'navDrawerAppsMenuLink'
        };
      });
      var recentLinksArray = [{
        label: intl.formatMessage({
          id: 'core.ui.chrome.sideGlobalNav.viewRecentItemsLabel',
          defaultMessage: 'Recently viewed'
        }),
        iconType: 'clock',
        isDisabled: recentlyAccessed.length > 0 ? false : true,
        flyoutMenu: {
          title: intl.formatMessage({
            id: 'core.ui.chrome.sideGlobalNav.viewRecentItemsFlyoutTitle',
            defaultMessage: 'Recent items'
          }),
          listItems: recentlyAccessed.map(function (item) {
            return {
              label: truncateRecentItemLabel(item.label),
              title: item.title,
              'aria-label': item.title,
              href: item.href,
              iconType: item.euiIconType
            };
          })
        }
      }];
      return _react.default.createElement("header", null, _react.default.createElement(_eui.EuiHeader, null, _react.default.createElement(_eui.EuiHeaderSection, {
        grow: false
      }, _react.default.createElement(_eui.EuiShowFor, {
        sizes: ['xs', 's']
      }, _react.default.createElement(_eui.EuiHeaderSectionItem, {
        border: "right"
      }, this.renderMenuTrigger())), _react.default.createElement(_eui.EuiHeaderSectionItem, {
        border: "right"
      }, this.renderLogo()), _react.default.createElement(_header_nav_controls.HeaderNavControls, {
        side: "left",
        navControls: navControlsLeft
      })), _react.default.createElement(_header_breadcrumbs.HeaderBreadcrumbs, {
        appTitle: appTitle,
        breadcrumbs$: breadcrumbs$
      }), _react.default.createElement(_header_badge.HeaderBadge, {
        badge$: badge$
      }), _react.default.createElement(_eui.EuiHeaderSection, {
        side: "right"
      }, _react.default.createElement(_eui.EuiHeaderSectionItem, null, _react.default.createElement(_header_help_menu.HeaderHelpMenu, {
        helpExtension$: helpExtension$,
        helpSupportUrl$: helpSupportUrl$,
        kibanaDocLink: kibanaDocLink,
        kibanaVersion: kibanaVersion
      })), _react.default.createElement(_header_nav_controls.HeaderNavControls, {
        side: "right",
        navControls: navControlsRight
      }))), _react.default.createElement(_eui.EuiNavDrawer, {
        ref: this.navDrawerRef,
        "data-test-subj": "navDrawer",
        isLocked: isLocked,
        onIsLockedUpdate: onIsLockedUpdate,
        "aria-label": _i18n.i18n.translate('core.ui.primaryNav.screenReaderLabel', {
          defaultMessage: 'Primary'
        })
      }, _react.default.createElement(_eui.EuiNavDrawerGroup, {
        listItems: recentLinksArray,
        "aria-label": _i18n.i18n.translate('core.ui.recentLinks.screenReaderLabel', {
          defaultMessage: 'Recently viewed links, navigation'
        })
      }), _react.default.createElement(_eui.EuiHorizontalRule, {
        margin: "none"
      }), _react.default.createElement(_eui.EuiNavDrawerGroup, {
        "data-test-subj": "navDrawerAppsMenu",
        listItems: navLinksArray,
        "aria-label": _i18n.i18n.translate('core.ui.primaryNavList.screenReaderLabel', {
          defaultMessage: 'Primary navigation links'
        })
      })));
    }
  }]);

  return HeaderUI;
}(_react.Component);

var Header = (0, _react2.injectI18n)(HeaderUI);
exports.Header = Header;