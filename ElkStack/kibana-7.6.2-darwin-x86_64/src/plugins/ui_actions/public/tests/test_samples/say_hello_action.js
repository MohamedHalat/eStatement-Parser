"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSayHelloAction = createSayHelloAction;
exports.SAY_HELLO_ACTION = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _actions = require("../../actions");

var _public = require("../../../../kibana_react/public");

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
var SAY_HELLO_ACTION = 'SAY_HELLO_ACTION';
exports.SAY_HELLO_ACTION = SAY_HELLO_ACTION;

function createSayHelloAction(overlays) {
  return (0, _actions.createAction)({
    type: SAY_HELLO_ACTION,
    getDisplayName: function getDisplayName(_ref) {
      var name = _ref.name;
      return "Hello, ".concat(name);
    },
    isCompatible: function isCompatible(_ref2) {
      var name;
      return regeneratorRuntime.async(function isCompatible$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              name = _ref2.name;
              return _context.abrupt("return", name !== undefined);

            case 2:
            case "end":
              return _context.stop();
          }
        }
      });
    },
    execute: function execute(context) {
      var flyoutSession;
      return regeneratorRuntime.async(function execute$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              flyoutSession = overlays.openFlyout((0, _public.toMountPoint)(_react.default.createElement(_eui.EuiFlyout, {
                ownFocus: true,
                onClose: function onClose() {
                  return flyoutSession && flyoutSession.close();
                }
              }, "this.getDisplayName(context)")), {
                'data-test-subj': 'sayHelloAction'
              });

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  });
}