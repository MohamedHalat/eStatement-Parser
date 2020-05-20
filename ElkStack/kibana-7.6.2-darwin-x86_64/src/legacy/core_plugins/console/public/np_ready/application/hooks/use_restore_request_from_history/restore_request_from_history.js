"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.restoreRequestFromHistory = restoreRequestFromHistory;

var _row_parser = _interopRequireDefault(require("../../../lib/row_parser"));

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

/**
 * This function is considered legacy and should not be changed or updated before we have editor
 * interfaces in place (it's using a customized version of Ace directly).
 */
function restoreRequestFromHistory(editor, req) {
  var coreEditor = editor.getCoreEditor();
  var pos = coreEditor.getCurrentPosition();
  var prefix = '';
  var suffix = '\n';
  var parser = new _row_parser.default(coreEditor);

  if (parser.isStartRequestRow(pos.lineNumber)) {
    pos.column = 1;
    suffix += '\n';
  } else if (parser.isEndRequestRow(pos.lineNumber)) {
    var line = coreEditor.getLineValue(pos.lineNumber);
    pos.column = line.length + 1;
    prefix = '\n\n';
  } else if (parser.isInBetweenRequestsRow(pos.lineNumber)) {
    pos.column = 1;
  } else {
    pos = editor.nextRequestEnd(pos);
    prefix = '\n\n';
  }

  var s = prefix + req.method + ' ' + req.endpoint;

  if (req.data) {
    s += '\n' + req.data;
  }

  s += suffix;
  coreEditor.insert(pos, s);
  coreEditor.moveCursorToPosition({
    lineNumber: pos.lineNumber + prefix.length,
    column: 1
  });
  coreEditor.clearSelection();
  coreEditor.getContainer().focus();
}