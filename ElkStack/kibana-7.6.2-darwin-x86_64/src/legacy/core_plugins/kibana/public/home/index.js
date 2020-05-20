"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trackUiMetric = void 0;

var _feature_catalogue = require("ui/registry/feature_catalogue");

var _new_platform = require("ui/new_platform");

var _chrome = _interopRequireDefault(require("ui/chrome"));

var _plugin = require("./plugin");

var _public = require("../../../ui_metric/public");

var _services = require("../../../telemetry/public/services");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var trackUiMetric = (0, _public.createUiStatsReporter)('Kibana_home');
/**
 * Get dependencies relying on the global angular context.
 * They also have to get resolved together with the legacy imports above
 */

exports.trackUiMetric = trackUiMetric;

function getAngularDependencies() {
  var injector, Private, telemetryEnabled, telemetryBanner, telemetryOptInProvider;
  return regeneratorRuntime.async(function getAngularDependencies$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_chrome.default.dangerouslyGetActiveInjector());

        case 2:
          injector = _context.sent;
          Private = injector.get('Private');
          telemetryEnabled = _new_platform.npStart.core.injectedMetadata.getInjectedVar('telemetryEnabled');
          telemetryBanner = _new_platform.npStart.core.injectedMetadata.getInjectedVar('telemetryBanner');
          telemetryOptInProvider = Private(_services.TelemetryOptInProvider);
          return _context.abrupt("return", {
            telemetryOptInProvider: telemetryOptInProvider,
            shouldShowTelemetryOptIn: telemetryEnabled && telemetryBanner && !telemetryOptInProvider.getOptIn()
          });

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
}

var copiedLegacyCatalogue = false;

(function _callee() {
  var instance;
  return regeneratorRuntime.async(function _callee$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          instance = new _plugin.HomePlugin();
          instance.setup(_new_platform.npSetup.core, _objectSpread({}, _new_platform.npSetup.plugins, {
            __LEGACY: {
              trackUiMetric: trackUiMetric,
              metadata: _new_platform.npStart.core.injectedMetadata.getLegacyMetadata(),
              METRIC_TYPE: _public.METRIC_TYPE,
              getFeatureCatalogueEntries: function getFeatureCatalogueEntries() {
                var _injector, _Private;

                return regeneratorRuntime.async(function getFeatureCatalogueEntries$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        if (copiedLegacyCatalogue) {
                          _context2.next = 7;
                          break;
                        }

                        _context2.next = 3;
                        return regeneratorRuntime.awrap(_chrome.default.dangerouslyGetActiveInjector());

                      case 3:
                        _injector = _context2.sent;
                        _Private = _injector.get('Private'); // Merge legacy registry with new registry

                        _Private(_feature_catalogue.FeatureCatalogueRegistryProvider).inTitleOrder.map(_new_platform.npSetup.plugins.home.featureCatalogue.register);

                        copiedLegacyCatalogue = true;

                      case 7:
                        return _context2.abrupt("return", _new_platform.npStart.plugins.home.featureCatalogue.get());

                      case 8:
                      case "end":
                        return _context2.stop();
                    }
                  }
                });
              },
              getAngularDependencies: getAngularDependencies
            }
          }));
          instance.start(_new_platform.npStart.core, _objectSpread({}, _new_platform.npStart.plugins));

        case 3:
        case "end":
          return _context3.stop();
      }
    }
  });
})();