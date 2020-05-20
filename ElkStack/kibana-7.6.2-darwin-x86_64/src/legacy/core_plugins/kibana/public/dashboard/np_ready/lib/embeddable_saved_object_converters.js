"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertSavedDashboardPanelToPanelState = convertSavedDashboardPanelToPanelState;
exports.convertPanelStateToSavedDashboardPanel = convertPanelStateToSavedDashboardPanel;

var _lodash = require("lodash");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function convertSavedDashboardPanelToPanelState(savedDashboardPanel) {
  return _objectSpread({
    type: savedDashboardPanel.type,
    gridData: savedDashboardPanel.gridData
  }, savedDashboardPanel.id !== undefined && {
    savedObjectId: savedDashboardPanel.id
  }, {
    explicitInput: _objectSpread({
      id: savedDashboardPanel.panelIndex
    }, savedDashboardPanel.title !== undefined && {
      title: savedDashboardPanel.title
    }, {}, savedDashboardPanel.embeddableConfig)
  });
}

function convertPanelStateToSavedDashboardPanel(panelState, version) {
  var customTitle = panelState.explicitInput.title ? panelState.explicitInput.title : undefined;
  return _objectSpread({
    version: version,
    type: panelState.type,
    gridData: panelState.gridData,
    panelIndex: panelState.explicitInput.id,
    embeddableConfig: (0, _lodash.omit)(panelState.explicitInput, 'id')
  }, customTitle && {
    title: customTitle
  }, {}, panelState.savedObjectId !== undefined && {
    id: panelState.savedObjectId
  });
}