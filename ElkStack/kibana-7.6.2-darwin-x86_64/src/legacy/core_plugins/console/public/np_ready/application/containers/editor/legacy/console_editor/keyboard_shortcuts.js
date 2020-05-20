"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerCommands = registerCommands;

var _lodash = require("lodash");

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
function registerCommands(_ref) {
  var senseEditor = _ref.senseEditor,
      sendCurrentRequestToES = _ref.sendCurrentRequestToES,
      openDocumentation = _ref.openDocumentation;
  var throttledAutoIndent = (0, _lodash.throttle)(function () {
    return senseEditor.autoIndent();
  }, 500, {
    leading: true,
    trailing: true
  });
  var coreEditor = senseEditor.getCoreEditor();
  coreEditor.registerKeyboardShortcut({
    keys: {
      win: 'Ctrl-Enter',
      mac: 'Command-Enter'
    },
    name: 'send to Elasticsearch',
    fn: function fn() {
      return sendCurrentRequestToES();
    }
  });
  coreEditor.registerKeyboardShortcut({
    name: 'open documentation',
    keys: {
      win: 'Ctrl-/',
      mac: 'Command-/'
    },
    fn: function fn() {
      openDocumentation();
    }
  });
  coreEditor.registerKeyboardShortcut({
    name: 'auto indent request',
    keys: {
      win: 'Ctrl-I',
      mac: 'Command-I'
    },
    fn: function fn() {
      throttledAutoIndent();
    }
  });
  coreEditor.registerKeyboardShortcut({
    name: 'move to previous request start or end',
    keys: {
      win: 'Ctrl-Up',
      mac: 'Command-Up'
    },
    fn: function fn() {
      senseEditor.moveToPreviousRequestEdge();
    }
  });
  coreEditor.registerKeyboardShortcut({
    name: 'move to next request start or end',
    keys: {
      win: 'Ctrl-Down',
      mac: 'Command-Down'
    },
    fn: function fn() {
      senseEditor.moveToNextRequestEdge(false);
    }
  });
}