"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decodeState = decodeState;
exports.encodeState = encodeState;
exports.hashedStateToExpandedState = hashedStateToExpandedState;
exports.expandedStateToHashedState = expandedStateToHashedState;

var _risonNode = _interopRequireDefault(require("rison-node"));

var _state_hash = require("../state_hash");

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
// should be:
// export function decodeState<State extends RisonValue>(expandedOrHashedState: string)
// but this leads to the chain of types mismatches up to BaseStateContainer interfaces,
// as in state containers we don't have any restrictions on state shape
function decodeState(expandedOrHashedState) {
  if ((0, _state_hash.isStateHash)(expandedOrHashedState)) {
    return (0, _state_hash.retrieveState)(expandedOrHashedState);
  } else {
    return _risonNode.default.decode(expandedOrHashedState);
  }
} // should be:
// export function encodeState<State extends RisonValue>(expandedOrHashedState: string)
// but this leads to the chain of types mismatches up to BaseStateContainer interfaces,
// as in state containers we don't have any restrictions on state shape


function encodeState(state, useHash) {
  if (useHash) {
    return (0, _state_hash.persistState)(state);
  } else {
    return _risonNode.default.encode(state);
  }
}

function hashedStateToExpandedState(expandedOrHashedState) {
  if ((0, _state_hash.isStateHash)(expandedOrHashedState)) {
    return encodeState((0, _state_hash.retrieveState)(expandedOrHashedState), false);
  }

  return expandedOrHashedState;
}

function expandedStateToHashedState(expandedOrHashedState) {
  if ((0, _state_hash.isStateHash)(expandedOrHashedState)) {
    return expandedOrHashedState;
  }

  return (0, _state_hash.persistState)(decodeState(expandedOrHashedState));
}