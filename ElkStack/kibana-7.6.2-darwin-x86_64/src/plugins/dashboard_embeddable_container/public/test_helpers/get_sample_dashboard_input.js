"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSampleDashboardInput = getSampleDashboardInput;
exports.getSampleDashboardPanel = getSampleDashboardPanel;

var _embeddable_plugin = require("../embeddable_plugin");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getSampleDashboardInput(overrides) {
  return _objectSpread({
    id: '123',
    filters: [],
    useMargins: false,
    isFullScreenMode: false,
    title: 'My Dashboard',
    query: {
      language: 'kuery',
      query: 'hi'
    },
    timeRange: {
      to: 'now',
      from: 'now-15m'
    },
    viewMode: _embeddable_plugin.ViewMode.VIEW,
    panels: {}
  }, overrides);
}

function getSampleDashboardPanel(overrides) {
  return _objectSpread({
    gridData: {
      h: 15,
      w: 15,
      x: 0,
      y: 0,
      i: overrides.explicitInput.id
    },
    type: overrides.type,
    explicitInput: overrides.explicitInput
  }, overrides);
}