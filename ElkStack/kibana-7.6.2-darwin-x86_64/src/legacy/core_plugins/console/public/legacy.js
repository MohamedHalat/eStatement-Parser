"use strict";

var _new_platform = require("ui/new_platform");

var _i18n = require("ui/i18n");

var _chrome = _interopRequireDefault(require("ui/chrome"));

var _feature_catalogue = require("ui/registry/feature_catalogue");

var _np_ready = require("./np_ready");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var pluginInstance = (0, _np_ready.plugin)({});

(function _callee() {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(pluginInstance.setup(_new_platform.npSetup.core, _objectSpread({}, _new_platform.npSetup.plugins, {
            __LEGACY: {
              elasticsearchUrl: _chrome.default.getInjected('elasticsearchUrl'),
              I18nContext: _i18n.I18nContext,
              category: _feature_catalogue.FeatureCatalogueCategory.ADMIN
            }
          })));

        case 2:
          _context.next = 4;
          return regeneratorRuntime.awrap(pluginInstance.start(_new_platform.npStart.core));

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
})();