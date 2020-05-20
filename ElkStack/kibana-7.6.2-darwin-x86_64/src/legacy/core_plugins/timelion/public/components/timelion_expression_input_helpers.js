"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.suggest = suggest;
exports.getSuggestion = getSuggestion;
exports.SUGGESTION_TYPE = void 0;

var _lodash = require("lodash");

var _pegjs = _interopRequireDefault(require("pegjs"));

var monacoEditor = _interopRequireWildcard(require("monaco-editor/esm/vs/editor/editor.api"));

var _chain = _interopRequireDefault(require("raw-loader!../chain.peg"));

var _i18n = require("@kbn/i18n");

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
var Parser = _pegjs.default.generate(_chain.default);

var SUGGESTION_TYPE;
exports.SUGGESTION_TYPE = SUGGESTION_TYPE;

(function (SUGGESTION_TYPE) {
  SUGGESTION_TYPE["ARGUMENTS"] = "arguments";
  SUGGESTION_TYPE["ARGUMENT_VALUE"] = "argument_value";
  SUGGESTION_TYPE["FUNCTIONS"] = "functions";
})(SUGGESTION_TYPE || (exports.SUGGESTION_TYPE = SUGGESTION_TYPE = {}));

function inLocation(cursorPosition, location) {
  return cursorPosition >= location.min && cursorPosition <= location.max;
}

function getArgumentsHelp(functionHelp) {
  var functionArgs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (!functionHelp) {
    return [];
  } // Do not provide 'inputSeries' as argument suggestion for chainable functions


  var argsHelp = functionHelp.chainable ? functionHelp.args.slice(1) : functionHelp.args.slice(0); // ignore arguments that are already provided in function declaration

  var functionArgNames = functionArgs.map(function (arg) {
    return arg.name;
  });
  return argsHelp.filter(function (arg) {
    return !functionArgNames.includes(arg.name);
  });
}

function extractSuggestionsFromParsedResult(result, cursorPosition, functionList, argValueSuggestions) {
  var activeFunc, functionHelp, openParen, activeArg, functionName, functionArgs, argName, partialInput, valueSuggestions, _ref3, staticSuggestions, argsHelp, argumentSuggestions;

  return regeneratorRuntime.async(function extractSuggestionsFromParsedResult$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          activeFunc = result.functions.find(function (_ref) {
            var location = _ref.location;
            return inLocation(cursorPosition, location);
          });

          if (activeFunc) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return");

        case 3:
          functionHelp = functionList.find(function (_ref2) {
            var name = _ref2.name;
            return name === activeFunc.function;
          });

          if (functionHelp) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return");

        case 6:
          // return function suggestion when cursor is outside of parentheses
          // location range includes '.', function name, and '('.
          openParen = activeFunc.location.min + activeFunc.function.length + 2;

          if (!(cursorPosition < openParen)) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", {
            list: [functionHelp],
            type: SUGGESTION_TYPE.FUNCTIONS
          });

        case 9:
          // return argument value suggestions when cursor is inside argument value
          activeArg = activeFunc.arguments.find(function (argument) {
            return inLocation(cursorPosition, argument.location);
          });

          if (!(activeArg && activeArg.type === 'namedArg' && inLocation(cursorPosition, activeArg.value.location))) {
            _context.next = 22;
            break;
          }

          functionName = activeFunc.function, functionArgs = activeFunc.arguments;
          argName = activeArg.name, partialInput = activeArg.value.text;

          if (!argValueSuggestions.hasDynamicSuggestionsForArgument(functionName, argName)) {
            _context.next = 19;
            break;
          }

          _context.next = 16;
          return regeneratorRuntime.awrap(argValueSuggestions.getDynamicSuggestionsForArgument(functionName, argName, functionArgs, partialInput));

        case 16:
          valueSuggestions = _context.sent;
          _context.next = 21;
          break;

        case 19:
          _ref3 = functionHelp.args.find(function (arg) {
            return arg.name === activeArg.name;
          }) || {}, staticSuggestions = _ref3.suggestions;
          valueSuggestions = argValueSuggestions.getStaticSuggestionsForInput(partialInput, staticSuggestions);

        case 21:
          return _context.abrupt("return", {
            list: valueSuggestions,
            type: SUGGESTION_TYPE.ARGUMENT_VALUE
          });

        case 22:
          // return argument suggestions
          argsHelp = getArgumentsHelp(functionHelp, activeFunc.arguments);
          argumentSuggestions = argsHelp.filter(function (arg) {
            if ((0, _lodash.get)(activeArg, 'type') === 'namedArg') {
              return (0, _lodash.startsWith)(arg.name, activeArg.name);
            } else if (activeArg) {
              return (0, _lodash.startsWith)(arg.name, activeArg.text);
            }

            return true;
          });
          return _context.abrupt("return", {
            list: argumentSuggestions,
            type: SUGGESTION_TYPE.ARGUMENTS
          });

        case 25:
        case "end":
          return _context.stop();
      }
    }
  });
}

