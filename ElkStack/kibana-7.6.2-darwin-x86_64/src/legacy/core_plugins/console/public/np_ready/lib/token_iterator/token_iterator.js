"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TokenIterator = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
function isColumnInTokenRange(column, token) {
  if (column < token.position.column) {
    return false;
  }

  return column <= token.position.column + token.value.length;
}

var TokenIterator =
/*#__PURE__*/
function () {
  function TokenIterator(provider, startPosition) {
    _classCallCheck(this, TokenIterator);

    this.provider = provider;

    _defineProperty(this, "currentTokenIdx", -1);

    _defineProperty(this, "currentPosition", {
      lineNumber: -1,
      column: -1
    });

    _defineProperty(this, "tokensLineCache", void 0);

    this.tokensLineCache = this.provider.getTokens(startPosition.lineNumber) || [];
    var tokenIdx = this.tokensLineCache.findIndex(function (token) {
      return isColumnInTokenRange(startPosition.column, token);
    });

    if (tokenIdx > -1) {
      this.updatePosition({
        tokenIdx: tokenIdx,
        position: this.tokensLineCache[tokenIdx].position
      });
    } else {
      this.updatePosition({
        tokenIdx: -1,
        position: startPosition
      });
    }
  }

  _createClass(TokenIterator, [{
    key: "updateLineTokens",
    value: function updateLineTokens(tokens) {
      this.tokensLineCache = tokens;
    }
  }, {
    key: "updatePosition",
    value: function updatePosition(info) {
      this.currentTokenIdx = info.tokenIdx;
      this.currentPosition = _objectSpread({}, info.position);
    }
  }, {
    key: "step",
    value: function step(direction) {
      var nextIdx = this.currentTokenIdx + direction;
      var nextToken = this.tokensLineCache[nextIdx]; // Check current row

      if (nextToken) {
        this.updatePosition({
          tokenIdx: nextIdx,
          position: nextToken.position
        });
        return nextToken;
      } // Check next line


      var nextLineNumber = this.currentPosition.lineNumber + direction;
      var nextLineTokens = this.provider.getTokens(nextLineNumber);

      if (nextLineTokens) {
        this.updateLineTokens(nextLineTokens);
        var idx;

        if (direction > 0) {
          nextToken = nextLineTokens[0];
          idx = 0;
        } else {
          nextToken = nextLineTokens[nextLineTokens.length - 1];
          idx = nextToken ? nextLineTokens.length - 1 : 0;
        }

        var nextPosition = nextToken ? nextToken.position : {
          column: 1,
          lineNumber: nextLineNumber
        };
        this.updatePosition({
          tokenIdx: idx,
          position: nextPosition
        });
        return nextToken || null;
      } // We have reached the beginning or the end


      return null;
    }
    /**
     * Report the token under the iterator's internal cursor.
     */

  }, {
    key: "getCurrentToken",
    value: function getCurrentToken() {
      return this.tokensLineCache[this.currentTokenIdx] || null;
    }
    /**
     * Return the current position in the document.
     *
     * This will correspond to the position of a token.
     *
     * Note: this method may not be that useful given {@link getCurrentToken}.
     */

  }, {
    key: "getCurrentPosition",
    value: function getCurrentPosition() {
      return this.currentPosition;
    }
    /**
     * Go to the previous token in the document.
     *
     * Stepping to the previous token can return null under the following conditions:
     *
     * 1. We are at the beginning of the document.
     * 2. The preceding line is empty - no tokens.
     * 3. We are in an empty document - not text, so no tokens.
     */

  }, {
    key: "stepBackward",
    value: function stepBackward() {
      return this.step(-1);
    }
    /**
     * See documentation for {@link stepBackward}.
     *
     * Steps forward.
     */

  }, {
    key: "stepForward",
    value: function stepForward() {
      return this.step(1);
    }
    /**
     * Get the line number of the current token.
     *
     * Can be considered a convenience method for:
     *
     * ```ts
     * it.getCurrentToken().lineNumber;
     * ```
     */

  }, {
    key: "getCurrentTokenLineNumber",
    value: function getCurrentTokenLineNumber() {
      var currentToken = this.getCurrentToken();

      if (currentToken) {
        return currentToken.position.lineNumber;
      }

      return null;
    }
    /**
     * See documentation for {@link getCurrentTokenLineNumber}.
     *
     * Substitutes `column` for `lineNumber`.
     */

  }, {
    key: "getCurrentTokenColumn",
    value: function getCurrentTokenColumn() {
      var currentToken = this.getCurrentToken();

      if (currentToken) {
        return currentToken.position.column;
      }

      return null;
    }
  }]);

  return TokenIterator;
}();

exports.TokenIterator = TokenIterator;