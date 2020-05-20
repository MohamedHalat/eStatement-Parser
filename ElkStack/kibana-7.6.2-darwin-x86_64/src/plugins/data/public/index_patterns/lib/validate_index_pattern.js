"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateIndexPattern = validateIndexPattern;

var _types = require("./types");

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
function indexPatternContainsSpaces(indexPattern) {
  return indexPattern.includes(' ');
}

function findIllegalCharacters(indexPattern) {
  var illegalCharacters = _types.ILLEGAL_CHARACTERS_VISIBLE.reduce(function (chars, char) {
    if (indexPattern.includes(char)) {
      chars.push(char);
    }

    return chars;
  }, []);

  return illegalCharacters;
}

function validateIndexPattern(indexPattern) {
  var errors = {};
  var illegalCharacters = findIllegalCharacters(indexPattern);

  if (illegalCharacters.length) {
    errors[_types.ILLEGAL_CHARACTERS_KEY] = illegalCharacters;
  }

  if (indexPatternContainsSpaces(indexPattern)) {
    errors[_types.CONTAINS_SPACES_KEY] = true;
  }

  return errors;
}