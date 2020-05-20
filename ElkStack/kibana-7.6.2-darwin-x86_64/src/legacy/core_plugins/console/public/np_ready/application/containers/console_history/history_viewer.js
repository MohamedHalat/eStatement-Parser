"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HistoryViewer = HistoryViewer;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _subscribe_console_resize_checker = require("../editor/legacy/subscribe_console_resize_checker");

var InputMode = _interopRequireWildcard(require("../../models/legacy_core_editor/mode/input"));

var editor = _interopRequireWildcard(require("../../models/legacy_core_editor"));

var _apply_editor_settings = require("../editor/legacy/console_editor/apply_editor_settings");

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
// @ts-ignore
var inputMode = new InputMode.Mode();

function HistoryViewer(_ref) {
  var settings = _ref.settings,
      req = _ref.req;
  var divRef = (0, _react.useRef)(null);
  var viewerRef = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    var viewer = editor.createReadOnlyAceEditor(divRef.current);
    viewerRef.current = viewer;
    var unsubscribe = (0, _subscribe_console_resize_checker.subscribeResizeChecker)(divRef.current, viewer);
    return function () {
      return unsubscribe();
    };
  }, []);
  (0, _react.useEffect)(function () {
    (0, _apply_editor_settings.applyCurrentSettings)(viewerRef.current, settings);
  }, [settings]);

  if (viewerRef.current) {
    var viewer = viewerRef.current;

    if (req) {
      var s = req.method + ' ' + req.endpoint + '\n' + (req.data || '');
      viewer.update(s, inputMode);
      viewer.clearSelection();
    } else {
      viewer.update(_i18n.i18n.translate('console.historyPage.noHistoryTextMessage', {
        defaultMessage: 'No history available'
      }), inputMode);
    }
  }

  return _react.default.createElement("div", {
    className: "conHistory__viewer",
    ref: divRef
  });
}