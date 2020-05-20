"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HomePlugin = void 0;

var _kibana_services = require("./kibana_services");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var HomePlugin =
/*#__PURE__*/
function () {
  function HomePlugin() {
    _classCallCheck(this, HomePlugin);

    _defineProperty(this, "dataStart", null);

    _defineProperty(this, "savedObjectsClient", null);

    _defineProperty(this, "environment", null);
  }

  _createClass(HomePlugin, [{
    key: "setup",
    value: function setup(core, _ref) {
      var _this = this;

      var kibana_legacy = _ref.kibana_legacy,
          _ref$__LEGACY = _ref.__LEGACY,
          getAngularDependencies = _ref$__LEGACY.getAngularDependencies,
          legacyServices = _objectWithoutProperties(_ref$__LEGACY, ["getAngularDependencies"]);

      kibana_legacy.registerLegacyApp({
        id: 'home',
        title: 'Home',
        mount: function mount(_ref2, params) {
          var contextCore, angularDependencies, _ref3, _ref4, homeStart, _ref5, renderApp;

          return regeneratorRuntime.async(function mount$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  contextCore = _ref2.core;
                  _context.next = 3;
                  return regeneratorRuntime.awrap(getAngularDependencies());

                case 3:
                  angularDependencies = _context.sent;
                  _context.next = 6;
                  return regeneratorRuntime.awrap(core.getStartServices());

                case 6:
                  _ref3 = _context.sent;
                  _ref4 = _slicedToArray(_ref3, 2);
                  homeStart = _ref4[1].home;
                  (0, _kibana_services.setServices)(_objectSpread({}, legacyServices, {
                    http: contextCore.http,
                    toastNotifications: core.notifications.toasts,
                    banners: contextCore.overlays.banners,
                    docLinks: contextCore.docLinks,
                    savedObjectsClient: _this.savedObjectsClient,
                    chrome: contextCore.chrome,
                    uiSettings: core.uiSettings,
                    addBasePath: core.http.basePath.prepend,
                    getBasePath: core.http.basePath.get,
                    indexPatternService: _this.dataStart.indexPatterns,
                    environment: _this.environment,
                    tutorialVariables: homeStart.tutorials.get,
                    getInjected: core.injectedMetadata.getInjectedVar
                  }, angularDependencies));
                  _context.next = 12;
                  return regeneratorRuntime.awrap(import('./np_ready/application'));

                case 12:
                  _ref5 = _context.sent;
                  renderApp = _ref5.renderApp;
                  _context.next = 16;
                  return regeneratorRuntime.awrap(renderApp(params.element));

                case 16:
                  return _context.abrupt("return", _context.sent);

                case 17:
                case "end":
                  return _context.stop();
              }
            }
          });
        }
      });
    }
  }, {
    key: "start",
    value: function start(core, _ref6) {
      var data = _ref6.data,
          home = _ref6.home;
      this.environment = home.environment.get();
      this.dataStart = data;
      this.savedObjectsClient = core.savedObjects.client;
    }
  }, {
    key: "stop",
    value: function stop() {}
  }]);

  return HomePlugin;
}();

exports.HomePlugin = HomePlugin;