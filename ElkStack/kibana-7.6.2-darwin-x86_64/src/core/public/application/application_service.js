"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApplicationService = void 0;

var _react = _interopRequireDefault(require("react"));

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _history = require("history");

var _ui = require("./ui");

var _capabilities = require("./capabilities");

var _types = require("./types");

var _application_leave = require("./application_leave");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// Mount functions with two arguments are assumed to expect deprecated `context` object.
var isAppMountDeprecated = function isAppMountDeprecated(mount) {
  return mount.length === 2;
};

function filterAvailable(m, capabilities) {
  return new Map(_toConsumableArray(m).filter(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 1),
        id = _ref2[0];

    return capabilities.navLinks[id] === undefined || capabilities.navLinks[id] === true;
  }));
}

var findMounter = function findMounter(mounters, appRoute) {
  return _toConsumableArray(mounters).find(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        mounter = _ref4[1];

    return mounter.appRoute === appRoute;
  });
};

var getAppUrl = function getAppUrl(mounters, appId) {
  var _ref5, _mounters$get;

  var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  return "/".concat((_ref5 = (_mounters$get = mounters.get(appId)) === null || _mounters$get === void 0 ? void 0 : _mounters$get.appRoute) !== null && _ref5 !== void 0 ? _ref5 : "/app/".concat(appId), "/").concat(path).replace(/\/{2,}/g, '/') // Remove duplicate slashes
  .replace(/\/$/, '');
}; // Remove trailing slash


var allApplicationsFilter = '__ALL__';

/**
 * Service that is responsible for registering new applications.
 * @internal
 */
