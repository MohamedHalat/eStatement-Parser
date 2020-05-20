"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AceTokensProvider = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
// Brace's token information types are not accurate.
var toToken = function toToken(lineNumber, column, token) {
  return {
    type: token.type,
    value: token.value,
    position: {
      lineNumber: lineNumber,
      column: column
    }
  };
};

var toTokens = function toTokens(lineNumber, tokens) {
  var acc = '';
  return tokens.map(function (token) {
    var column = acc.length + 1;
    acc += token.value;
    return toToken(lineNumber, column, token);
  });
};

var extractTokenFromAceTokenRow = function extractTokenFromAceTokenRow(lineNumber, column, aceTokens) {
  var acc = '';
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = aceTokens[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var token = _step.value;
      var start = acc.length + 1;
      acc += token.value;
      var end = acc.length;
      if (column < start) continue;
      if (column > end + 1) continue;
      return toToken(lineNumber, start, token);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return null;
};

var AceTokensProvider =
/*#__PURE__*/
function () {
  function AceTokensProvider(session) {
    _classCallCheck(this, AceTokensProvider);

    this.session = session;
  }

  _createClass(AceTokensProvider, [{
    key: "getTokens",
    value: function getTokens(lineNumber) {
      if (lineNumber < 1) return null; // Important: must use a .session.getLength because this is a cached value.
      // Calculating line length here will lead to performance issues because this function
      // may be called inside of tight loops.

      var lineCount = this.session.getLength();

      if (lineNumber > lineCount) {
        return null;
      }

      var tokens = this.session.getTokens(lineNumber - 1);

      if (!tokens || !tokens.length) {
        // We are inside of the document but have no tokens for this line. Return an empty
        // array to represent this empty line.
        return [];
      }

      return toTokens(lineNumber, tokens);
    }
  }, {
    key: "getTokenAt",
    value: function getTokenAt(pos) {
      var tokens = this.session.getTokens(pos.lineNumber - 1);

      if (tokens) {
        return extractTokenFromAceTokenRow(pos.lineNumber, pos.column, tokens);
      }

      return null;
    }
  }]);

  return AceTokensProvider;
}();

exports.AceTokensProvider = AceTokensProvider;