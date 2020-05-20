"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tickFormatters = tickFormatters;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
function baseTickFormatter(value, axis) {
  var factor = axis.tickDecimals ? Math.pow(10, axis.tickDecimals) : 1;
  var formatted = '' + Math.round(value * factor) / factor; // If tickDecimals was specified, ensure that we have exactly that
  // much precision; otherwise default to the value's own precision.

  if (axis.tickDecimals != null) {
    var decimal = formatted.indexOf('.');
    var precision = decimal === -1 ? 0 : formatted.length - decimal - 1;

    if (precision < axis.tickDecimals) {
      return (precision ? formatted : formatted + '.') + ('' + factor).substr(1, axis.tickDecimals - precision);
    }
  }

  return formatted;
}

function unitFormatter(divisor, units) {
  return function (val) {
    var index = 0;
    var isNegative = val < 0;
    val = Math.abs(val);

    while (val >= divisor && index < units.length) {
      val /= divisor;
      index++;
    }

    var value = Math.round(val * 100) / 100 * (isNegative ? -1 : 1);
    return "".concat(value).concat(units[index]);
  };
}

function tickFormatters() {
  var formatters = {
    bits: unitFormatter(1000, ['b', 'kb', 'mb', 'gb', 'tb', 'pb']),
    'bits/s': unitFormatter(1000, ['b/s', 'kb/s', 'mb/s', 'gb/s', 'tb/s', 'pb/s']),
    bytes: unitFormatter(1024, ['B', 'KB', 'MB', 'GB', 'TB', 'PB']),
    'bytes/s': unitFormatter(1024, ['B/s', 'KB/s', 'MB/s', 'GB/s', 'TB/s', 'PB/s']),
    currency: function currency(val, axis) {
      return val.toLocaleString('en', {
        style: 'currency',
        currency: axis.options.units.prefix || 'USD'
      });
    },
    percent: function percent(val, axis) {
      var precision = _lodash.default.get(axis, 'tickDecimals', 0) - _lodash.default.get(axis, 'options.units.tickDecimalsShift', 0); // toFixed only accepts values between 0 and 20


      if (precision < 0) {
        precision = 0;
      } else if (precision > 20) {
        precision = 20;
      }

      return (val * 100).toFixed(precision) + '%';
    },
    custom: function custom(val, axis) {
      var formattedVal = baseTickFormatter(val, axis);
      var prefix = axis.options.units.prefix;
      var suffix = axis.options.units.suffix;
      return prefix + formattedVal + suffix;
    }
  };
  return formatters;
}