var ApplicationService =
/*#__PURE__*/
function () {
  function ApplicationService() {
    var _this = this;

    _classCallCheck(this, ApplicationService);

    _defineProperty(this, "apps", new Map());

    _defineProperty(this, "mounters", new Map());

    _defineProperty(this, "capabilities", new _capabilities.CapabilitiesService());

    _defineProperty(this, "appLeaveHandlers", new Map());

    _defineProperty(this, "currentAppId$", new _rxjs.BehaviorSubject(undefined));

    _defineProperty(this, "statusUpdaters$", new _rxjs.BehaviorSubject(new Map()));

    _defineProperty(this, "subscriptions", []);

    _defineProperty(this, "stop$", new _rxjs.Subject());

    _defineProperty(this, "registrationClosed", false);

    _defineProperty(this, "history", void 0);

    _defineProperty(this, "mountContext", void 0);

    _defineProperty(this, "navigate", void 0);

    _defineProperty(this, "setAppLeaveHandler", function (appId, handler) {
      _this.appLeaveHandlers.set(appId, handler);
    });

    _defineProperty(this, "onBeforeUnload", function (event) {
      var currentAppId = _this.currentAppId$.value;

      if (currentAppId === undefined) {
        return;
      }

      var action = (0, _application_leave.getLeaveAction)(_this.appLeaveHandlers.get(currentAppId));

      if ((0, _application_leave.isConfirmAction)(action)) {
        event.preventDefault(); // some browsers accept a string return value being the message displayed

        event.returnValue = action.text;
      }
    });
  }

  _createClass(ApplicationService, [{
    key: "setup",
    value: function setup(_ref6) {
      var _this2 = this;

      var context = _ref6.context,
          basePath = _ref6.http.basePath,
          injectedMetadata = _ref6.injectedMetadata,
          _ref6$redirectTo = _ref6.redirectTo,
          redirectTo = _ref6$redirectTo === void 0 ? function (path) {
        return window.location.href = path;
      } : _ref6$redirectTo,
          history = _ref6.history;
      var basename = basePath.get(); // Only setup history if we're not in legacy mode

      if (!injectedMetadata.getLegacyMode()) {
        this.history = history || (0, _history.createBrowserHistory)({
          basename: basename
        });
      } // If we do not have history available, use redirectTo to do a full page refresh.


      this.navigate = function (url, state) {
        return (// basePath not needed here because `history` is configured with basename
          _this2.history ? _this2.history.push(url, state) : redirectTo(basePath.prepend(url))
        );
      };

      this.mountContext = context.createContextContainer();

      var registerStatusUpdater = function registerStatusUpdater(application, updater$) {
        var updaterId = Symbol();
        var subscription = updater$.subscribe(function (updater) {
          var nextValue = new Map(_this2.statusUpdaters$.getValue());
          nextValue.set(updaterId, {
            application: application,
            updater: updater
          });

          _this2.statusUpdaters$.next(nextValue);
        });

        _this2.subscriptions.push(subscription);
      };

      return {
        registerMountContext: this.mountContext.registerContext,
        register: function register(plugin, app) {
          var _app$status, _app$navLinkStatus;

          app = _objectSpread({
            appRoute: "/app/".concat(app.id)
          }, app);

          if (_this2.registrationClosed) {
            throw new Error("Applications cannot be registered after \"setup\"");
          } else if (_this2.apps.has(app.id)) {
            throw new Error("An application is already registered with the id \"".concat(app.id, "\""));
          } else if (findMounter(_this2.mounters, app.appRoute)) {
            throw new Error("An application is already registered with the appRoute \"".concat(app.appRoute, "\""));
          } else if (basename && app.appRoute.startsWith(basename)) {
            throw new Error('Cannot register an application route that includes HTTP base path');
          }

          var handler;

          if (isAppMountDeprecated(app.mount)) {
            handler = _this2.mountContext.createHandler(plugin, app.mount); // eslint-disable-next-line no-console

            console.warn("App [".concat(app.id, "] is using deprecated mount context. Use core.getStartServices() instead."));
          } else {
            handler = app.mount;
          }

          var mount = function mount(params) {
            var unmount;
            return regeneratorRuntime.async(function mount$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return regeneratorRuntime.awrap(handler(params));

                  case 2:
                    unmount = _context.sent;

                    _this2.currentAppId$.next(app.id);

                    return _context.abrupt("return", unmount);

                  case 5:
                  case "end":
                    return _context.stop();
                }
              }
            });
          };

          var _app = app,
              updater$ = _app.updater$,
              appProps = _objectWithoutProperties(_app, ["updater$"]);

          _this2.apps.set(app.id, _objectSpread({}, appProps, {
            status: (_app$status = app.status) !== null && _app$status !== void 0 ? _app$status : _types.AppStatus.accessible,
            navLinkStatus: (_app$navLinkStatus = app.navLinkStatus) !== null && _app$navLinkStatus !== void 0 ? _app$navLinkStatus : _types.AppNavLinkStatus.default,
            legacy: false
          }));

          if (updater$) {
            registerStatusUpdater(app.id, updater$);
          }

          _this2.mounters.set(app.id, {
            appRoute: app.appRoute,
            appBasePath: basePath.prepend(app.appRoute),
            mount: mount,
            unmountBeforeMounting: false
          });
        },
        registerLegacyApp: function registerLegacyApp(app) {
          var _app$status2, _app$navLinkStatus2;

          var appRoute = "/app/".concat(app.id.split(':')[0]);

          if (_this2.registrationClosed) {
            throw new Error('Applications cannot be registered after "setup"');
          } else if (_this2.apps.has(app.id)) {
            throw new Error("An application is already registered with the id \"".concat(app.id, "\""));
          } else if (basename && appRoute.startsWith(basename)) {
            throw new Error('Cannot register an application route that includes HTTP base path');
          }

          var appBasePath = basePath.prepend(appRoute);

          var mount = function mount() {
            return redirectTo(appBasePath);
          };

          var updater$ = app.updater$,
              appProps = _objectWithoutProperties(app, ["updater$"]);

          _this2.apps.set(app.id, _objectSpread({}, appProps, {
            status: (_app$status2 = app.status) !== null && _app$status2 !== void 0 ? _app$status2 : _types.AppStatus.accessible,
            navLinkStatus: (_app$navLinkStatus2 = app.navLinkStatus) !== null && _app$navLinkStatus2 !== void 0 ? _app$navLinkStatus2 : _types.AppNavLinkStatus.default,
            legacy: true
          }));

          if (updater$) {
            registerStatusUpdater(app.id, updater$);
          }

          _this2.mounters.set(app.id, {
            appRoute: appRoute,
            appBasePath: appBasePath,
            mount: mount,
            unmountBeforeMounting: true
          });
        },
        registerAppUpdater: function registerAppUpdater(appUpdater$) {
          return registerStatusUpdater(allApplicationsFilter, appUpdater$);
        }
      };
    }
  }, {
    key: "start",
    value: function start(_ref7) {
      var _this3 = this;

      var http, overlays, _ref8, capabilities, availableMounters, availableApps, applications$;

      return regeneratorRuntime.async(function start$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              http = _ref7.http, overlays = _ref7.overlays;

              if (this.mountContext) {
                _context3.next = 3;
                break;
              }

              throw new Error('ApplicationService#setup() must be invoked before start.');

            case 3:
              this.registrationClosed = true;
              window.addEventListener('beforeunload', this.onBeforeUnload);
              _context3.next = 7;
              return regeneratorRuntime.awrap(this.capabilities.start({
                appIds: _toConsumableArray(this.mounters.keys()),
                http: http
              }));

            case 7:
              _ref8 = _context3.sent;
              capabilities = _ref8.capabilities;
              availableMounters = filterAvailable(this.mounters, capabilities);
              availableApps = filterAvailable(this.apps, capabilities);
              applications$ = new _rxjs.BehaviorSubject(availableApps);
              this.statusUpdaters$.pipe((0, _operators.map)(function (statusUpdaters) {
                return new Map(_toConsumableArray(availableApps).map(function (_ref9) {
                  var _ref10 = _slicedToArray(_ref9, 2),
                      id = _ref10[0],
                      app = _ref10[1];

                  return [id, updateStatus(app, _toConsumableArray(statusUpdaters.values()))];
                }));
              })).subscribe(function (apps) {
                return applications$.next(apps);
              });
              return _context3.abrupt("return", {
                applications$: applications$,
                capabilities: capabilities,
                currentAppId$: this.currentAppId$.pipe((0, _operators.takeUntil)(this.stop$)),
                registerMountContext: this.mountContext.registerContext,
                getUrlForApp: function getUrlForApp(appId) {
                  var _ref11 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                      path = _ref11.path;

                  return http.basePath.prepend(getAppUrl(availableMounters, appId, path));
                },
                navigateToApp: function navigateToApp(appId) {
                  var _ref12,
                      path,
                      state,
                      app,
                      _args2 = arguments;

                  return regeneratorRuntime.async(function navigateToApp$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          _ref12 = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {}, path = _ref12.path, state = _ref12.state;
                          app = applications$.value.get(appId);

                          if (!(app && app.status !== _types.AppStatus.accessible)) {
                            _context2.next = 4;
                            break;
                          }

                          throw new Error("Trying to navigate to an inaccessible application: ".concat(appId));

                        case 4:
                          _context2.next = 6;
                          return regeneratorRuntime.awrap(_this3.shouldNavigate(overlays));

                        case 6:
                          if (!_context2.sent) {
                            _context2.next = 10;
                            break;
                          }

                          _this3.appLeaveHandlers.delete(_this3.currentAppId$.value);

                          _this3.navigate(getAppUrl(availableMounters, appId, path), state);

                          _this3.currentAppId$.next(appId);

                        case 10:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  });
                },
                getComponent: function getComponent() {
                  if (!_this3.history) {
                    return null;
                  }

                  return _react.default.createElement(_ui.AppRouter, {
                    history: _this3.history,
                    mounters: availableMounters,
                    setAppLeaveHandler: _this3.setAppLeaveHandler
                  });
                }
              });

            case 14:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "shouldNavigate",
    value: function shouldNavigate(overlays) {
      var currentAppId, action, confirmed;
      return regeneratorRuntime.async(function shouldNavigate$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              currentAppId = this.currentAppId$.value;

              if (!(currentAppId === undefined)) {
                _context4.next = 3;
                break;
              }

              return _context4.abrupt("return", true);

            case 3:
              action = (0, _application_leave.getLeaveAction)(this.appLeaveHandlers.get(currentAppId));

              if (!(0, _application_leave.isConfirmAction)(action)) {
                _context4.next = 10;
                break;
              }

              _context4.next = 7;
              return regeneratorRuntime.awrap(overlays.openConfirm(action.text, {
                title: action.title,
                'data-test-subj': 'appLeaveConfirmModal'
              }));

            case 7:
              confirmed = _context4.sent;

              if (confirmed) {
                _context4.next = 10;
                break;
              }

              return _context4.abrupt("return", false);

            case 10:
              return _context4.abrupt("return", true);

            case 11:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "stop",
    value: function stop() {
      this.stop$.next();
      this.currentAppId$.complete();
      this.statusUpdaters$.complete();
      this.subscriptions.forEach(function (sub) {
        return sub.unsubscribe();
      });
      window.removeEventListener('beforeunload', this.onBeforeUnload);
    }
  }]);

  return ApplicationService;
}();

exports.ApplicationService = ApplicationService;

var updateStatus = function updateStatus(app, statusUpdaters) {
  var changes = {};
  statusUpdaters.forEach(function (wrapper) {
    if (wrapper.application !== allApplicationsFilter && wrapper.application !== app.id) {
      return;
    }

    var fields = wrapper.updater(app);

    if (fields) {
      var _changes$status, _fields$status, _changes$navLinkStatu, _fields$navLinkStatus;

      changes = _objectSpread({}, changes, {}, fields, {
        // status and navLinkStatus enums are ordered by reversed priority
        // if multiple updaters wants to change these fields, we will always follow the priority order.
        status: Math.max((_changes$status = changes.status) !== null && _changes$status !== void 0 ? _changes$status : 0, (_fields$status = fields.status) !== null && _fields$status !== void 0 ? _fields$status : 0),
        navLinkStatus: Math.max((_changes$navLinkStatu = changes.navLinkStatus) !== null && _changes$navLinkStatu !== void 0 ? _changes$navLinkStatu : 0, (_fields$navLinkStatus = fields.navLinkStatus) !== null && _fields$navLinkStatus !== void 0 ? _fields$navLinkStatus : 0)
      });
    }
  });
  return _objectSpread({}, app, {}, changes);
};