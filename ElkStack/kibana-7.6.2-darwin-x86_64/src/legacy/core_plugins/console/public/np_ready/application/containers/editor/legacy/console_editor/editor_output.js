"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditorOutput = void 0;

var _react = _interopRequireWildcard(require("react"));

var _legacy_core_editor = require("../../../../models/legacy_core_editor");

var _contexts = require("../../../../contexts");

var utils = _interopRequireWildcard(require("../../../../../lib/utils/utils"));

var _subscribe_console_resize_checker = require("../subscribe_console_resize_checker");

var _apply_editor_settings = require("./apply_editor_settings");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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
function modeForContentType(contentType) {
  if (contentType.indexOf('application/json') >= 0) {
    return 'ace/mode/json';
  } else if (contentType.indexOf('application/yaml') >= 0) {
    return 'ace/mode/yaml';
  }

  return 'ace/mode/text';
}

function EditorOutputUI() {
  var editorRef = (0, _react.useRef)(null);
  var editorInstanceRef = (0, _react.useRef)(null);

  var _useServicesContext = (0, _contexts.useServicesContext)(),
      services = _useServicesContext.services;

  var _useEditorReadContext = (0, _contexts.useEditorReadContext)(),
      readOnlySettings = _useEditorReadContext.settings;

  var _useRequestReadContex = (0, _contexts.useRequestReadContext)(),
      _useRequestReadContex2 = _useRequestReadContex.lastResult,
      data = _useRequestReadContex2.data,
      error = _useRequestReadContex2.error;

  (0, _react.useEffect)(function () {
    editorInstanceRef.current = (0, _legacy_core_editor.createReadOnlyAceEditor)(editorRef.current);
    var unsubscribe = (0, _subscribe_console_resize_checker.subscribeResizeChecker)(editorRef.current, editorInstanceRef.current);
    return function () {
      unsubscribe();
    };
  }, [services.settings]);
  (0, _react.useEffect)(function () {
    var editor = editorInstanceRef.current;

    if (data) {
      var mode = modeForContentType(data[0].response.contentType);
      editor.session.setMode(mode);
      editor.update(data.map(function (d) {
        return d.response.value;
      }).map(readOnlySettings.tripleQuotes ? utils.expandLiteralStrings : function (a) {
        return a;
      }).join('\n'));
    } else if (error) {
      editor.session.setMode(modeForContentType(error.contentType));
      editor.update(error.value);
    } else {
      editor.update('');
    }
  }, [readOnlySettings, data, error]);
  (0, _react.useEffect)(function () {
    (0, _apply_editor_settings.applyCurrentSettings)(editorInstanceRef.current, readOnlySettings);
  }, [readOnlySettings]);
  return _react.default.createElement("div", {
    ref: editorRef,
    className: "conApp__output",
    "data-test-subj": "response-editor"
  }, _react.default.createElement("label", {
    className: "conApp__textAreaLabelHack"
  }, _react.default.createElement("div", {
    className: "conApp__outputContent",
    id: "ConAppOutput"
  })));
}

var EditorOutput = _react.default.memo(EditorOutputUI);

exports.EditorOutput = EditorOutput;