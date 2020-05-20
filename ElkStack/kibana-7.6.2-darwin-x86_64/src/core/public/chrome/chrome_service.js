"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ChromeRecentlyAccessed", {
  enumerable: true,
  get: function get() {
    return _recently_accessed.ChromeRecentlyAccessed;
  }
});
Object.defineProperty(exports, "ChromeNavControls", {
  enumerable: true,
  get: function get() {
    return _nav_controls.ChromeNavControls;
  }
});
Object.defineProperty(exports, "ChromeDocTitle", {
  enumerable: true,
  get: function get() {
    return _doc_title.ChromeDocTitle;
  }
});
exports.ChromeService = void 0;

var _react = _interopRequireDefault(require("react"));

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _url = require("url");

var _i18n = require("@kbn/i18n");

var _nav_links = require("./nav_links");

var _recently_accessed = require("./recently_accessed");

var _nav_controls = require("./nav_controls");

var _doc_title = require("./doc_title");

var _ui = require("./ui");

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var IS_COLLAPSED_KEY = 'core.chrome.isCollapsed';
/** @public */

/** @internal */
var ChromeService =
/*#__PURE__*/
function () {
  function ChromeService(params) {
    _classCallCheck(this, ChromeService);

    this.params = params;

    _defineProperty(this, "isVisible$", void 0);

    _defineProperty(this, "appHidden$", void 0);

    _defineProperty(this, "toggleHidden$", void 0);

    _defineProperty(this, "stop$", new _rxjs.ReplaySubject(1));

    _defineProperty(this, "navControls", new _nav_controls.NavControlsService());

    _defineProperty(this, "navLinks", new _nav_links.NavLinksService());

    _defineProperty(this, "recentlyAccessed", new _recently_accessed.RecentlyAccessedService());

    _defineProperty(this, "docTitle", new _doc_title.DocTitleService());
  }
  /**
   * These observables allow consumers to toggle the chrome visibility via either:
   *   1. Using setIsVisible() to trigger the next chromeHidden$
   *   2. Setting `chromeless` when registering an application, which will
   *      reset the visibility whenever the next application is mounted
   *   3. Having "embed" in the query string
   */


  _createClass(ChromeService, [{
    key: "initVisibility",
    value: function initVisibility(application) {
      // Start off the chrome service hidden if "embed" is in the hash query string.
      var isEmbedded = 'embed' in (0, _url.parse)(location.hash.slice(1), true).query;
      this.toggleHidden$ = new _rxjs.BehaviorSubject(isEmbedded);
      this.appHidden$ = (0, _rxjs.merge)( // Default the app being hidden to the same value initial value as the chrome visibility
      // in case the application service has not emitted an app ID yet, since we want to trigger
      // combineLatest below regardless of having an application value yet.
      (0, _rxjs.of)(isEmbedded), application.currentAppId$.pipe((0, _operators.flatMap)(function (appId) {
        return application.applications$.pipe((0, _operators.map)(function (applications) {
          return !!appId && applications.has(appId) && !!applications.get(appId).chromeless;
        }));
      })));
      this.isVisible$ = (0, _rxjs.combineLatest)([this.appHidden$, this.toggleHidden$]).pipe((0, _operators.map)(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            appHidden = _ref2[0],
            toggleHidden = _ref2[1];

        return !(appHidden || toggleHidden);
      }), (0, _operators.takeUntil)(this.stop$));
    }
  }, {
    key: "start",
    value: function start(_ref3) {
      var _this = this;

      var application, docLinks, http, injectedMetadata, notifications, appTitle$, brand$, isCollapsed$, applicationClasses$, helpExtension$, breadcrumbs$, badge$, helpSupportUrl$, navControls, navLinks, recentlyAccessed, docTitle;
      return regeneratorRuntime.async(function start$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              application = _ref3.application, docLinks = _ref3.docLinks, http = _ref3.http, injectedMetadata = _ref3.injectedMetadata, notifications = _ref3.notifications;
              this.initVisibility(application);
              appTitle$ = new _rxjs.BehaviorSubject('Kibana');
              brand$ = new _rxjs.BehaviorSubject({});
              isCollapsed$ = new _rxjs.BehaviorSubject(!!localStorage.getItem(IS_COLLAPSED_KEY));
              applicationClasses$ = new _rxjs.BehaviorSubject(new Set());
              helpExtension$ = new _rxjs.BehaviorSubject(undefined);
              breadcrumbs$ = new _rxjs.BehaviorSubject([]);
              badge$ = new _rxjs.BehaviorSubject(undefined);
              helpSupportUrl$ = new _rxjs.BehaviorSubject(_constants.KIBANA_ASK_ELASTIC_LINK);
              navControls = this.navControls.start();
              navLinks = this.navLinks.start({
                application: application,
                http: http
              });
              _context.next = 14;
              return regeneratorRuntime.awrap(this.recentlyAccessed.start({
                http: http
              }));

            case 14:
              recentlyAccessed = _context.sent;
              docTitle = this.docTitle.start({
                document: window.document
              });

              if (!this.params.browserSupportsCsp && injectedMetadata.getCspConfig().warnLegacyBrowsers) {
                notifications.toasts.addWarning(_i18n.i18n.translate('core.chrome.legacyBrowserWarning', {
                  defaultMessage: 'Your browser does not meet the security requirements for Kibana.'
                }));
              }

              return _context.abrupt("return", {
                navControls: navControls,
                navLinks: navLinks,
                recentlyAccessed: recentlyAccessed,
                docTitle: docTitle,
                getHeaderComponent: function getHeaderComponent() {
                  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_ui.LoadingIndicator, {
                    loadingCount$: http.getLoadingCount$()
                  }), _react.default.createElement(_ui.HeaderWrapper, {
                    application: application,
                    appTitle$: appTitle$.pipe((0, _operators.takeUntil)(_this.stop$)),
                    badge$: badge$.pipe((0, _operators.takeUntil)(_this.stop$)),
                    basePath: http.basePath,
                    breadcrumbs$: breadcrumbs$.pipe((0, _operators.takeUntil)(_this.stop$)),
                    kibanaDocLink: docLinks.links.kibana,
                    forceAppSwitcherNavigation$: navLinks.getForceAppSwitcherNavigation$(),
                    helpExtension$: helpExtension$.pipe((0, _operators.takeUntil)(_this.stop$)),
                    helpSupportUrl$: helpSupportUrl$.pipe((0, _operators.takeUntil)(_this.stop$)),
                    homeHref: http.basePath.prepend('/app/kibana#/home'),
                    isVisible$: _this.isVisible$,
                    kibanaVersion: injectedMetadata.getKibanaVersion(),
                    legacyMode: injectedMetadata.getLegacyMode(),
                    navLinks$: navLinks.getNavLinks$(),
                    recentlyAccessed$: recentlyAccessed.get$(),
                    navControlsLeft$: navControls.getLeft$(),
                    navControlsRight$: navControls.getRight$()
                  }));
                },
                setAppTitle: function setAppTitle(appTitle) {
                  return appTitle$.next(appTitle);
                },
                getBrand$: function getBrand$() {
                  return brand$.pipe((0, _operators.takeUntil)(_this.stop$));
                },
                setBrand: function setBrand(brand) {
                  brand$.next(Object.freeze({
                    logo: brand.logo,
                    smallLogo: brand.smallLogo
                  }));
                },
                getIsVisible$: function getIsVisible$() {
                  return _this.isVisible$;
                },
                setIsVisible: function setIsVisible(isVisible) {
                  return _this.toggleHidden$.next(!isVisible);
                },
                getIsCollapsed$: function getIsCollapsed$() {
                  return isCollapsed$.pipe((0, _operators.takeUntil)(_this.stop$));
                },
                setIsCollapsed: function setIsCollapsed(isCollapsed) {
                  isCollapsed$.next(isCollapsed);

                  if (isCollapsed) {
                    localStorage.setItem(IS_COLLAPSED_KEY, 'true');
                  } else {
                    localStorage.removeItem(IS_COLLAPSED_KEY);
                  }
                },
                getApplicationClasses$: function getApplicationClasses$() {
                  return applicationClasses$.pipe((0, _operators.map)(function (set) {
                    return _toConsumableArray(set);
                  }), (0, _operators.takeUntil)(_this.stop$));
                },
                addApplicationClass: function addApplicationClass(className) {
                  var update = new Set(_toConsumableArray(applicationClasses$.getValue()));
                  update.add(className);
                  applicationClasses$.next(update);
                },
                removeApplicationClass: function removeApplicationClass(className) {
                  var update = new Set(_toConsumableArray(applicationClasses$.getValue()));
                  update.delete(className);
                  applicationClasses$.next(update);
                },
                getBadge$: function getBadge$() {
                  return badge$.pipe((0, _operators.takeUntil)(_this.stop$));
                },
                setBadge: function setBadge(badge) {
                  badge$.next(badge);
                },
                getBreadcrumbs$: function getBreadcrumbs$() {
                  return breadcrumbs$.pipe((0, _operators.takeUntil)(_this.stop$));
                },
                setBreadcrumbs: function setBreadcrumbs(newBreadcrumbs) {
                  breadcrumbs$.next(newBreadcrumbs);
                },
                getHelpExtension$: function getHelpExtension$() {
                  return helpExtension$.pipe((0, _operators.takeUntil)(_this.stop$));
                },
                setHelpExtension: function setHelpExtension(helpExtension) {
                  helpExtension$.next(helpExtension);
                },
                setHelpSupportUrl: function setHelpSupportUrl(url) {
                  return helpSupportUrl$.next(url);
                }
              });

            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "stop",
    value: function stop() {
      this.navLinks.stop();
      this.stop$.next();
    }
  }]);

  return ChromeService;
}();
/**
 * ChromeStart allows plugins to customize the global chrome header UI and
 * enrich the UX with additional information about the current location of the
 * browser.
 *
 * @remarks
 * While ChromeStart exposes many APIs, they should be used sparingly and the
 * developer should understand how they affect other plugins and applications.
 *
 * @example
 * How to add a recently accessed item to the sidebar:
 * ```ts
 * core.chrome.recentlyAccessed.add('/app/map/1234', 'Map 1234', '1234');
 * ```
 *
 * @example
 * How to set the help dropdown extension:
 * ```tsx
 * core.chrome.setHelpExtension(elem => {
 *   ReactDOM.render(<MyHelpComponent />, elem);
 *   return () => ReactDOM.unmountComponentAtNode(elem);
 * });
 * ```
 *
 * @public
 */


exports.ChromeService = ChromeService;