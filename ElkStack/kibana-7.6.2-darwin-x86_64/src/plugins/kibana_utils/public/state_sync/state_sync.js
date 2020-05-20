"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.syncState = syncState;
exports.syncStates = syncStates;

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));

var _common = require("../../common");

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
function syncState(_ref) {
  var storageKey = _ref.storageKey,
      stateStorage = _ref.stateStorage,
      stateContainer = _ref.stateContainer;
  var subscriptions = [];

  var updateState = function updateState() {
    var newState = stateStorage.get(storageKey);
    var oldState = stateContainer.get();

    if (!(0, _fastDeepEqual.default)(newState, oldState)) {
      stateContainer.set(newState);
    }
  };

  var updateStorage = function updateStorage() {
    var newStorageState = stateContainer.get();
    var oldStorageState = stateStorage.get(storageKey);

    if (!(0, _fastDeepEqual.default)(newStorageState, oldStorageState)) {
      stateStorage.set(storageKey, newStorageState);
    }
  };

  var onStateChange$ = stateContainer.state$.pipe((0, _common.distinctUntilChangedWithInitialValue)(stateContainer.get(), _fastDeepEqual.default), (0, _operators.tap)(function () {
    return updateStorage();
  }));
  var onStorageChange$ = stateStorage.change$ ? stateStorage.change$(storageKey).pipe((0, _common.distinctUntilChangedWithInitialValue)(stateStorage.get(storageKey), _fastDeepEqual.default), (0, _operators.tap)(function () {
    updateState();
  })) : _rxjs.EMPTY;
  return {
    stop: function stop() {
      // if stateStorage has any cancellation logic, then run it
      if (stateStorage.cancel) {
        stateStorage.cancel();
      }

      subscriptions.forEach(function (s) {
        return s.unsubscribe();
      });
      subscriptions.splice(0, subscriptions.length);
    },
    start: function start() {
      if (subscriptions.length > 0) {
        throw new Error("syncState: can't start syncing state, when syncing is in progress");
      }

      subscriptions.push(onStateChange$.subscribe(), onStorageChange$.subscribe());
    }
  };
}
/**
 * multiple different sync configs
 * syncStates([
 *   {
 *     storageKey: '_s1',
 *     stateStorage: stateStorage1,
 *     stateContainer: stateContainer1,
 *   },
 *   {
 *     storageKey: '_s2',
 *     stateStorage: stateStorage2,
 *     stateContainer: stateContainer2,
 *   },
 * ]);
 * @param stateSyncConfigs - Array of IStateSyncConfig to sync
 */


function syncStates(stateSyncConfigs) {
  var syncRefs = stateSyncConfigs.map(function (config) {
    return syncState(config);
  });
  return {
    stop: function stop() {
      syncRefs.forEach(function (s) {
        return s.stop();
      });
    },
    start: function start() {
      syncRefs.forEach(function (s) {
        return s.start();
      });
    }
  };
}