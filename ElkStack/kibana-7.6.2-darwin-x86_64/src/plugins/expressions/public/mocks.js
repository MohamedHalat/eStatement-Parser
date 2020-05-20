"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expressionsPluginMock = void 0;

var _react = _interopRequireDefault(require("react"));

var _ = require(".");

var _mocks = require("../../../core/public/mocks");

var _mocks2 = require("../../inspector/public/mocks");

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

/* eslint-disable */
var createSetupContract = function createSetupContract() {
  var setupContract = {
    registerFunction: jest.fn(),
    registerRenderer: jest.fn(),
    registerType: jest.fn(),
    __LEGACY: {
      functions: {
        register: function register() {}
      },
      renderers: {
        register: function register() {}
      },
      types: {
        register: function register() {}
      },
      getExecutor: function getExecutor() {
        return {
          interpreter: {
            interpretAst: function interpretAst() {}
          }
        };
      }
    }
  };
  return setupContract;
};

var createStartContract = function createStartContract() {
  return {
    execute: jest.fn(),
    ExpressionDataHandler: jest.fn(),
    ExpressionLoader: jest.fn(),
    ExpressionRenderer: jest.fn(function (props) {
      return _react.default.createElement(_react.default.Fragment, null);
    }),
    ExpressionRenderHandler: jest.fn(),
    loader: jest.fn(),
    render: jest.fn()
  };
};

var createPlugin = function createPlugin() {
  var pluginInitializerContext, coreSetup, coreStart, plugin, setup;
  return regeneratorRuntime.async(function createPlugin$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          pluginInitializerContext = _mocks.coreMock.createPluginInitializerContext();
          coreSetup = _mocks.coreMock.createSetup();
          coreStart = _mocks.coreMock.createStart();
          plugin = (0, _.plugin)(pluginInitializerContext);
          _context2.next = 6;
          return regeneratorRuntime.awrap(plugin.setup(coreSetup, {
            inspector: _mocks2.inspectorPluginMock.createSetupContract()
          }));

        case 6:
          setup = _context2.sent;
          return _context2.abrupt("return", {
            pluginInitializerContext: pluginInitializerContext,
            coreSetup: coreSetup,
            coreStart: coreStart,
            plugin: plugin,
            setup: setup,
            doStart: function doStart() {
              return regeneratorRuntime.async(function doStart$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return regeneratorRuntime.awrap(plugin.start(coreStart, {
                        inspector: _mocks2.inspectorPluginMock.createStartContract()
                      }));

                    case 2:
                      return _context.abrupt("return", _context.sent);

                    case 3:
                    case "end":
                      return _context.stop();
                  }
                }
              });
            }
          });

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var expressionsPluginMock = {
  createSetupContract: createSetupContract,
  createStartContract: createStartContract,
  createPlugin: createPlugin
};
exports.expressionsPluginMock = expressionsPluginMock;