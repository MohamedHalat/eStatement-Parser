"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPanelState = createPanelState;

var _dashboard_constants = require("../dashboard_constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Look for the smallest y and x value where the default panel will fit.
function findTopLeftMostOpenSpace(width, height, currentPanels) {
  var maxY = -1;
  currentPanels.forEach(function (panel) {
    maxY = Math.max(panel.gridData.y + panel.gridData.h, maxY);
  }); // Handle case of empty grid.

  if (maxY < 0) {
    return {
      x: 0,
      y: 0
    };
  }

  var grid = new Array(maxY);

  for (var y = 0; y < maxY; y++) {
    grid[y] = new Array(_dashboard_constants.DASHBOARD_GRID_COLUMN_COUNT).fill(0);
  }

  currentPanels.forEach(function (panel) {
    for (var x = panel.gridData.x; x < panel.gridData.x + panel.gridData.w; x++) {
      for (var _y = panel.gridData.y; _y < panel.gridData.y + panel.gridData.h; _y++) {
        var row = grid[_y];

        if (row === undefined) {
          throw new Error("Attempted to access a row that doesn't exist at ".concat(_y, " for panel ").concat(JSON.stringify(panel)));
        }

        grid[_y][x] = 1;
      }
    }
  });

  for (var _y2 = 0; _y2 < maxY; _y2++) {
    for (var x = 0; x < _dashboard_constants.DASHBOARD_GRID_COLUMN_COUNT; x++) {
      if (grid[_y2][x] === 1) {
        // Space is filled
        continue;
      } else {
        for (var h = _y2; h < Math.min(_y2 + height, maxY); h++) {
          for (var w = x; w < Math.min(x + width, _dashboard_constants.DASHBOARD_GRID_COLUMN_COUNT); w++) {
            var spaceIsEmpty = grid[h][w] === 0;
            var fitsPanelWidth = w === x + width - 1; // If the panel is taller than any other panel in the current grid, it can still fit in the space, hence
            // we check the minimum of maxY and the panel height.

            var fitsPanelHeight = h === Math.min(_y2 + height - 1, maxY - 1);

            if (spaceIsEmpty && fitsPanelWidth && fitsPanelHeight) {
              // Found space
              return {
                x: x,
                y: _y2
              };
            } else if (grid[h][w] === 1) {
              // x, y spot doesn't work, break.
              break;
            }
          }
        }
      }
    }
  }

  return {
    x: 0,
    y: maxY
  };
}
/**
 * Creates and initializes a basic panel state.
 */


function createPanelState(panelState, currentPanels) {
  var _findTopLeftMostOpenS = findTopLeftMostOpenSpace(_dashboard_constants.DEFAULT_PANEL_WIDTH, _dashboard_constants.DEFAULT_PANEL_HEIGHT, currentPanels),
      x = _findTopLeftMostOpenS.x,
      y = _findTopLeftMostOpenS.y;

  return _objectSpread({
    gridData: {
      w: _dashboard_constants.DEFAULT_PANEL_WIDTH,
      h: _dashboard_constants.DEFAULT_PANEL_HEIGHT,
      x: x,
      y: y,
      i: panelState.explicitInput.id
    }
  }, panelState);
}