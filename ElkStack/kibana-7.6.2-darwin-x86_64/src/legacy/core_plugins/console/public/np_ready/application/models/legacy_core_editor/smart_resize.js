"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

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
// eslint-disable-next-line import/no-default-export
function _default(editor) {
  var resize = editor.resize;
  var throttledResize = (0, _lodash.throttle)(function () {
    resize.call(editor, false); // Keep current top line in view when resizing to avoid losing user context

    var userRow = (0, _lodash.get)(throttledResize, 'topRow', 0);

    if (userRow !== 0) {
      editor.renderer.scrollToLine(userRow, false, false, function () {});
    }
  }, 35);
  return throttledResize;
}

module.exports = exports.default;