"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DiscoverPlugin = void 0;

var _i18n = require("@kbn/i18n");

var _angular = _interopRequireDefault(require("angular"));

var _register_feature = require("./np_ready/register_feature");

var _kibana_services = require("./kibana_services");

var _get_inner_angular = require("./get_inner_angular");

var _build_services = require("./build_services");

var _doc_views_registry = require("./np_ready/doc_views/doc_views_registry");

var _table = require("./np_ready/components/table/table");

var _json_code_block = require("./np_ready/components/json_code_block/json_code_block");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var innerAngularName = 'app/discover';
var embeddableAngularName = 'app/discoverEmbeddable';
/**
 * Contains Discover, one of the oldest parts of Kibana
 * There are 2 kinds of Angular bootstrapped for rendering, additionally to the main Angular
 * Discover provides embeddables, those contain a slimmer Angular
 */

var DiscoverPlugin =
/*#__PURE__*/
function () {
  function DiscoverPlugin() {
    _classCallCheck(this, DiscoverPlugin);

    _defineProperty(this, "servicesInitialized", false);

    _defineProperty(this, "innerAngularInitialized", false);

    _defineProperty(this, "docViewsRegistry", null);

    _defineProperty(this, "initializeInnerAngular", void 0);

    _defineProperty(this, "initializeServices", void 0);
  }

  _createClass(DiscoverPlugin, [{
    key: "setup",
    value: function setup(core, plugins) {
      var _this = this;

      this.docViewsRegistry = new _doc_views_registry.DocViewsRegistry(plugins.__LEGACY.chrome);
      this.docViewsRegistry.addDocView({
        title: _i18n.i18n.translate('kbn.discover.docViews.table.tableTitle', {
          defaultMessage: 'Table'
        }),
        order: 10,
        component: _table.DocViewTable
      });
      this.docViewsRegistry.addDocView({
        title: _i18n.i18n.translate('kbn.discover.docViews.json.jsonTitle', {
          defaultMessage: 'JSON'
        }),
        order: 20,
        component: _json_code_block.JsonCodeBlock
      });
      plugins.kibana_legacy.registerLegacyApp({
        id: 'discover',
        title: 'Discover',
        order: -1004,
        euiIconType: 'discoverApp',
        mount: function mount(params) {
          var _ref, renderApp;

          return regeneratorRuntime.async(function mount$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (_this.initializeServices) {
                    _context.next = 2;
                    break;
                  }

                  throw Error('Discover plugin method initializeServices is undefined');

                case 2:
                  if (_this.initializeInnerAngular) {
                    _context.next = 4;
                    break;
                  }

                  throw Error('Discover plugin method initializeInnerAngular is undefined');

                case 4:
                  _context.next = 6;
                  return regeneratorRuntime.awrap(_this.initializeServices());

                case 6:
                  _context.next = 8;
                  return regeneratorRuntime.awrap(_this.initializeInnerAngular());

                case 8:
                  _context.next = 10;
                  return regeneratorRuntime.awrap(import('./np_ready/application'));

                case 10:
                  _ref = _context.sent;
                  renderApp = _ref.renderApp;
                  return _context.abrupt("return", renderApp(innerAngularName, params.element));

                case 13:
                case "end":
                  return _context.stop();
              }
            }
          });
        }
      });
      (0, _register_feature.registerFeature)(plugins.home);
      return {
        addDocView: this.docViewsRegistry.addDocView.bind(this.docViewsRegistry)
      };
    }
  }, {
    key: "start",
    value: function start(core, plugins) {
      var _this2 = this;

      // we need to register the application service at setup, but to render it
      // there are some start dependencies necessary, for this reason
      // initializeInnerAngular + initializeServices are assigned at start and used
      // when the application/embeddable is mounted
      this.initializeInnerAngular = function _callee() {
        var module;
        return regeneratorRuntime.async(function _callee$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!_this2.innerAngularInitialized) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return");

              case 2:
                // this is used by application mount and tests
                module = (0, _get_inner_angular.getInnerAngularModule)(innerAngularName, core, plugins);
                (0, _kibana_services.setAngularModule)(module);
                _this2.innerAngularInitialized = true;

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        });
      };

      this.initializeServices = function _callee2() {
        var services;
        return regeneratorRuntime.async(function _callee2$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!_this2.servicesInitialized) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return");

              case 2:
                _context3.next = 4;
                return regeneratorRuntime.awrap((0, _build_services.buildServices)(core, plugins, _this2.docViewsRegistry));

              case 4:
                services = _context3.sent;
                (0, _kibana_services.setServices)(services);
                _this2.servicesInitialized = true;

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        });
      };

      this.registerEmbeddable(core, plugins);
    }
    /**
     * register embeddable with a slimmer embeddable version of inner angular
     */

  }, {
    key: "registerEmbeddable",
    value: function registerEmbeddable(core, plugins) {
      var _this3 = this;

      var _ref2, SearchEmbeddableFactory, getInjector, isEditable, factory;

      return regeneratorRuntime.async(function registerEmbeddable$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(import('./np_ready/embeddable'));

            case 2:
              _ref2 = _context5.sent;
              SearchEmbeddableFactory = _ref2.SearchEmbeddableFactory;

              getInjector = function getInjector() {
                var mountpoint;
                return regeneratorRuntime.async(function getInjector$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        if (_this3.initializeServices) {
                          _context4.next = 2;
                          break;
                        }

                        throw Error('Discover plugin registerEmbeddable:  initializeServices is undefined');

                      case 2:
                        _context4.next = 4;
                        return regeneratorRuntime.awrap(_this3.initializeServices());

                      case 4:
                        (0, _get_inner_angular.getInnerAngularModuleEmbeddable)(embeddableAngularName, core, plugins);
                        mountpoint = document.createElement('div');
                        return _context4.abrupt("return", _angular.default.bootstrap(mountpoint, [embeddableAngularName]));

                      case 7:
                      case "end":
                        return _context4.stop();
                    }
                  }
                });
              };

              isEditable = function isEditable() {
                return core.application.capabilities.discover.save;
              };

              factory = new SearchEmbeddableFactory(plugins.uiActions.executeTriggerActions, getInjector, isEditable);
              plugins.embeddable.registerEmbeddableFactory(factory.type, factory);

            case 8:
            case "end":
              return _context5.stop();
          }
        }
      });
    }
  }]);

  return DiscoverPlugin;
}();

exports.DiscoverPlugin = DiscoverPlugin;