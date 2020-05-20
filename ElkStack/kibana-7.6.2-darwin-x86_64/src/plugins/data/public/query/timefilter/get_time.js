"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateBounds = calculateBounds;
exports.getTime = getTime;

var _datemath = _interopRequireDefault(require("@elastic/datemath"));

var _common = require("../../../common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function calculateBounds(timeRange) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return {
    min: _datemath.default.parse(timeRange.from, {
      forceNow: options.forceNow
    }),
    max: _datemath.default.parse(timeRange.to, {
      roundUp: true,
      forceNow: options.forceNow
    })
  };
}

function getTime(indexPattern, timeRange, forceNow) {
  if (!indexPattern) {
    // in CI, we sometimes seem to fail here.
    return;
  }

  var timefield = indexPattern.fields.find(function (field) {
    return field.name === indexPattern.timeFieldName;
  });

  if (!timefield) {
    return;
  }

  var bounds = calculateBounds(timeRange, {
    forceNow: forceNow
  });

  if (!bounds) {
    return;
  }

  return _common.esFilters.buildRangeFilter(timefield, _objectSpread({}, bounds.min && {
    gte: bounds.min.toISOString()
  }, {}, bounds.max && {
    lte: bounds.max.toISOString()
  }, {
    format: 'strict_date_optional_time'
  }), indexPattern);
}