"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducer = exports.initialValue = void 0;

var _immer = require("immer");

var _function = require("fp-ts/lib/function");

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
var initialValue = (0, _immer.produce)({
  ready: false,
  settings: null
}, _function.identity);
exports.initialValue = initialValue;

var reducer = function reducer(state, action) {
  return (0, _immer.produce)(state, function (draft) {
    if (action.type === 'setInputEditor') {
      if (action.payload) {
        draft.ready = true;
      }

      return;
    }

    if (action.type === 'updateSettings') {
      draft.settings = action.payload;
      return;
    }

    return draft;
  });
};

exports.reducer = reducer;