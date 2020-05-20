"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SenseEditor = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _row_parser = _interopRequireDefault(require("../../../lib/row_parser"));

var utils = _interopRequireWildcard(require("../../../lib/utils/utils"));

var es = _interopRequireWildcard(require("../../../lib/es/es"));

var _factories = require("../../factories");

var _autocomplete = _interopRequireDefault(require("../../../lib/autocomplete/autocomplete"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SenseEditor =
/*#__PURE__*/
function () {
  // @ts-ignore
  function SenseEditor(coreEditor) {
    var _this = this;

    _classCallCheck(this, SenseEditor);

    this.coreEditor = coreEditor;

    _defineProperty(this, "currentReqRange", void 0);

    _defineProperty(this, "parser", void 0);

    _defineProperty(this, "autocomplete", void 0);

    _defineProperty(this, "prevRequestStart", function (rowOrPos) {
      var curRow;

      if (rowOrPos == null) {
        curRow = _this.coreEditor.getCurrentPosition().lineNumber;
      } else if (_lodash.default.isObject(rowOrPos)) {
        curRow = rowOrPos.lineNumber;
      } else {
        curRow = rowOrPos;
      }

      while (curRow > 0 && !_this.parser.isStartRequestRow(curRow, _this.coreEditor)) {
        curRow--;
      }

      return {
        lineNumber: curRow,
        column: 1
      };
    });

    _defineProperty(this, "nextRequestStart", function (rowOrPos) {
      var curRow;

      if (rowOrPos == null) {
        curRow = _this.coreEditor.getCurrentPosition().lineNumber;
      } else if (_lodash.default.isObject(rowOrPos)) {
        curRow = rowOrPos.lineNumber;
      } else {
        curRow = rowOrPos;
      }

      var maxLines = _this.coreEditor.getLineCount();

      for (; curRow < maxLines - 1; curRow++) {
        if (_this.parser.isStartRequestRow(curRow, _this.coreEditor)) {
          break;
        }
      }

      return {
        row: curRow,
        column: 0
      };
    });

    _defineProperty(this, "autoIndent", _lodash.default.debounce(function _callee() {
      var reqRange, parsedReq, indent, formattedData;
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(_this.coreEditor.waitForLatestTokens());

            case 2:
              _context.next = 4;
              return regeneratorRuntime.awrap(_this.getRequestRange());

            case 4:
              reqRange = _context.sent;

              if (reqRange) {
                _context.next = 7;
                break;
              }

              return _context.abrupt("return");

            case 7:
              _context.next = 9;
              return regeneratorRuntime.awrap(_this.getRequest());

            case 9:
              parsedReq = _context.sent;

              if (parsedReq) {
                _context.next = 12;
                break;
              }

              return _context.abrupt("return");

            case 12:
              if (parsedReq.data && parsedReq.data.length > 0) {
                indent = parsedReq.data.length === 1; // unindent multi docs by default

                formattedData = utils.formatRequestBodyDoc(parsedReq.data, indent);

                if (!formattedData.changed) {
                  // toggle.
                  indent = !indent;
                  formattedData = utils.formatRequestBodyDoc(parsedReq.data, indent);
                }

                parsedReq.data = formattedData.data;

                _this.replaceRequestRange(parsedReq, reqRange);
              }

            case 13:
            case "end":
              return _context.stop();
          }
        }
      });
    }, 25));

    _defineProperty(this, "update", function _callee2(data) {
      var reTokenizeAll,
          _args2 = arguments;
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              reTokenizeAll = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : false;
              return _context2.abrupt("return", _this.coreEditor.setValue(data, reTokenizeAll));

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      });
    });

    _defineProperty(this, "replaceRequestRange", function (newRequest, requestRange) {
      var text = utils.textFromRequest(newRequest);

      if (requestRange) {
        _this.coreEditor.replaceRange(requestRange, text);
      } else {
        // just insert where we are
        _this.coreEditor.insert(_this.coreEditor.getCurrentPosition(), text);
      }
    });

    _defineProperty(this, "getRequestRange", function _callee3(lineNumber) {
      var reqStart, reqEnd;
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(_this.coreEditor.waitForLatestTokens());

            case 2:
              if (!_this.parser.isInBetweenRequestsRow(lineNumber)) {
                _context3.next = 4;
                break;
              }

              return _context3.abrupt("return", null);

            case 4:
              reqStart = _this.prevRequestStart(lineNumber);
              reqEnd = _this.nextRequestEnd(reqStart);
              return _context3.abrupt("return", {
                start: _objectSpread({}, reqStart),
                end: _objectSpread({}, reqEnd)
              });

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      });
    });

    _defineProperty(this, "expandRangeToRequestEdges", function _callee4() {
      var range,
          startLineNumber,
          endLineNumber,
          maxLine,
          endColumn,
          _args4 = arguments;
      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              range = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : _this.coreEditor.getSelectionRange();
              _context4.next = 3;
              return regeneratorRuntime.awrap(_this.coreEditor.waitForLatestTokens());

            case 3:
              startLineNumber = range.start.lineNumber;
              endLineNumber = range.end.lineNumber;
              maxLine = Math.max(1, _this.coreEditor.getLineCount());

              if (!_this.parser.isInBetweenRequestsRow(startLineNumber)) {
                _context4.next = 9;
                break;
              }

              _context4.next = 15;
              break;

            case 9:
              if (!(startLineNumber >= 1)) {
                _context4.next = 15;
                break;
              }

              if (!_this.parser.isStartRequestRow(startLineNumber)) {
                _context4.next = 12;
                break;
              }

              return _context4.abrupt("break", 15);

            case 12:
              startLineNumber--;
              _context4.next = 9;
              break;

            case 15:
              if (!(startLineNumber < 1 || startLineNumber > endLineNumber)) {
                _context4.next = 17;
                break;
              }

              return _context4.abrupt("return", null);

            case 17:
              if (!_this.parser.isInBetweenRequestsRow(endLineNumber)) {
                _context4.next = 26;
                break;
              }

            case 18:
              if (!(endLineNumber >= startLineNumber)) {
                _context4.next = 24;
                break;
              }

              if (!_this.parser.isEndRequestRow(endLineNumber)) {
                _context4.next = 21;
                break;
              }

              return _context4.abrupt("break", 24);

            case 21:
              endLineNumber--;
              _context4.next = 18;
              break;

            case 24:
              _context4.next = 32;
              break;

            case 26:
              if (!(endLineNumber <= maxLine)) {
                _context4.next = 32;
                break;
              }

              if (!_this.parser.isEndRequestRow(endLineNumber)) {
                _context4.next = 29;
                break;
              }

              return _context4.abrupt("break", 32);

            case 29:
              endLineNumber++;
              _context4.next = 26;
              break;

            case 32:
              if (!(endLineNumber < startLineNumber || endLineNumber > maxLine)) {
                _context4.next = 34;
                break;
              }

              return _context4.abrupt("return", null);

            case 34:
              endColumn = (_this.coreEditor.getLineValue(endLineNumber) || '').replace(/\s+$/, '').length + 1;
              return _context4.abrupt("return", {
                start: {
                  lineNumber: startLineNumber,
                  column: 1
                },
                end: {
                  lineNumber: endLineNumber,
                  column: endColumn
                }
              });

            case 36:
            case "end":
              return _context4.stop();
          }
        }
      });
    });

    _defineProperty(this, "getRequestInRange", function _callee5(range) {
      var request, pos, tokenIter, t, bodyStartLineNumber, dataEndPos, bodyRange, data;
      return regeneratorRuntime.async(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(_this.coreEditor.waitForLatestTokens());

            case 2:
              if (range) {
                _context5.next = 4;
                break;
              }

              return _context5.abrupt("return", null);

            case 4:
              request = {
                method: '',
                data: [],
                url: null,
                range: range
              };
              pos = range.start;
              tokenIter = (0, _factories.createTokenIterator)({
                editor: _this.coreEditor,
                position: pos
              });
              t = tokenIter.getCurrentToken();

              if (_this.parser.isEmptyToken(t)) {
                // if the row starts with some spaces, skip them.
                t = _this.parser.nextNonEmptyToken(tokenIter);
              }

              if (!(t == null)) {
                _context5.next = 11;
                break;
              }

              return _context5.abrupt("return", null);

            case 11:
              request.method = t.value;
              t = _this.parser.nextNonEmptyToken(tokenIter);

              if (!(!t || t.type === 'method')) {
                _context5.next = 15;
                break;
              }

              return _context5.abrupt("return", null);

            case 15:
              request.url = '';

              while (t && t.type && t.type.indexOf('url') === 0) {
                request.url += t.value;
                t = tokenIter.stepForward();
              }

              if (_this.parser.isEmptyToken(t)) {
                // if the url row ends with some spaces, skip them.
                t = _this.parser.nextNonEmptyToken(tokenIter);
              }

              bodyStartLineNumber = (t ? 0 : 1) + tokenIter.getCurrentPosition().lineNumber; // artificially increase end of docs.

              while (bodyStartLineNumber < range.end.lineNumber || bodyStartLineNumber === range.end.lineNumber && 1 < range.end.column) {
                dataEndPos = _this.nextDataDocEnd({
                  lineNumber: bodyStartLineNumber,
                  column: 1
                });
                bodyRange = {
                  start: {
                    lineNumber: bodyStartLineNumber,
                    column: 1
                  },
                  end: dataEndPos
                };
                data = _this.coreEditor.getValueInRange(bodyRange);
                request.data.push(data.trim());
                bodyStartLineNumber = dataEndPos.lineNumber + 1;
              }

              return _context5.abrupt("return", request);

            case 21:
            case "end":
              return _context5.stop();
          }
        }
      });
    });

    _defineProperty(this, "getRequestsInRange", function _callee6() {
      var range,
          includeNonRequestBlocks,
          expandedRange,
          requests,
          rangeStartCursor,
          endLineNumber,
          currentLineNumber,
          flushNonRequestBlock,
          _request,
          _args6 = arguments;

      return regeneratorRuntime.async(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              range = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : _this.coreEditor.getSelectionRange();
              includeNonRequestBlocks = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : false;
              _context6.next = 4;
              return regeneratorRuntime.awrap(_this.coreEditor.waitForLatestTokens());

            case 4:
              if (range) {
                _context6.next = 6;
                break;
              }

              return _context6.abrupt("return", []);

            case 6:
              _context6.next = 8;
              return regeneratorRuntime.awrap(_this.expandRangeToRequestEdges(range));

            case 8:
              expandedRange = _context6.sent;

              if (expandedRange) {
                _context6.next = 11;
                break;
              }

              return _context6.abrupt("return", []);

            case 11:
              requests = [];
              rangeStartCursor = expandedRange.start.lineNumber;
              endLineNumber = expandedRange.end.lineNumber; // move to the next request start (during the second iterations this may not be exactly on a request

              currentLineNumber = expandedRange.start.lineNumber;

              flushNonRequestBlock = function flushNonRequestBlock() {
                if (includeNonRequestBlocks) {
                  var nonRequestPrefixBlock = _this.coreEditor.getLines(rangeStartCursor, currentLineNumber - 1).join('\n');

                  if (nonRequestPrefixBlock) {
                    requests.push(nonRequestPrefixBlock);
                  }
                }
              };

            case 16:
              if (!(currentLineNumber <= endLineNumber)) {
                _context6.next = 33;
                break;
              }

              if (!_this.parser.isStartRequestRow(currentLineNumber)) {
                _context6.next = 30;
                break;
              }

              flushNonRequestBlock();
              _context6.next = 21;
              return regeneratorRuntime.awrap(_this.getRequest(currentLineNumber));

            case 21:
              _request = _context6.sent;

              if (_request) {
                _context6.next = 26;
                break;
              }

              return _context6.abrupt("return", requests);

            case 26:
              requests.push(_request);
              rangeStartCursor = currentLineNumber = _request.range.end.lineNumber + 1;

            case 28:
              _context6.next = 31;
              break;

            case 30:
              ++currentLineNumber;

            case 31:
              _context6.next = 16;
              break;

            case 33:
              flushNonRequestBlock();
              return _context6.abrupt("return", requests);

            case 35:
            case "end":
              return _context6.stop();
          }
        }
      });
    });

    _defineProperty(this, "getRequest", function _callee7(row) {
      var range;
      return regeneratorRuntime.async(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return regeneratorRuntime.awrap(_this.coreEditor.waitForLatestTokens());

            case 2:
              if (!_this.parser.isInBetweenRequestsRow(row)) {
                _context7.next = 4;
                break;
              }

              return _context7.abrupt("return", null);

            case 4:
              _context7.next = 6;
              return regeneratorRuntime.awrap(_this.getRequestRange(row));

            case 6:
              range = _context7.sent;
              return _context7.abrupt("return", _this.getRequestInRange(range));

            case 8:
            case "end":
              return _context7.stop();
          }
        }
      });
    });

    _defineProperty(this, "moveToPreviousRequestEdge", function _callee8() {
      var pos;
      return regeneratorRuntime.async(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return regeneratorRuntime.awrap(_this.coreEditor.waitForLatestTokens());

            case 2:
              pos = _this.coreEditor.getCurrentPosition();

              for (pos.lineNumber--; pos.lineNumber > 1 && !_this.parser.isRequestEdge(pos.lineNumber); pos.lineNumber--) {// loop for side effects
              }

              _this.coreEditor.moveCursorToPosition({
                lineNumber: pos.lineNumber,
                column: 1
              });

            case 5:
            case "end":
              return _context8.stop();
          }
        }
      });
    });

    _defineProperty(this, "moveToNextRequestEdge", function _callee9(moveOnlyIfNotOnEdge) {
      var pos, maxRow;
      return regeneratorRuntime.async(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return regeneratorRuntime.awrap(_this.coreEditor.waitForLatestTokens());

            case 2:
              pos = _this.coreEditor.getCurrentPosition();
              maxRow = _this.coreEditor.getLineCount();

              if (!moveOnlyIfNotOnEdge) {
                pos.lineNumber++;
              }

              for (; pos.lineNumber < maxRow && !_this.parser.isRequestEdge(pos.lineNumber); pos.lineNumber++) {// loop for side effects
              }

              _this.coreEditor.moveCursorToPosition({
                lineNumber: pos.lineNumber,
                column: 1
              });

            case 7:
            case "end":
              return _context9.stop();
          }
        }
      });
    });

    _defineProperty(this, "nextRequestEnd", function (pos) {
      pos = pos || _this.coreEditor.getCurrentPosition();

      var maxLines = _this.coreEditor.getLineCount();

      var curLineNumber = pos.lineNumber;

      for (; curLineNumber <= maxLines; ++curLineNumber) {
        var curRowMode = _this.parser.getRowParseMode(curLineNumber); // eslint-disable-next-line no-bitwise


        if ((curRowMode & _this.parser.MODE.REQUEST_END) > 0) {
          break;
        } // eslint-disable-next-line no-bitwise


        if (curLineNumber !== pos.lineNumber && (curRowMode & _this.parser.MODE.REQUEST_START) > 0) {
          break;
        }
      }

      var column = (_this.coreEditor.getLineValue(curLineNumber) || '').replace(/\s+$/, '').length + 1;
      return {
        lineNumber: curLineNumber,
        column: column
      };
    });

    _defineProperty(this, "nextDataDocEnd", function (pos) {
      pos = pos || _this.coreEditor.getCurrentPosition();
      var curLineNumber = pos.lineNumber;

      var maxLines = _this.coreEditor.getLineCount();

      for (; curLineNumber < maxLines; curLineNumber++) {
        var curRowMode = _this.parser.getRowParseMode(curLineNumber); // eslint-disable-next-line no-bitwise


        if ((curRowMode & _this.parser.MODE.REQUEST_END) > 0) {
          break;
        } // eslint-disable-next-line no-bitwise


        if ((curRowMode & _this.parser.MODE.MULTI_DOC_CUR_DOC_END) > 0) {
          break;
        } // eslint-disable-next-line no-bitwise


        if (curLineNumber !== pos.lineNumber && (curRowMode & _this.parser.MODE.REQUEST_START) > 0) {
          break;
        }
      }

      var column = (_this.coreEditor.getLineValue(curLineNumber) || '').length + 1
      /* Range goes to 1 after last char */
      ;
      return {
        lineNumber: curLineNumber,
        column: column
      };
    });

    _defineProperty(this, "highlightCurrentRequestsAndUpdateActionBar", _lodash.default.debounce(function _callee10() {
      var expandedRange, cursorLineNumber;
      return regeneratorRuntime.async(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return regeneratorRuntime.awrap(_this.coreEditor.waitForLatestTokens());

            case 2:
              _context10.next = 4;
              return regeneratorRuntime.awrap(_this.expandRangeToRequestEdges());

            case 4:
              expandedRange = _context10.sent;

              if (!(expandedRange === null && _this.currentReqRange === null)) {
                _context10.next = 7;
                break;
              }

              return _context10.abrupt("return");

            case 7:
              if (!(expandedRange !== null && _this.currentReqRange !== null && expandedRange.start.lineNumber === _this.currentReqRange.start.lineNumber && expandedRange.end.lineNumber === _this.currentReqRange.end.lineNumber)) {
                _context10.next = 11;
                break;
              }

              // same request, now see if we are on the first line and update the action bar
              cursorLineNumber = _this.coreEditor.getCurrentPosition().lineNumber;

              if (cursorLineNumber === _this.currentReqRange.start.lineNumber) {
                _this.updateActionsBar();
              }

              return _context10.abrupt("return");

            case 11:
              if (_this.currentReqRange) {
                _this.coreEditor.removeMarker(_this.currentReqRange.markerRef);
              }

              _this.currentReqRange = expandedRange;

              if (_this.currentReqRange) {
                _this.currentReqRange.markerRef = _this.coreEditor.addMarker(_this.currentReqRange);
              }

              _this.updateActionsBar();

            case 15:
            case "end":
              return _context10.stop();
          }
        }
      });
    }, 25));

    _defineProperty(this, "getRequestsAsCURL", function _callee11(elasticsearchBaseUrl, range) {
      var requests, result;
      return regeneratorRuntime.async(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return regeneratorRuntime.awrap(_this.getRequestsInRange(range, true));

            case 2:
              requests = _context11.sent;
              result = _lodash.default.map(requests, function (req) {
                if (typeof req === 'string') {
                  // no request block
                  return req;
                }

                var esPath = req.url;
                var esMethod = req.method;
                var esData = req.data; // this is the first url defined in elasticsearch.hosts

                var url = es.constructESUrl(elasticsearchBaseUrl, esPath);
                var ret = 'curl -X' + esMethod + ' "' + url + '"';

                if (esData && esData.length) {
                  ret += " -H 'Content-Type: application/json' -d'\n";
                  var dataAsString = utils.collapseLiteralStrings(esData.join('\n')); // since Sense doesn't allow single quote json string any single qoute is within a string.

                  ret += dataAsString.replace(/'/g, '\\"');

                  if (esData.length > 1) {
                    ret += '\n';
                  } // end with a new line


                  ret += "'";
                }

                return ret;
              });
              return _context11.abrupt("return", result.join('\n'));

            case 5:
            case "end":
              return _context11.stop();
          }
        }
      });
    });

    _defineProperty(this, "updateActionsBar", function () {
      return _this.coreEditor.legacyUpdateUI(_this.currentReqRange);
    });

    this.currentReqRange = null;
    this.parser = new _row_parser.default(this.coreEditor);
    this.autocomplete = new _autocomplete.default({
      coreEditor: coreEditor,
      parser: this.parser
    });
    this.coreEditor.on('tokenizerUpdate', this.highlightCurrentRequestsAndUpdateActionBar.bind(this));
    this.coreEditor.on('changeCursor', this.highlightCurrentRequestsAndUpdateActionBar.bind(this));
    this.coreEditor.on('changeScrollTop', this.updateActionsBar.bind(this));
  }

  _createClass(SenseEditor, [{
    key: "getCoreEditor",
    value: function getCoreEditor() {
      return this.coreEditor;
    }
  }]);

  return SenseEditor;
}();

exports.SenseEditor = SenseEditor;