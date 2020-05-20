"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.interpretAst = exports.getInterpreter = void 0;

require("uiExports/interpreter");

var _common = require("@kbn/interpreter/common");

var _new_platform = require("ui/new_platform");

var _registries = require("./registries");

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
// @ts-ignore
// Expose kbnInterpreter.register(specs) and kbnInterpreter.registries() globally so that plugins
// can register without a transpile step.
// TODO: This will be left behind in then legacy platform?
global.kbnInterpreter = Object.assign(global.kbnInterpreter || {}, (0, _common.registryFactory)(_registries.registries)); // TODO: This function will be left behind in the legacy platform.

var executorPromise;

var getInterpreter = function getInterpreter() {
  var executor;
  return regeneratorRuntime.async(function getInterpreter$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!executorPromise) {
            executor = _new_platform.npSetup.plugins.expressions.__LEGACY.getExecutor();
            executorPromise = Promise.resolve(executor);
          }

          _context.next = 3;
          return regeneratorRuntime.awrap(executorPromise);

        case 3:
          return _context.abrupt("return", _context.sent);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}; // TODO: This function will be left behind in the legacy platform.


exports.getInterpreter = getInterpreter;

var interpretAst = function interpretAst(ast, context, handlers) {
  var _ref, interpreter;

  return regeneratorRuntime.async(function interpretAst$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(getInterpreter());

        case 2:
          _ref = _context2.sent;
          interpreter = _ref.interpreter;
          _context2.next = 6;
          return regeneratorRuntime.awrap(interpreter.interpretAst(ast, context, handlers));

        case 6:
          return _context2.abrupt("return", _context2.sent);

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.interpretAst = interpretAst;