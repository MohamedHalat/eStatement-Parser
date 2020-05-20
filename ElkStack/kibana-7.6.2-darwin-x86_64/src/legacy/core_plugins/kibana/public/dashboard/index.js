"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _legacy_imports = require("./legacy_imports");

var _plugin = require("./plugin");

var _legacy = require("../../../data/public/legacy");

var _legacy2 = require("../../../embeddable_api/public/np_ready/public/legacy");

require("./saved_dashboard/saved_dashboard_register");

require("./dashboard_config");

var _dashboard_constants = require("./np_ready/dashboard_constants");

Object.keys(_dashboard_constants).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _dashboard_constants[key];
    }
  });
});

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Get dependencies relying on the global angular context.
 * They also have to get resolved together with the legacy imports above
 */
function getAngularDependencies() {
  var injector;
  return regeneratorRuntime.async(function getAngularDependencies$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_legacy_imports.legacyChrome.dangerouslyGetActiveInjector());

        case 2:
          injector = _context.sent;
          return _context.abrupt("return", {
            dashboardConfig: injector.get('dashboardConfig')
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

(function _callee() {
  var instance;
  return regeneratorRuntime.async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          instance = new _plugin.DashboardPlugin();
          instance.setup(_legacy_imports.npSetup.core, _objectSpread({}, _legacy_imports.npSetup.plugins, {
            __LEGACY: {
              getAngularDependencies: getAngularDependencies
            }
          }));
          instance.start(_legacy_imports.npStart.core, _objectSpread({}, _legacy_imports.npStart.plugins, {
            data: _legacy.start,
            npData: _legacy_imports.npStart.plugins.data,
            embeddables: _legacy2.start,
            navigation: _legacy_imports.npStart.plugins.navigation
          }));

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
})();