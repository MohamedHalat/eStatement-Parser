"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisualizePlugin = void 0;

var _i18n = require("@kbn/i18n");

var _public = require("../../../../../plugins/kibana_utils/public");

var _visualize_constants = require("./np_ready/visualize_constants");

var _kibana_services = require("./kibana_services");

var _public2 = require("../../../../../plugins/home/public");

var _legacy_imports = require("./legacy_imports");

var _saved_visualizations = require("./saved_visualizations/saved_visualizations");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VisualizePlugin =
/*#__PURE__*/
function () {
  function VisualizePlugin() {
    _classCallCheck(this, VisualizePlugin);

    _defineProperty(this, "startDependencies", null);
  }

  _createClass(VisualizePlugin, [{
    key: "setup",
    value: function setup(core, _ref) {
      var _this = this;

      var home, kibana_legacy, getAngularDependencies, usageCollection;
      return regeneratorRuntime.async(function setup$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              home = _ref.home, kibana_legacy = _ref.kibana_legacy, getAngularDependencies = _ref.__LEGACY.getAngularDependencies, usageCollection = _ref.usageCollection;
              kibana_legacy.registerLegacyApp({
                id: 'visualize',
                title: 'Visualize',
                mount: function mount(_ref2, params) {
                  var contextCore, _this$startDependenci, savedObjectsClient, embeddables, navigation, visualizations, data, share, angularDependencies, savedVisualizations, deps, _ref3, renderApp;

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
                          _this$startDependenci = _this.startDependencies, savedObjectsClient = _this$startDependenci.savedObjectsClient, embeddables = _this$startDependenci.embeddables, navigation = _this$startDependenci.navigation, visualizations = _this$startDependenci.visualizations, data = _this$startDependenci.data, share = _this$startDependenci.share;
                          _context.next = 6;
                          return regeneratorRuntime.awrap(getAngularDependencies());

                        case 6:
                          angularDependencies = _context.sent;
                          savedVisualizations = (0, _saved_visualizations.createSavedVisLoader)({
                            savedObjectsClient: savedObjectsClient,
                            indexPatterns: data.indexPatterns,
                            chrome: contextCore.chrome,
                            overlays: contextCore.overlays
                          });
                          deps = _objectSpread({}, angularDependencies, {
                            addBasePath: contextCore.http.basePath.prepend,
                            core: contextCore,
                            chrome: contextCore.chrome,
                            data: data,
                            embeddables: embeddables,
                            getBasePath: core.http.basePath.get,
                            indexPatterns: data.indexPatterns,
                            localStorage: new _public.Storage(localStorage),
                            navigation: navigation,
                            savedObjectsClient: savedObjectsClient,
                            savedVisualizations: savedVisualizations,
                            savedQueryService: data.query.savedQueries,
                            share: share,
                            toastNotifications: contextCore.notifications.toasts,
                            uiSettings: contextCore.uiSettings,
                            visualizeCapabilities: contextCore.application.capabilities.visualize,
                            visualizations: visualizations,
                            usageCollection: usageCollection
                          });
                          (0, _kibana_services.setServices)(deps);
                          _context.next = 12;
                          return regeneratorRuntime.awrap(import('./np_ready/application'));

                        case 12:
                          _ref3 = _context.sent;
                          renderApp = _ref3.renderApp;
                          return _context.abrupt("return", renderApp(params.element, params.appBasePath, deps));

                        case 15:
                        case "end":
                          return _context.stop();
                      }
                    }
                  });
                }
              });
              home.featureCatalogue.register({
                id: 'visualize',
                title: 'Visualize',
                description: _i18n.i18n.translate('kbn.visualize.visualizeDescription', {
                  defaultMessage: 'Create visualizations and aggregate data stores in your Elasticsearch indices.'
                }),
                icon: 'visualizeApp',
                path: "/app/kibana#".concat(_visualize_constants.VisualizeConstants.LANDING_PAGE_PATH),
                showOnHomePage: true,
                category: _public2.FeatureCatalogueCategory.DATA
              });

              _legacy_imports.VisEditorTypesRegistryProvider.register(_legacy_imports.defaultEditor);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }, {
    key: "start",
    value: function start(_ref4, _ref5) {
      var savedObjectsClient = _ref4.savedObjects.client;
      var embeddables = _ref5.embeddables,
          navigation = _ref5.navigation,
          data = _ref5.data,
          share = _ref5.share,
          visualizations = _ref5.visualizations;
      this.startDependencies = {
        data: data,
        embeddables: embeddables,
        navigation: navigation,
        savedObjectsClient: savedObjectsClient,
        share: share,
        visualizations: visualizations
      };
      var embeddableFactory = new _legacy_imports.VisualizeEmbeddableFactory(visualizations.types);
      embeddables.registerEmbeddableFactory(_legacy_imports.VISUALIZE_EMBEDDABLE_TYPE, embeddableFactory);
    }
  }]);

  return VisualizePlugin;
}();

exports.VisualizePlugin = VisualizePlugin;