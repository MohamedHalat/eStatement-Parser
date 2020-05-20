"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createKbnUrlStateStorage = void 0;

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _url = require("../../state_management/url");

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
 * Implements syncing to/from url strategies.
 * Replicates what was implemented in state (AppState, GlobalState)
 * Both expanded and hashed use cases
 */
var createKbnUrlStateStorage = function createKbnUrlStateStorage() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    useHash: false
  },
      _ref$useHash = _ref.useHash,
      useHash = _ref$useHash === void 0 ? false : _ref$useHash,
      history = _ref.history;

  var url = (0, _url.createKbnUrlControls)(history);
  return {
    set: function set(key, state) {
      var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
        replace: false
      },
          _ref2$replace = _ref2.replace,
          replace = _ref2$replace === void 0 ? false : _ref2$replace;

      // syncState() utils doesn't wait for this promise
      return url.updateAsync(function (currentUrl) {
        return (0, _url.setStateToKbnUrl)(key, state, {
          useHash: useHash
        }, currentUrl);
      }, replace);
    },
    get: function get(key) {
      return (0, _url.getStateFromKbnUrl)(key);
    },
    change$: function change$(key) {
      return new _rxjs.Observable(function (observer) {
        var unlisten = url.listen(function () {
          observer.next();
        });
        return function () {
          unlisten();
        };
      }).pipe((0, _operators.map)(function () {
        return (0, _url.getStateFromKbnUrl)(key);
      }), (0, _operators.share)());
    },
    flush: function flush() {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref3$replace = _ref3.replace,
          replace = _ref3$replace === void 0 ? false : _ref3$replace;

      url.flush(replace);
    },
    cancel: function cancel() {
      url.cancel();
    }
  };
};

exports.createKbnUrlStateStorage = createKbnUrlStateStorage;