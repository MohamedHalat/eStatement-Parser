"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createReadOnlyAceEditor = createReadOnlyAceEditor;

var _lodash = _interopRequireDefault(require("lodash"));

var _brace = _interopRequireDefault(require("brace"));

var OutputMode = _interopRequireWildcard(require("./mode/output"));

var _smart_resize = _interopRequireDefault(require("./smart_resize"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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
// @ts-ignore

/**
 * Note: using read-only ace editor leaks the Ace editor API - use this as sparingly as possible or
 * create an interface for it so that we don't rely directly on vendor APIs.
 */
function createReadOnlyAceEditor(element) {
  var output = _brace.default.acequire('ace/ace').edit(element);

  var outputMode = new OutputMode.Mode();
  output.$blockScrolling = Infinity;
  output.resize = (0, _smart_resize.default)(output);

  output.update = function (val, mode, cb) {
    if (typeof mode === 'function') {
      cb = mode;
      mode = void 0;
    }

    var session = output.getSession();
    session.setMode(val ? mode || outputMode : 'ace/mode/text');
    session.setValue(val);

    if (typeof cb === 'function') {
      setTimeout(cb);
    }
  };

  output.append = function (val, foldPrevious, cb) {
    if (typeof foldPrevious === 'function') {
      cb = foldPrevious;
      foldPrevious = true;
    }

    if (_lodash.default.isUndefined(foldPrevious)) {
      foldPrevious = true;
    }

    var session = output.getSession();
    var lastLine = session.getLength();

    if (foldPrevious) {
      output.moveCursorTo(Math.max(0, lastLine - 1), 0);
    }

    session.insert({
      row: lastLine,
      column: 0
    }, '\n' + val);
    output.moveCursorTo(lastLine + 1, 0);

    if (typeof cb === 'function') {
      setTimeout(cb);
    }
  }; // eslint-disable-next-line


  (function setupSession(session) {
    session.setMode('ace/mode/text');
    session.setFoldStyle('markbeginend');
    session.setTabSize(2);
    session.setUseWrapMode(true);
  })(output.getSession());

  output.setShowPrintMargin(false);
  output.setReadOnly(true);
  return output;
}