function suggest(expression, functionList, cursorPosition, argValueSuggestions) {
  var result, message, list, _message, _functionName, _functionArgs, _functionHelp, _message2, _argName, _functionName2, _functionArgs2, _valueSuggestions, _functionHelp2, argHelp;

  return regeneratorRuntime.async(function suggest$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Parser.parse(expression));

        case 3:
          result = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap(extractSuggestionsFromParsedResult(result, cursorPosition, functionList, argValueSuggestions));

        case 6:
          return _context2.abrupt("return", _context2.sent);

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          _context2.prev = 11;
          // The grammar will throw an error containing a message if the expression is formatted
          // correctly and is prepared to accept suggestions. If the expression is not formatted
          // correctly the grammar will just throw a regular PEG SyntaxError, and this JSON.parse
          // attempt will throw an error.
          message = JSON.parse(_context2.t0.message);
          _context2.next = 18;
          break;

        case 15:
          _context2.prev = 15;
          _context2.t1 = _context2["catch"](11);
          return _context2.abrupt("return");

        case 18:
          _context2.t2 = message.type;
          _context2.next = _context2.t2 === 'incompleteFunction' ? 21 : _context2.t2 === 'incompleteArgument' ? 23 : _context2.t2 === 'incompleteArgumentValue' ? 26 : 37;
          break;

        case 21:
          if (message.function) {
            // The user has start typing a function name, so we'll filter the list down to only
            // possible matches.
            list = functionList.filter(function (func) {
              return (0, _lodash.startsWith)(func.name, message.function);
            });
          } else {
            // The user hasn't typed anything yet, so we'll just return the entire list.
            list = functionList;
          }

          return _context2.abrupt("return", {
            list: list,
            type: SUGGESTION_TYPE.FUNCTIONS
          });

        case 23:
          _message = message, _functionName = _message.currentFunction, _functionArgs = _message.currentArgs;
          _functionHelp = functionList.find(function (func) {
            return func.name === _functionName;
          });
          return _context2.abrupt("return", {
            list: getArgumentsHelp(_functionHelp, _functionArgs),
            type: SUGGESTION_TYPE.ARGUMENTS
          });

        case 26:
          _message2 = message, _argName = _message2.name, _functionName2 = _message2.currentFunction, _functionArgs2 = _message2.currentArgs;
          _valueSuggestions = [];

          if (!argValueSuggestions.hasDynamicSuggestionsForArgument(_functionName2, _argName)) {
            _context2.next = 34;
            break;
          }

          _context2.next = 31;
          return regeneratorRuntime.awrap(argValueSuggestions.getDynamicSuggestionsForArgument(_functionName2, _argName, _functionArgs2));

        case 31:
          _valueSuggestions = _context2.sent;
          _context2.next = 36;
          break;

        case 34:
          _functionHelp2 = functionList.find(function (func) {
            return func.name === _functionName2;
          });

          if (_functionHelp2) {
            argHelp = _functionHelp2.args.find(function (arg) {
              return arg.name === _argName;
            });

            if (argHelp && argHelp.suggestions) {
              _valueSuggestions = argHelp.suggestions;
            }
          }

        case 36:
          return _context2.abrupt("return", {
            list: _valueSuggestions,
            type: SUGGESTION_TYPE.ARGUMENT_VALUE
          });

        case 37:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9], [11, 15]]);
}

function getSuggestion(suggestion, type, range) {
  var kind = monacoEditor.languages.CompletionItemKind.Method;
  var insertText = suggestion.name;
  var insertTextRules;
  var detail = '';
  var command;

  switch (type) {
    case SUGGESTION_TYPE.ARGUMENTS:
      command = {
        title: 'Trigger Suggestion Dialog',
        id: 'editor.action.triggerSuggest'
      };
      kind = monacoEditor.languages.CompletionItemKind.Property;
      insertText = "".concat(insertText, "=");
      detail = "".concat(_i18n.i18n.translate('timelion.expressionSuggestions.argument.description.acceptsText', {
        defaultMessage: 'Accepts'
      }), ": ").concat(suggestion.types);
      break;

    case SUGGESTION_TYPE.FUNCTIONS:
      command = {
        title: 'Trigger Suggestion Dialog',
        id: 'editor.action.triggerSuggest'
      };
      kind = monacoEditor.languages.CompletionItemKind.Function;
      insertText = "".concat(insertText, "($0)");
      insertTextRules = monacoEditor.languages.CompletionItemInsertTextRule.InsertAsSnippet;
      detail = "(".concat(suggestion.chainable ? _i18n.i18n.translate('timelion.expressionSuggestions.func.description.chainableHelpText', {
        defaultMessage: 'Chainable'
      }) : _i18n.i18n.translate('timelion.expressionSuggestions.func.description.dataSourceHelpText', {
        defaultMessage: 'Data source'
      }), ")");
      break;

    case SUGGESTION_TYPE.ARGUMENT_VALUE:
      var param = suggestion.name.split(':');

      if (param.length === 1 || param[1]) {
        insertText = "".concat(param.length === 1 ? insertText : param[1], ",");
      }

      command = {
        title: 'Trigger Suggestion Dialog',
        id: 'editor.action.triggerSuggest'
      };
      kind = monacoEditor.languages.CompletionItemKind.Property;
      detail = suggestion.help || '';
      break;
  }

  return {
    detail: detail,
    insertText: insertText,
    insertTextRules: insertTextRules,
    kind: kind,
    label: suggestion.name,
    documentation: suggestion.help,
    command: command,
    range: range
  };
}