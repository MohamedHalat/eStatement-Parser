"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CoreSystem = void 0;

require("./core.css");

var _chrome = require("./chrome");

var _fatal_errors = require("./fatal_errors");

var _http2 = require("./http");

var _i18n = require("./i18n");

var _injected_metadata = require("./injected_metadata");

var _legacy = require("./legacy");

var _notifications2 = require("./notifications");

var _overlays = require("./overlays");

var _plugins2 = require("./plugins");

var _ui_settings = require("./ui_settings");

var _application2 = require("./application");

var _utils = require("../utils/");

var _doc_links = require("./doc_links");

var _rendering = require("./rendering");

var _saved_objects = require("./saved_objects");

var _context3 = require("./context");

var _integrations = require("./integrations");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * The CoreSystem is the root of the new platform, and setups all parts
 * of Kibana in the UI, including the LegacyPlatform which is managed
 * by the LegacyPlatformService. As we migrate more things to the new
 * platform the CoreSystem will get many more Services.
 *
 * @internal
 */
var CoreSystem =
/*#__PURE__*/
function () {
  function CoreSystem(params) {
    var _this = this;

    _classCallCheck(this, CoreSystem);

    _defineProperty(this, "fatalErrors", void 0);

    _defineProperty(this, "injectedMetadata", void 0);

    _defineProperty(this, "legacy", void 0);

    _defineProperty(this, "notifications", void 0);

    _defineProperty(this, "http", void 0);

    _defineProperty(this, "savedObjects", void 0);

    _defineProperty(this, "uiSettings", void 0);

    _defineProperty(this, "chrome", void 0);

    _defineProperty(this, "i18n", void 0);

    _defineProperty(this, "overlay", void 0);

    _defineProperty(this, "plugins", void 0);

    _defineProperty(this, "application", void 0);

    _defineProperty(this, "docLinks", void 0);

    _defineProperty(this, "rendering", void 0);

    _defineProperty(this, "context", void 0);

    _defineProperty(this, "integrations", void 0);

    _defineProperty(this, "rootDomElement", void 0);

    _defineProperty(this, "coreContext", void 0);

    _defineProperty(this, "fatalErrorsSetup", null);

    var rootDomElement = params.rootDomElement,
        browserSupportsCsp = params.browserSupportsCsp,
        injectedMetadata = params.injectedMetadata,
        requireLegacyFiles = params.requireLegacyFiles,
        useLegacyTestHarness = params.useLegacyTestHarness;
    this.rootDomElement = rootDomElement;
    this.i18n = new _i18n.I18nService();
    this.injectedMetadata = new _injected_metadata.InjectedMetadataService({
      injectedMetadata: injectedMetadata
    });
    this.fatalErrors = new _fatal_errors.FatalErrorsService(rootDomElement, function () {
      // Stop Core before rendering any fatal errors into the DOM
      _this.stop();
    });
    this.notifications = new _notifications2.NotificationsService();
    this.http = new _http2.HttpService();
    this.savedObjects = new _saved_objects.SavedObjectsService();
    this.uiSettings = new _ui_settings.UiSettingsService();
    this.overlay = new _overlays.OverlayService();
    this.chrome = new _chrome.ChromeService({
      browserSupportsCsp: browserSupportsCsp
    });
    this.docLinks = new _doc_links.DocLinksService();
    this.rendering = new _rendering.RenderingService();
    this.application = new _application2.ApplicationService();
    this.integrations = new _integrations.IntegrationsService();
    this.coreContext = {
      coreId: Symbol('core'),
      env: injectedMetadata.env
    };
    this.context = new _context3.ContextService(this.coreContext);
    this.plugins = new _plugins2.PluginsService(this.coreContext, injectedMetadata.uiPlugins);
    this.legacy = new _legacy.LegacyPlatformService({
      requireLegacyFiles: requireLegacyFiles,
      useLegacyTestHarness: useLegacyTestHarness
    });
  }

  _createClass(CoreSystem, [{
    key: "setup",
    value: function setup() {
      var injectedMetadata, http, uiSettings, notifications, pluginDependencies, context, application, core, plugins;
      return regeneratorRuntime.async(function setup$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              // Setup FatalErrorsService and it's dependencies first so that we're
              // able to render any errors.
              injectedMetadata = this.injectedMetadata.setup();
              this.fatalErrorsSetup = this.fatalErrors.setup({
                injectedMetadata: injectedMetadata,
                i18n: this.i18n.getContext()
              });
              _context.next = 5;
              return regeneratorRuntime.awrap(this.integrations.setup());

            case 5:
              http = this.http.setup({
                injectedMetadata: injectedMetadata,
                fatalErrors: this.fatalErrorsSetup
              });
              uiSettings = this.uiSettings.setup({
                http: http,
                injectedMetadata: injectedMetadata
              });
              notifications = this.notifications.setup({
                uiSettings: uiSettings
              });
              pluginDependencies = this.plugins.getOpaqueIds();
              context = this.context.setup({
                // We inject a fake "legacy plugin" with dependencies on every plugin so that legacy plugins:
                // 1) Can access context from any NP plugin
                // 2) Can register context providers that will only be available to other legacy plugins and will not leak into
                //    New Platform plugins.
                pluginDependencies: new Map([].concat(_toConsumableArray(pluginDependencies), [[this.legacy.legacyId, _toConsumableArray(pluginDependencies.keys())]]))
              });
              application = this.application.setup({
                context: context,
                http: http,
                injectedMetadata: injectedMetadata
              });
              core = {
                application: application,
                context: context,
                fatalErrors: this.fatalErrorsSetup,
                http: http,
                injectedMetadata: injectedMetadata,
                notifications: notifications,
                uiSettings: uiSettings
              }; // Services that do not expose contracts at setup

              _context.next = 14;
              return regeneratorRuntime.awrap(this.plugins.setup(core));

            case 14:
              plugins = _context.sent;
              _context.next = 17;
              return regeneratorRuntime.awrap(this.legacy.setup({
                core: core,
                plugins: (0, _utils.mapToObject)(plugins.contracts)
              }));

            case 17:
              return _context.abrupt("return", {
                fatalErrors: this.fatalErrorsSetup
              });

            case 20:
              _context.prev = 20;
              _context.t0 = _context["catch"](0);

              if (this.fatalErrorsSetup) {
                this.fatalErrorsSetup.add(_context.t0);
              } else {
                // If the FatalErrorsService has not yet been setup, log error to console
                // eslint-disable-next-line no-console
                console.log(_context.t0);
              }

            case 23:
            case "end":
              return _context.stop();
          }
        }
      }, null, this, [[0, 20]]);
    }
  }, {
    key: "start",
    value: function start() {
      var _injectedMetadata, _uiSettings, docLinks, _http, savedObjects, i18n, coreUiTargetDomElement, notificationsTargetDomElement, overlayTargetDomElement, overlays, _notifications, _application, chrome, _core, _plugins, rendering;

      return regeneratorRuntime.async(function start$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return regeneratorRuntime.awrap(this.injectedMetadata.start());

            case 3:
              _injectedMetadata = _context2.sent;
              _context2.next = 6;
              return regeneratorRuntime.awrap(this.uiSettings.start());

            case 6:
              _uiSettings = _context2.sent;
              _context2.next = 9;
              return regeneratorRuntime.awrap(this.docLinks.start({
                injectedMetadata: _injectedMetadata
              }));

            case 9:
              docLinks = _context2.sent;
              _context2.next = 12;
              return regeneratorRuntime.awrap(this.http.start());

            case 12:
              _http = _context2.sent;
              _context2.next = 15;
              return regeneratorRuntime.awrap(this.savedObjects.start({
                http: _http
              }));

            case 15:
              savedObjects = _context2.sent;
              _context2.next = 18;
              return regeneratorRuntime.awrap(this.i18n.start());

            case 18:
              i18n = _context2.sent;
              _context2.next = 21;
              return regeneratorRuntime.awrap(this.integrations.start({
                uiSettings: _uiSettings
              }));

            case 21:
              coreUiTargetDomElement = document.createElement('div');
              coreUiTargetDomElement.id = 'kibana-body';
              notificationsTargetDomElement = document.createElement('div');
              overlayTargetDomElement = document.createElement('div');
              overlays = this.overlay.start({
                i18n: i18n,
                targetDomElement: overlayTargetDomElement,
                uiSettings: _uiSettings
              });
              _context2.next = 28;
              return regeneratorRuntime.awrap(this.notifications.start({
                i18n: i18n,
                overlays: overlays,
                targetDomElement: notificationsTargetDomElement
              }));

            case 28:
              _notifications = _context2.sent;
              _context2.next = 31;
              return regeneratorRuntime.awrap(this.application.start({
                http: _http,
                overlays: overlays
              }));

            case 31:
              _application = _context2.sent;
              _context2.next = 34;
              return regeneratorRuntime.awrap(this.chrome.start({
                application: _application,
                docLinks: docLinks,
                http: _http,
                injectedMetadata: _injectedMetadata,
                notifications: _notifications
              }));

            case 34:
              chrome = _context2.sent;

              _application.registerMountContext(this.coreContext.coreId, 'core', function () {
                return {
                  application: (0, _utils.pick)(_application, ['capabilities', 'navigateToApp']),
                  chrome: chrome,
                  docLinks: docLinks,
                  http: _http,
                  i18n: i18n,
                  injectedMetadata: (0, _utils.pick)(_injectedMetadata, ['getInjectedVar']),
                  notifications: _notifications,
                  overlays: overlays,
                  savedObjects: savedObjects,
                  uiSettings: _uiSettings
                };
              });

              _core = {
                application: _application,
                chrome: chrome,
                docLinks: docLinks,
                http: _http,
                savedObjects: savedObjects,
                i18n: i18n,
                injectedMetadata: _injectedMetadata,
                notifications: _notifications,
                overlays: overlays,
                uiSettings: _uiSettings
              };
              _context2.next = 39;
              return regeneratorRuntime.awrap(this.plugins.start(_core));

            case 39:
              _plugins = _context2.sent;
              // ensure the rootDomElement is empty
              this.rootDomElement.textContent = '';
              this.rootDomElement.classList.add('coreSystemRootDomElement');
              this.rootDomElement.appendChild(coreUiTargetDomElement);
              this.rootDomElement.appendChild(notificationsTargetDomElement);
              this.rootDomElement.appendChild(overlayTargetDomElement);
              rendering = this.rendering.start({
                application: _application,
                chrome: chrome,
                injectedMetadata: _injectedMetadata,
                overlays: overlays,
                targetDomElement: coreUiTargetDomElement
              });
              _context2.next = 48;
              return regeneratorRuntime.awrap(this.legacy.start({
                core: _core,
                plugins: (0, _utils.mapToObject)(_plugins.contracts),
                targetDomElement: rendering.legacyTargetDomElement
              }));

            case 48:
              _context2.next = 53;
              break;

            case 50:
              _context2.prev = 50;
              _context2.t0 = _context2["catch"](0);

              if (this.fatalErrorsSetup) {
                this.fatalErrorsSetup.add(_context2.t0);
              } else {
                // If the FatalErrorsService has not yet been setup, log error to console
                // eslint-disable-next-line no-console
                console.error(_context2.t0);
              }

            case 53:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this, [[0, 50]]);
    }
  }, {
    key: "stop",
    value: function stop() {
      this.legacy.stop();
      this.plugins.stop();
      this.notifications.stop();
      this.http.stop();
      this.integrations.stop();
      this.uiSettings.stop();
      this.chrome.stop();
      this.i18n.stop();
      this.application.stop();
      this.rootDomElement.textContent = '';
    }
  }]);

  return CoreSystem;
}();

exports.CoreSystem = CoreSystem;