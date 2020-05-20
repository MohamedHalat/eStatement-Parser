"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createLegacyAppMounter = exports.createAppMounter = exports.createRenderer = void 0;

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _react2 = require("@kbn/i18n/react");

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
var createRenderer = function createRenderer(element) {
  var dom = element && (0, _enzyme.mount)(_react.default.createElement(_react2.I18nProvider, null, element));
  return function () {
    return new Promise(function _callee(resolve) {
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (dom) {
                dom.update();
              }

              setImmediate(function () {
                return resolve(dom);
              }); // flushes any pending promises

            case 2:
            case "end":
              return _context.stop();
          }
        }
      });
    });
  };
};

exports.createRenderer = createRenderer;

var createAppMounter = function createAppMounter(appId, html) {
  var appRoute = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "/app/".concat(appId);
  var unmount = jest.fn();
  return [appId, {
    mounter: {
      appRoute: appRoute,
      appBasePath: appRoute,
      mount: jest.fn(function _callee2(_ref) {
        var basename, element;
        return regeneratorRuntime.async(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                basename = _ref.appBasePath, element = _ref.element;
                Object.assign(element, {
                  innerHTML: "<div>\nbasename: ".concat(basename, "\nhtml: ").concat(html, "\n</div>")
                });
                unmount.mockImplementation(function () {
                  return Object.assign(element, {
                    innerHTML: ''
                  });
                });
                return _context2.abrupt("return", unmount);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        });
      })
    },
    unmount: unmount
  }];
};

exports.createAppMounter = createAppMounter;

var createLegacyAppMounter = function createLegacyAppMounter(appId, legacyMount) {
  return [appId, {
    mounter: {
      appRoute: "/app/".concat(appId.split(':')[0]),
      appBasePath: "/app/".concat(appId.split(':')[0]),
      unmountBeforeMounting: true,
      mount: legacyMount
    },
    unmount: jest.fn()
  }];
};

exports.createLegacyAppMounter = createLegacyAppMounter;