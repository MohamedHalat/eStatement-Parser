"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = void 0;

var _brace = _interopRequireDefault(require("brace"));

var _legacy_core_editor = require("./legacy_core_editor");

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
var create = function create(el) {
  var actions = document.querySelector('#ConAppEditorActions');

  if (!actions) {
    throw new Error('Could not find ConAppEditorActions element!');
  }

  var aceEditor = _brace.default.edit(el);

  return new _legacy_core_editor.LegacyCoreEditor(aceEditor, actions);
};

exports.create = create;