"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSendMessageAction = createSendMessageAction;
exports.SEND_MESSAGE_ACTION = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _ui_actions = require("../../ui_actions");

var _public = require("../../../../../kibana_react/public");

var _get_message_modal = require("./get_message_modal");

var _say_hello_action = require("./say_hello_action");

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
var SEND_MESSAGE_ACTION = 'SEND_MESSAGE_ACTION';
exports.SEND_MESSAGE_ACTION = SEND_MESSAGE_ACTION;

var isCompatible = function isCompatible(context) {
  return regeneratorRuntime.async(function isCompatible$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", (0, _say_hello_action.hasFullNameOutput)(context.embeddable));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

function createSendMessageAction(overlays) {
  var sendMessage = function sendMessage(context, message) {
    var greeting, content;
    return regeneratorRuntime.async(function sendMessage$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            greeting = "Hello, ".concat(context.embeddable.getOutput().fullName);
            content = message ? "".concat(greeting, ". ").concat(message) : greeting;
            overlays.openFlyout((0, _public.toMountPoint)(_react.default.createElement(_eui.EuiFlyoutBody, null, content)));

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    });
  };

  return (0, _ui_actions.createAction)({
    type: SEND_MESSAGE_ACTION,
    getDisplayName: function getDisplayName() {
      return 'Send message';
    },
    isCompatible: isCompatible,
    execute: function execute(context) {
      var modal;
      return regeneratorRuntime.async(function execute$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(isCompatible(context));

            case 2:
              if (_context3.sent) {
                _context3.next = 4;
                break;
              }

              throw new _ui_actions.IncompatibleActionError();

            case 4:
              modal = overlays.openModal((0, _public.toMountPoint)(_react.default.createElement(_get_message_modal.GetMessageModal, {
                onCancel: function onCancel() {
                  return modal.close();
                },
                onDone: function onDone(message) {
                  modal.close();
                  sendMessage(context, message);
                }
              })));

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
  });
}