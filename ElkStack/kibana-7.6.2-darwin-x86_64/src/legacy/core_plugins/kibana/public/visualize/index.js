"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  showNewVisModal: true,
  createSavedVisLoader: true
};
Object.defineProperty(exports, "showNewVisModal", {
  enumerable: true,
  get: function get() {
    return _wizard.showNewVisModal;
  }
});
Object.defineProperty(exports, "createSavedVisLoader", {
  enumerable: true,
  get: function get() {
    return _saved_visualizations.createSavedVisLoader;
  }
});

require("ui/collapsible_sidebar");

require("ui/vis/editors/default/sidebar");

var _legacy_imports = require("./legacy_imports");

var _plugin = require("./plugin");

var _legacy = require("../../../embeddable_api/public/np_ready/public/legacy");

var _legacy2 = require("../../../visualizations/public/np_ready/public/legacy");

var _visualize_constants = require("./np_ready/visualize_constants");

Object.keys(_visualize_constants).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _visualize_constants[key];
    }
  });
});

var _wizard = require("./np_ready/wizard");

var _saved_visualizations = require("./saved_visualizations/saved_visualizations");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Get dependencies relying on the global angular context.
 * They also have to get resolved together with the legacy imports above
 */
function getAngularDependencies() {
  var injector, Private, editorTypes;
  return regeneratorRuntime.async(function getAngularDependencies$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_legacy_imports.legacyChrome.dangerouslyGetActiveInjector());

        case 2:
          injector = _context.sent;
          Private = injector.get('Private');
          editorTypes = Private(_legacy_imports.VisEditorTypesRegistryProvider);
          return _context.abrupt("return", {
            legacyChrome: _legacy_imports.legacyChrome,
            editorTypes: editorTypes
          });

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
}

(function () {
  var instance = new _plugin.VisualizePlugin();
  instance.setup(_legacy_imports.npSetup.core, _objectSpread({}, _legacy_imports.npSetup.plugins, {
    __LEGACY: {
      getAngularDependencies: getAngularDependencies
    }
  }));
  instance.start(_legacy_imports.npStart.core, _objectSpread({}, _legacy_imports.npStart.plugins, {
    embeddables: _legacy.start,
    visualizations: _legacy2.start
  }));
})();