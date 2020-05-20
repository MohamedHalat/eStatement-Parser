"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "createSavedSearchesService", {
  enumerable: true,
  get: function get() {
    return _saved_searches.createSavedSearchesService;
  }
});
exports.start = exports.setup = exports.pluginInstance = exports.plugin = void 0;

var _chrome = _interopRequireDefault(require("ui/chrome"));

var _new_platform = require("ui/new_platform");

var _plugin = require("./plugin");

var _saved_searches = require("./saved_searches/saved_searches");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Core will be looking for this when loading our plugin in the new platform
var plugin = function plugin(context) {
  return new _plugin.DiscoverPlugin();
}; // Legacy compatiblity part - to be removed at cutover, replaced by a kibana.json file


exports.plugin = plugin;
var pluginInstance = plugin({});
exports.pluginInstance = pluginInstance;
var setup = pluginInstance.setup(_new_platform.npSetup.core, _objectSpread({}, _new_platform.npSetup.plugins, {
  __LEGACY: {
    chrome: _chrome.default
  }
}));
exports.setup = setup;
var start = pluginInstance.start(_new_platform.npStart.core, _new_platform.npStart.plugins);
exports.start = start;