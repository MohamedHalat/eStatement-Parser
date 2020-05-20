"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.of = exports.expectError = exports.expectErrorAsync = void 0;

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
var expectErrorAsync = function expectErrorAsync(fn) {
  return fn().then(function () {
    throw new Error('Expected an error throw.');
  }).catch(function (error) {
    if (error.message === 'Expected an error throw.') {
      throw error;
    }

    return error;
  });
};

exports.expectErrorAsync = expectErrorAsync;

var expectError = function expectError(fn) {
  try {
    fn();
    throw new Error('Expected an error throw.');
  } catch (error) {
    if (error.message === 'Expected an error throw.') {
      throw error;
    }

    return error;
  }
};

exports.expectError = expectError;

var of = function of(promise) {
  return regeneratorRuntime.async(function of$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(promise);

        case 3:
          _context.t0 = _context.sent;
          _context.t1 = undefined;
          return _context.abrupt("return", [_context.t0, _context.t1]);

        case 8:
          _context.prev = 8;
          _context.t2 = _context["catch"](0);
          return _context.abrupt("return", [, _context.t2]);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.of = of;