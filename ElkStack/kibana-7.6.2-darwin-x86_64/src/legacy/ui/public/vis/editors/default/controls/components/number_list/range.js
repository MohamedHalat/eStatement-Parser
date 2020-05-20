"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseRange = parseRange;
exports.NumberListRange = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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

/**
 * Regexp portion that matches our number
 *
 * supports:
 *   -100
 *   -100.0
 *   0
 *   0.10
 *   Infinity
 *   -Infinity
 *
 * @type {String}
 */
var _RE_NUMBER = '(\\-?(?:\\d+(?:\\.\\d+)?|Infinity))';
/**
 * Regexp for the interval notation
 *
 * supports:
 *   [num, num]
 *   ( num , num ]
 *   [Infinity,num)
 *
 * @type {RegExp}
 */

var RANGE_RE = new RegExp('^\\s*([\\[|\\(])\\s*' + _RE_NUMBER + '\\s*,\\s*' + _RE_NUMBER + '\\s*([\\]|\\)])\\s*$');

var NumberListRange =
/*#__PURE__*/
function () {
  function NumberListRange(minInclusive, min, max, maxInclusive) {
    _classCallCheck(this, NumberListRange);

    this.minInclusive = minInclusive;
    this.min = min;
    this.max = max;
    this.maxInclusive = maxInclusive;
  }

  _createClass(NumberListRange, [{
    key: "within",
    value: function within(n) {
      if (this.min === n && !this.minInclusive || this.min > n) return false;
      if (this.max === n && !this.maxInclusive || this.max < n) return false;
      return true;
    }
  }]);

  return NumberListRange;
}();

exports.NumberListRange = NumberListRange;

function parseRange(input) {
  var match = String(input).match(RANGE_RE);

  if (!match) {
    throw new TypeError('expected input to be in interval notation e.g., (100, 200]');
  }

  var args = [match[1] === '[', parseFloat(match[2]), parseFloat(match[3]), match[4] === ']'];

  if (args[1] > args[2]) {
    args.reverse();
  }

  var minInclusive = args[0],
      min = args[1],
      max = args[2],
      maxInclusive = args[3];
  return new NumberListRange(minInclusive, min, max, maxInclusive);
}