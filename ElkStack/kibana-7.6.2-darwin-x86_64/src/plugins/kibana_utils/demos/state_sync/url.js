"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.result = void 0;

var _todomvc = require("../state_containers/todomvc");

var _state_containers = require("../../public/state_containers");

var _state_sync = require("../../public/state_sync");

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
const tick = () => new Promise(resolve => setTimeout(resolve));

const stateContainer = (0, _state_containers.createStateContainer)(_todomvc.defaultState, _todomvc.pureTransitions);
const {
  start,
  stop
} = (0, _state_sync.syncState)({
  stateContainer: withDefaultState(stateContainer, _todomvc.defaultState),
  storageKey: '_s',
  stateStorage: (0, _state_sync.createKbnUrlStateStorage)()
});
start();
const result = Promise.resolve().then(() => {
  // http://localhost/#?_s=!((completed:!f,id:0,text:'Learning+state+containers')"
  stateContainer.transitions.add({
    id: 2,
    text: 'test',
    completed: false
  }); // http://localhost/#?_s=!((completed:!f,id:0,text:'Learning+state+containers'),(completed:!f,id:2,text:test))"

  /* actual url updates happens async */

  return tick();
}).then(() => {
  stop();
  return window.location.href;
});
exports.result = result;

function withDefaultState( // eslint-disable-next-line no-shadow
stateContainer, // eslint-disable-next-line no-shadow
defaultState) {
  return { ...stateContainer,
    set: state => {
      stateContainer.set(state || defaultState);
    }
  };
}