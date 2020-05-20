"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.split = void 0;

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

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

/**
 * Receives observable that emits strings, and returns a new observable
 * that also returns strings separated by delimiter.
 *
 * Input stream:
 *
 *     asdf.f -> df..aaa. -> dfsdf
 *
 * Output stream, assuming "." is used as delimiter:
 *
 *     asdf -> fdf -> aaa -> dfsdf
 *
 */
var split = function split() {
  var delimiter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '\n';
  return function (in$) {
    var out$ = new _rxjs.Subject();
    var startingText = '';
    in$.subscribe(function (chunk) {
      var messages = (startingText + chunk).split(delimiter); // We don't want to send the last message here, since it may or
      // may not be a partial message.

      messages.slice(0, -1).forEach(out$.next.bind(out$));
      startingText = messages.length ? messages[messages.length - 1] : '';
    }, out$.error.bind(out$), function () {
      out$.next(startingText);
      out$.complete();
    });
    return out$.pipe((0, _operators.filter)(Boolean));
  };
};

exports.split = split;