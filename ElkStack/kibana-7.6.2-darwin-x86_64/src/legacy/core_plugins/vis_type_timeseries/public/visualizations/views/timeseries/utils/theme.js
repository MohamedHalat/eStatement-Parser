"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTheme = getTheme;
exports.getChartClasses = getChartClasses;

var _color = _interopRequireDefault(require("color"));

var _charts = require("@elastic/charts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function computeRelativeLuminosity(rgb) {
  return (0, _color.default)(rgb).luminosity();
}

function computeContrast(rgb1, rgb2) {
  return (0, _color.default)(rgb1).contrast((0, _color.default)(rgb2));
}

function getAAARelativeLum(bgColor, fgColor) {
  var ratio = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 7;
  var relLum1 = computeRelativeLuminosity(bgColor);
  var relLum2 = computeRelativeLuminosity(fgColor);

  if (relLum1 > relLum2) {
    // relLum1 is brighter, relLum2 is darker
    return (relLum1 + 0.05 - ratio * 0.05) / ratio;
  } else {
    // relLum1 is darker, relLum2 is brighter
    return Math.min(ratio * (relLum1 + 0.05) - 0.05, 1);
  }
}

function getGrayFromRelLum(relLum) {
  if (relLum <= 0.0031308) {
    return relLum * 12.92;
  } else {
    return (1.0 + 0.055) * Math.pow(relLum, 1.0 / 2.4) - 0.055;
  }
}

function getGrayRGBfromGray(gray) {
  var g = Math.round(gray * 255);
  return "rgb(".concat(g, ",").concat(g, ",").concat(g, ")");
}

function getAAAGray(bgColor, fgColor) {
  var ratio = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 7;
  var relLum = getAAARelativeLum(bgColor, fgColor, ratio);
  var gray = getGrayFromRelLum(relLum);
  return getGrayRGBfromGray(gray);
}

function findBestContrastColor(bgColor, lightFgColor, darkFgColor) {
  var ratio = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 4.5;
  var lc = computeContrast(bgColor, lightFgColor);
  var dc = computeContrast(bgColor, darkFgColor);

  if (lc >= dc) {
    if (lc >= ratio) {
      return lightFgColor;
    }

    return getAAAGray(bgColor, lightFgColor, ratio);
  }

  if (dc >= ratio) {
    return darkFgColor;
  }

  return getAAAGray(bgColor, darkFgColor, ratio);
}

function isValidColor(color) {
  if (typeof color !== 'string') {
    return false;
  }

  if (color.length === 0) {
    return false;
  }

  try {
    (0, _color.default)(color);
    return true;
  } catch (_unused) {
    return false;
  }
}

function getTheme(darkMode, bgColor) {
  if (!isValidColor(bgColor)) {
    return darkMode ? _charts.DARK_THEME : _charts.LIGHT_THEME;
  }

  var bgLuminosity = computeRelativeLuminosity(bgColor);
  var mainTheme = bgLuminosity <= 0.179 ? _charts.DARK_THEME : _charts.LIGHT_THEME;
  var color = findBestContrastColor(bgColor, _charts.LIGHT_THEME.axes.axisTitleStyle.fill, _charts.DARK_THEME.axes.axisTitleStyle.fill);
  return _objectSpread({}, mainTheme, {
    axes: _objectSpread({}, mainTheme.axes, {
      axisTitleStyle: _objectSpread({}, mainTheme.axes.axisTitleStyle, {
        fill: color
      }),
      tickLabelStyle: _objectSpread({}, mainTheme.axes.tickLabelStyle, {
        fill: color
      }),
      axisLineStyle: _objectSpread({}, mainTheme.axes.axisLineStyle, {
        stroke: color
      }),
      tickLineStyle: _objectSpread({}, mainTheme.axes.tickLineStyle, {
        stroke: color
      })
    })
  });
}

function getChartClasses(bgColor) {
  // keep the original theme color if no bg color is specified
  if (typeof bgColor !== 'string') {
    return;
  }

  var bgLuminosity = computeRelativeLuminosity(bgColor);
  return bgLuminosity <= 0.179 ? 'tvbVisTimeSeriesDark' : 'tvbVisTimeSeriesLight';
}