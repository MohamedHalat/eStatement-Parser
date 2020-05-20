"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.countNextAxisNumber = countNextAxisNumber;
exports.mapPositionOpposite = mapPositionOpposite;
exports.mapPosition = mapPosition;
exports.getUpdatedAxisName = exports.isAxisHorizontal = exports.makeSerie = void 0;

var _lodash = require("lodash");

var _collections = require("../../../utils/collections");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var makeSerie = function makeSerie(id, label, defaultValueAxis, lastSerie) {
  var data = {
    id: id,
    label: label
  };
  var defaultSerie = {
    show: true,
    mode: _collections.ChartModes.NORMAL,
    type: _collections.ChartTypes.LINE,
    drawLinesBetweenPoints: true,
    showCircles: true,
    interpolate: _collections.InterpolationModes.LINEAR,
    lineWidth: 2,
    valueAxis: defaultValueAxis,
    data: data
  };
  return lastSerie ? _objectSpread({}, lastSerie, {
    data: data
  }) : defaultSerie;
};

exports.makeSerie = makeSerie;

var isAxisHorizontal = function isAxisHorizontal(position) {
  return [_collections.Positions.TOP, _collections.Positions.BOTTOM].includes(position);
};

exports.isAxisHorizontal = isAxisHorizontal;
var RADIX = 10;

function countNextAxisNumber(axisName) {
  var axisProp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'id';
  return function (value, axis) {
    var nameLength = axisName.length;

    if (axis[axisProp].substr(0, nameLength) === axisName) {
      var num = parseInt(axis[axisProp].substr(nameLength), RADIX);

      if (num >= value) {
        value = num + 1;
      }
    }

    return value;
  };
}

var AXIS_PREFIX = 'Axis-';

var getUpdatedAxisName = function getUpdatedAxisName(axisPosition, valueAxes) {
  var axisName = (0, _lodash.capitalize)(axisPosition) + AXIS_PREFIX;
  var nextAxisNameNumber = valueAxes.reduce(countNextAxisNumber(axisName, 'name'), 1);
  return "".concat(axisName).concat(nextAxisNameNumber);
};

exports.getUpdatedAxisName = getUpdatedAxisName;

function mapPositionOpposite(position) {
  switch (position) {
    case _collections.Positions.BOTTOM:
      return _collections.Positions.TOP;

    case _collections.Positions.TOP:
      return _collections.Positions.BOTTOM;

    case _collections.Positions.LEFT:
      return _collections.Positions.RIGHT;

    case _collections.Positions.RIGHT:
      return _collections.Positions.LEFT;

    default:
      throw new Error('Invalid legend position.');
  }
}

function mapPosition(position) {
  switch (position) {
    case _collections.Positions.BOTTOM:
      return _collections.Positions.LEFT;

    case _collections.Positions.TOP:
      return _collections.Positions.RIGHT;

    case _collections.Positions.LEFT:
      return _collections.Positions.BOTTOM;

    case _collections.Positions.RIGHT:
      return _collections.Positions.TOP;
  }
}