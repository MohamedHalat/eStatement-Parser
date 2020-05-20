"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimelionExpressionInput = TimelionExpressionInput;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var monacoEditor = _interopRequireWildcard(require("monaco-editor/esm/vs/editor/editor.api"));

var _public = require("../../../../../plugins/kibana_react/public");

var _timelion_expression_input_helpers = require("./timelion_expression_input_helpers");

var _arg_value_suggestions = require("../services/arg_value_suggestions");

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
var LANGUAGE_ID = 'timelion_expression';
monacoEditor.languages.register({
  id: LANGUAGE_ID
});

function TimelionExpressionInput(_ref) {
  var value = _ref.value,
      setValue = _ref.setValue;
  var functionList = (0, _react.useRef)([]);
  var kibana = (0, _public.useKibana)();
  var argValueSuggestions = (0, _react.useMemo)(_arg_value_suggestions.getArgValueSuggestions, []);
  var provideCompletionItems = (0, _react.useCallback)(function _callee(model, position) {
    var text, wordUntil, wordRange, suggestions;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            text = model.getValue();
            wordUntil = model.getWordUntilPosition(position);
            wordRange = new monacoEditor.Range(position.lineNumber, wordUntil.startColumn, position.lineNumber, wordUntil.endColumn);
            _context.next = 5;
            return regeneratorRuntime.awrap((0, _timelion_expression_input_helpers.suggest)(text, functionList.current, // it's important to offset the cursor position on 1 point left
            // because of PEG parser starts the line with 0, but monaco with 1
            position.column - 1, argValueSuggestions));

          case 5:
            suggestions = _context.sent;
            return _context.abrupt("return", {
              suggestions: suggestions ? suggestions.list.map(function (s) {
                return (0, _timelion_expression_input_helpers.getSuggestion)(s, suggestions.type, wordRange);
              }) : []
            });

          case 7:
          case "end":
            return _context.stop();
        }
      }
    });
  }, [argValueSuggestions]);
  var provideHover = (0, _react.useCallback)(function _callee2(model, position) {
    var suggestions;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap((0, _timelion_expression_input_helpers.suggest)(model.getValue(), functionList.current, // it's important to offset the cursor position on 1 point left
            // because of PEG parser starts the line with 0, but monaco with 1
            position.column - 1, argValueSuggestions));

          case 2:
            suggestions = _context2.sent;
            return _context2.abrupt("return", {
              contents: suggestions ? suggestions.list.map(function (s) {
                return {
                  value: s.help
                };
              }) : []
            });

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    });
  }, [argValueSuggestions]);
  (0, _react.useEffect)(function () {
    if (kibana.services.http) {
      kibana.services.http.get('../api/timelion/functions').then(function (data) {
        functionList.current = data;
      });
    }
  }, [kibana.services.http]);
  return _react.default.createElement("div", {
    className: "timExpressionInput"
  }, _react.default.createElement(_eui.EuiFormLabel, null, _react.default.createElement(_react2.FormattedMessage, {
    id: "timelion.vis.expressionLabel",
    defaultMessage: "Timelion expression"
  })), _react.default.createElement("div", {
    className: "timExpressionInput__editor"
  }, _react.default.createElement("div", {
    className: "timExpressionInput__absolute"
  }, _react.default.createElement(_public.CodeEditor, {
    languageId: LANGUAGE_ID,
    value: value,
    onChange: setValue,
    suggestionProvider: {
      triggerCharacters: ['.', ',', '(', '=', ':'],
      provideCompletionItems: provideCompletionItems
    },
    hoverProvider: {
      provideHover: provideHover
    },
    options: {
      fixedOverflowWidgets: true,
      fontSize: 14,
      folding: false,
      lineNumbers: 'off',
      scrollBeyondLastLine: false,
      minimap: {
        enabled: false
      },
      wordBasedSuggestions: false,
      wordWrap: 'on',
      wrappingIndent: 'indent'
    },
    languageConfiguration: {
      autoClosingPairs: [{
        open: '(',
        close: ')'
      }]
    }
  }))));
}