"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MODE = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
var MODE = {
  REQUEST_START: 2,
  IN_REQUEST: 4,
  MULTI_DOC_CUR_DOC_END: 8,
  REQUEST_END: 16,
  BETWEEN_REQUESTS: 32
}; // eslint-disable-next-line import/no-default-export

exports.MODE = MODE;

var RowParser =
/*#__PURE__*/
function () {
  function RowParser(editor) {
    _classCallCheck(this, RowParser);

    this.editor = editor;

    _defineProperty(this, "MODE", MODE);
  }

  _createClass(RowParser, [{
    key: "getRowParseMode",
    value: function getRowParseMode() {
      var lineNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.editor.getCurrentPosition().lineNumber;
      var linesCount = this.editor.getLineCount();

      if (lineNumber > linesCount || lineNumber < 1) {
        return MODE.BETWEEN_REQUESTS;
      }

      var mode = this.editor.getLineState(lineNumber);

      if (!mode) {
        return MODE.BETWEEN_REQUESTS;
      } // shouldn't really happen
      // If another "start" mode is added here because we want to allow for new language highlighting
      // please see https://github.com/elastic/kibana/pull/51446 for a discussion on why
      // should consider a different approach.


      if (mode !== 'start' && mode !== 'start-sql') {
        return MODE.IN_REQUEST;
      }

      var line = (this.editor.getLineValue(lineNumber) || '').trim();

      if (!line || line[0] === '#') {
        return MODE.BETWEEN_REQUESTS;
      } // empty line or a comment waiting for a new req to start


      if (line.indexOf('}', line.length - 1) >= 0) {
        // check for a multi doc request (must start a new json doc immediately after this one end.
        lineNumber++;

        if (lineNumber < linesCount + 1) {
          line = (this.editor.getLineValue(lineNumber) || '').trim();

          if (line.indexOf('{') === 0) {
            // next line is another doc in a multi doc
            // eslint-disable-next-line no-bitwise
            return MODE.MULTI_DOC_CUR_DOC_END | MODE.IN_REQUEST;
          }
        } // eslint-disable-next-line no-bitwise


        return MODE.REQUEST_END | MODE.MULTI_DOC_CUR_DOC_END; // end of request
      } // check for single line requests


      lineNumber++;

      if (lineNumber >= linesCount + 1) {
        // eslint-disable-next-line no-bitwise
        return MODE.REQUEST_START | MODE.REQUEST_END;
      }

      line = (this.editor.getLineValue(lineNumber) || '').trim();

      if (line.indexOf('{') !== 0) {
        // next line is another request
        // eslint-disable-next-line no-bitwise
        return MODE.REQUEST_START | MODE.REQUEST_END;
      }

      return MODE.REQUEST_START;
    }
  }, {
    key: "rowPredicate",
    value: function rowPredicate(lineNumber, editor, value) {
      var mode = this.getRowParseMode(lineNumber); // eslint-disable-next-line no-bitwise

      return (mode & value) > 0;
    }
  }, {
    key: "isEndRequestRow",
    value: function isEndRequestRow(row, _e) {
      var editor = _e || this.editor;
      return this.rowPredicate(row, editor, MODE.REQUEST_END);
    }
  }, {
    key: "isRequestEdge",
    value: function isRequestEdge(row, _e) {
      var editor = _e || this.editor; // eslint-disable-next-line no-bitwise

      return this.rowPredicate(row, editor, MODE.REQUEST_END | MODE.REQUEST_START);
    }
  }, {
    key: "isStartRequestRow",
    value: function isStartRequestRow(row, _e) {
      var editor = _e || this.editor;
      return this.rowPredicate(row, editor, MODE.REQUEST_START);
    }
  }, {
    key: "isInBetweenRequestsRow",
    value: function isInBetweenRequestsRow(row, _e) {
      var editor = _e || this.editor;
      return this.rowPredicate(row, editor, MODE.BETWEEN_REQUESTS);
    }
  }, {
    key: "isInRequestsRow",
    value: function isInRequestsRow(row, _e) {
      var editor = _e || this.editor;
      return this.rowPredicate(row, editor, MODE.IN_REQUEST);
    }
  }, {
    key: "isMultiDocDocEndRow",
    value: function isMultiDocDocEndRow(row, _e) {
      var editor = _e || this.editor;
      return this.rowPredicate(row, editor, MODE.MULTI_DOC_CUR_DOC_END);
    }
  }, {
    key: "isEmptyToken",
    value: function isEmptyToken(tokenOrTokenIter) {
      var token = tokenOrTokenIter && tokenOrTokenIter.getCurrentToken ? tokenOrTokenIter.getCurrentToken() : tokenOrTokenIter;
      return !token || token.type === 'whitespace';
    }
  }, {
    key: "isUrlOrMethodToken",
    value: function isUrlOrMethodToken(tokenOrTokenIter) {
      var _ref, _ref2;

      var t = (_ref = (_ref2 = tokenOrTokenIter) === null || _ref2 === void 0 ? void 0 : _ref2.getCurrentToken()) !== null && _ref !== void 0 ? _ref : tokenOrTokenIter;
      return t && t.type && (t.type === 'method' || t.type.indexOf('url') === 0);
    }
  }, {
    key: "nextNonEmptyToken",
    value: function nextNonEmptyToken(tokenIter) {
      var t = tokenIter.stepForward();

      while (t && this.isEmptyToken(t)) {
        t = tokenIter.stepForward();
      }

      return t;
    }
  }, {
    key: "prevNonEmptyToken",
    value: function prevNonEmptyToken(tokenIter) {
      var t = tokenIter.stepBackward(); // empty rows return null token.

      while ((t || tokenIter.getCurrentPosition().lineNumber > 1) && this.isEmptyToken(t)) {
        t = tokenIter.stepBackward();
      }

      return t;
    }
  }]);

  return RowParser;
}();

exports.default = RowParser;