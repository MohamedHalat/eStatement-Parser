"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DashboardPlugin = void 0;

var _i18n = require("@kbn/i18n");

var _public = require("../../../../../plugins/kibana_utils/public");

var _dashboard_constants = require("./np_ready/dashboard_constants");

var _public2 = require("../../../../../plugins/home/public");

var _saved_dashboards = require("./saved_dashboard/saved_dashboards");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DashboardPlugin =
/*#__PURE__*/
function () {
  function DashboardPlugin() {
    _classCallCheck(this, DashboardPlugin);

    _defineProperty(this, "startDependencies", null);
  }

  _createClass(DashboardPlugin, [{
    key: "setup",
    value: function setup(core, _ref) {
      var _this = this;

      var getAngularDependencies = _ref.__LEGACY.getAngularDependencies,
          home = _ref.home,
          kibana_legacy = _ref.kibana_legacy;
      var app = {
        id: '',
        title: 'Dashboards',
        mount: function mount(_ref2, params) {
          var contextCore, _this$startDependenci, savedObjectsClient, embeddables, navigation, share, npDataStart, angularDependencies, savedDashboards, deps, _ref3, renderApp;

          return regeneratorRuntime.async(function mount$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  contextCore = _ref2.core;

                  if (!(_this.startDependencies === null)) {
                    _context.next = 3;
                    break;
                  }

                  throw new Error('not started yet');

                case 3:
                  _this$startDependenci = _this.startDependencies, savedObjectsClient = _this$startDependenci.savedObjectsClient, embeddables = _this$startDependenci.embeddables, navigation = _this$startDependenci.navigation, share = _this$startDependenci.share, npDataStart = _this$startDependenci.npDataStart;
                  _context.next = 6;
                  return regeneratorRuntime.awrap(getAngularDependencies());

                case 6:
                  angularDependencies = _context.sent;
                  savedDashboards = (0, _saved_dashboards.createSavedDashboardLoader)({
                    savedObjectsClient: savedObjectsClient,
                    indexPatterns: npDataStart.indexPatterns,
                    chrome: contextCore.chrome,
                    overlays: contextCore.overlays
                  });
                  deps = _objectSpread({
                    core: contextCore
                  }, angularDependencies, {
                    navigation: navigation,
                    share: share,
                    npDataStart: npDataStart,
                    savedObjectsClient: savedObjectsClient,
                    savedDashboards: savedDashboards,
                    chrome: contextCore.chrome,
                    addBasePath: contextCore.http.basePath.prepend,
                    uiSettings: contextCore.uiSettings,
                    savedQueryService: npDataStart.query.savedQueries,
                    embeddables: embeddables,
                    dashboardCapabilities: contextCore.application.capabilities.dashboard,
                    localStorage: new _public.Storage(localStorage)
                  });
                  _context.next = 11;
                  return regeneratorRuntime.awrap(import('./np_ready/application'));

                case 11:
                  _ref3 = _context.sent;
                  renderApp = _ref3.renderApp;
                  return _context.abrupt("return", renderApp(params.element, params.appBasePath, deps));

                case 14:
                case "end":
                  return _context.stop();
              }
            }
          });
        }
      };
      kibana_legacy.registerLegacyApp(_objectSpread({}, app, {
        id: 'dashboard'
      }));
      kibana_legacy.registerLegacyApp(_objectSpread({}, app, {
        id: 'dashboards'
      }));
      home.featureCatalogue.register({
        id: 'dashboard',
        title: _i18n.i18n.translate('kbn.dashboard.featureCatalogue.dashboardTitle', {
          defaultMessage: 'Dashboard'
        }),
        description: _i18n.i18n.translate('kbn.dashboard.featureCatalogue.dashboardDescription', {
          defaultMessage: 'Display and share a collection of visualizations and saved searches.'
        }),
        icon: 'dashboardApp',
        path: "/app/kibana#".concat(_dashboard_constants.DashboardConstants.LANDING_PAGE_PATH),
        showOnHomePage: true,
        category: _public2.FeatureCatalogueCategory.DATA
      });
    }
  }, {
    key: "start",
    value: function start(_ref4, _ref5) {
      var savedObjectsClient = _ref4.savedObjects.client;
      var dataStart = _ref5.data,
          embeddables = _ref5.embeddables,
          navigation = _ref5.navigation,
          npData = _ref5.npData,
          share = _ref5.share;
      this.startDependencies = {
        npDataStart: npData,
        savedObjectsClient: savedObjectsClient,
        embeddables: embeddables,
        navigation: navigation,
        share: share
      };
    }
  }]);

  return DashboardPlugin;
}();

exports.DashboardPlugin = DashboardPlugin;