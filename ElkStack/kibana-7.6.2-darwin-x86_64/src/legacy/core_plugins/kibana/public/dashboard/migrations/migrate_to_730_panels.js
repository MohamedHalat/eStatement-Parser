"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.migratePanelsTo730 = migratePanelsTo730;

var _i18n = require("@kbn/i18n");

var _semver = _interopRequireDefault(require("semver"));

var _uuid = _interopRequireDefault(require("uuid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var PANEL_HEIGHT_SCALE_FACTOR = 5;
var PANEL_HEIGHT_SCALE_FACTOR_WITH_MARGINS = 4;
var PANEL_WIDTH_SCALE_FACTOR = 4;
/**
 * Note!
 *
 * The 7.3.0 migrations reference versions that are quite old because for a long time all of this
 * migration logic was done ad hoc in the code itself, not on the indexed data (migrations didn't even
 * exist at the point most of that logic was put in place).
 *
 * So you could have a dashboard in 7.2.0 that was created in 6.3 and it will have data of a different
 * shape than some other dashboards that were created more recently.
 *
 * Moving forward migrations should be simpler since all 7.3.0+ dashboards should finally have the
 * same data.
 */

function isPre61Panel(panel) {
  return panel.row !== undefined;
}

function is61Panel(panel) {
  return _semver.default.satisfies(panel.version, '6.1.x');
}

function is62Panel(panel) {
  return _semver.default.satisfies(panel.version, '6.2.x');
}

function is63Panel(panel) {
  return _semver.default.satisfies(panel.version, '6.3.x');
}

function is640To720Panel(panel) {
  return _semver.default.satisfies(panel.version, '>6.3') && _semver.default.satisfies(panel.version, '<7.3');
} // Migrations required for 6.0 and prior:
// 1. (6.1) migrate size_x/y/row/col into gridData
// 2. (6.2) migrate uiState into embeddableConfig
// 3. (6.3) scale grid dimensions
// 4. (6.4) remove columns, sort properties
// 5. (7.3) make sure panelIndex is a string


function migratePre61PanelToLatest(panel, version, useMargins, uiState) {
  if (panel.col === undefined || panel.row === undefined) {
    throw new Error(_i18n.i18n.translate('kbn.dashboard.panel.unableToMigratePanelDataForSixOneZeroErrorMessage', {
      defaultMessage: 'Unable to migrate panel data for "6.1.0" backwards compatibility, panel does not contain expected col and/or row fields'
    }));
  }

  var embeddableConfig = uiState ? uiState["P-".concat(panel.panelIndex)] || {} : {};

  if (panel.columns || panel.sort) {
    embeddableConfig.columns = panel.columns;
    embeddableConfig.sort = panel.sort;
  }

  var heightScaleFactor = useMargins ? PANEL_HEIGHT_SCALE_FACTOR_WITH_MARGINS : PANEL_HEIGHT_SCALE_FACTOR; // These are snapshotted here instead of imported form dashboard_embeddable_container because
  // this function is called from both client and server side, and having an import from a public
  // folder will cause errors for the server side version.  Also, this is only run for the point in time
  // from panels created in < 7.3 so maybe using a snapshot of the default values when this migration was
  // written is more correct anyway.

  var DASHBOARD_GRID_COLUMN_COUNT = 48;
  var DEFAULT_PANEL_WIDTH = DASHBOARD_GRID_COLUMN_COUNT / 2;
  var DEFAULT_PANEL_HEIGHT = 15;

  var columns = panel.columns,
      sort = panel.sort,
      row = panel.row,
      col = panel.col,
      sizeX = panel.size_x,
      sizeY = panel.size_y,
      rest = _objectWithoutProperties(panel, ["columns", "sort", "row", "col", "size_x", "size_y"]);

  var panelIndex = panel.panelIndex ? panel.panelIndex.toString() : _uuid.default.v4();
  return _objectSpread({}, rest, {
    version: version,
    panelIndex: panelIndex,
    gridData: {
      x: (col - 1) * PANEL_WIDTH_SCALE_FACTOR,
      y: (row - 1) * heightScaleFactor,
      w: sizeX ? sizeX * PANEL_WIDTH_SCALE_FACTOR : DEFAULT_PANEL_WIDTH,
      h: sizeY ? sizeY * heightScaleFactor : DEFAULT_PANEL_HEIGHT,
      i: panelIndex
    },
    embeddableConfig: embeddableConfig
  });
} // Migrations required for 6.1 panels:
// 1. (6.2) migrate uiState into embeddableConfig
// 2. (6.3) scale grid dimensions
// 3. (6.4) remove columns, sort properties
// 4. (7.3) make sure panel index is a string


function migrate610PanelToLatest(panel, version, useMargins, uiState) {
  ['w', 'x', 'h', 'y'].forEach(function (key) {
    if (panel.gridData[key] === undefined) {
      throw new Error(_i18n.i18n.translate('kbn.dashboard.panel.unableToMigratePanelDataForSixThreeZeroErrorMessage', {
        defaultMessage: 'Unable to migrate panel data for "6.3.0" backwards compatibility, panel does not contain expected field: {key}',
        values: {
          key: key
        }
      }));
    }
  });
  var embeddableConfig = uiState ? uiState["P-".concat(panel.panelIndex)] || {} : {}; // 2. (6.4) remove columns, sort properties

  if (panel.columns || panel.sort) {
    embeddableConfig.columns = panel.columns;
    embeddableConfig.sort = panel.sort;
  } // 1. (6.3) scale grid dimensions


  var heightScaleFactor = useMargins ? PANEL_HEIGHT_SCALE_FACTOR_WITH_MARGINS : PANEL_HEIGHT_SCALE_FACTOR;

  var columns = panel.columns,
      sort = panel.sort,
      rest = _objectWithoutProperties(panel, ["columns", "sort"]);

  var panelIndex = panel.panelIndex ? panel.panelIndex.toString() : _uuid.default.v4();
  return _objectSpread({}, rest, {
    version: version,
    panelIndex: panelIndex,
    gridData: {
      w: panel.gridData.w * PANEL_WIDTH_SCALE_FACTOR,
      h: panel.gridData.h * heightScaleFactor,
      x: panel.gridData.x * PANEL_WIDTH_SCALE_FACTOR,
      y: panel.gridData.y * heightScaleFactor,
      i: panel.gridData.i
    },
    embeddableConfig: embeddableConfig
  });
} // Migrations required for 6.2 panels:
// 1. (6.3) scale grid dimensions
// 2. (6.4) remove columns, sort properties
// 3. (7.3) make sure panel index is a string


function migrate620PanelToLatest(panel, version, useMargins) {
  // Migrate column, sort
  var embeddableConfig = panel.embeddableConfig || {};

  if (panel.columns || panel.sort) {
    embeddableConfig.columns = panel.columns;
    embeddableConfig.sort = panel.sort;
  } // Scale grid dimensions


  var heightScaleFactor = useMargins ? PANEL_HEIGHT_SCALE_FACTOR_WITH_MARGINS : PANEL_HEIGHT_SCALE_FACTOR;

  var columns = panel.columns,
      sort = panel.sort,
      rest = _objectWithoutProperties(panel, ["columns", "sort"]);

  var panelIndex = panel.panelIndex ? panel.panelIndex.toString() : _uuid.default.v4();
  return _objectSpread({}, rest, {
    version: version,
    panelIndex: panelIndex,
    gridData: {
      w: panel.gridData.w * PANEL_WIDTH_SCALE_FACTOR,
      h: panel.gridData.h * heightScaleFactor,
      x: panel.gridData.x * PANEL_WIDTH_SCALE_FACTOR,
      y: panel.gridData.y * heightScaleFactor,
      i: panel.gridData.i
    },
    embeddableConfig: embeddableConfig
  });
} // Migrations required for 6.3 panels:
// 1. (6.4) remove columns, sort properties
// 2. (7.3) make sure panel index is a string


function migrate630PanelToLatest(panel, version) {
  // Migrate column, sort
  var embeddableConfig = panel.embeddableConfig || {};

  if (panel.columns || panel.sort) {
    embeddableConfig.columns = panel.columns;
    embeddableConfig.sort = panel.sort;
  }

  var columns = panel.columns,
      sort = panel.sort,
      rest = _objectWithoutProperties(panel, ["columns", "sort"]);

  var panelIndex = panel.panelIndex ? panel.panelIndex.toString() : _uuid.default.v4();
  return _objectSpread({}, rest, {
    version: version,
    panelIndex: panelIndex,
    embeddableConfig: embeddableConfig
  });
} // Migrations required for 6.4 to 7.20 panels:
// 1. (7.3) make sure panel index is a string


function migrate640To720PanelsToLatest(panel, version) {
  var panelIndex = panel.panelIndex ? panel.panelIndex.toString() : _uuid.default.v4();
  return _objectSpread({}, panel, {
    version: version,
    panelIndex: panelIndex
  });
}

function migratePanelsTo730(panels, version, useMargins, uiState) {
  return panels.map(function (panel) {
    if (isPre61Panel(panel)) {
      return migratePre61PanelToLatest(panel, version, useMargins, uiState);
    }

    if (is61Panel(panel)) {
      return migrate610PanelToLatest(panel, version, useMargins, uiState);
    }

    if (is62Panel(panel)) {
      return migrate620PanelToLatest(panel, version, useMargins);
    }

    if (is63Panel(panel)) {
      return migrate630PanelToLatest(panel, version);
    }

    if (is640To720Panel(panel)) {
      return migrate640To720PanelsToLatest(panel, version);
    }

    return panel;
  });
}